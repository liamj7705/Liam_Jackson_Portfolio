/**
 * Messages page (admin only).
 * Lists messages from the contact form. The admin can mark them read/unread or delete them.
 */
import { useEffect, useState } from 'react'
import { listContacts, removeContact, updateContact } from '../api/api-contacts'
import type { Contact } from '../api/api-contacts'
import { useAuth } from '../context/useAuth'
import './Messages.css'

function Messages() {
  const { auth } = useAuth()
  const [messages, setMessages] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load messages when the page opens
  useEffect(() => {
    if (!auth) return
    const controller = new AbortController()

    listContacts({ t: auth.token }, controller.signal)
      .then((data) => setMessages(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    // Cancel the request if the user leaves the page before it finishes
    return () => controller.abort()
  }, [auth])

  // Flip a message between read and unread
  async function toggleRead(message: Contact) {
    if (!auth) return
    setError('')
    try {
      const updated = await updateContact(
        message._id,
        { read: !message.read },
        { t: auth.token },
      )
      // Swap in the updated message
      setMessages((prev) => prev.map((m) => (m._id === updated._id ? updated : m)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
    }
  }

  // Delete a message after confirming
  async function handleDelete(id: string) {
    if (!auth) return
    if (!window.confirm('Delete this message? This cannot be undone.')) return

    setError('')
    try {
      await removeContact(id, { t: auth.token })
      // Remove it from state so the page updates without reloading
      setMessages((prev) => prev.filter((m) => m._id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  // Newest messages first
  const sorted = [...messages].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  )
  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <section className="messages">
      <div className="container">
        <h1>Messages</h1>
        <p className="messages-intro">
          {loading ? 'Loading...' : `${messages.length} total · ${unreadCount} unread`}
        </p>

        {/* Error and empty states */}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && sorted.length === 0 && <p>No messages yet.</p>}

        <ul className="message-list">
          {sorted.map((m) => (
            <li key={m._id} className={m.read ? 'message-card' : 'message-card unread'}>
              {/* Sender and date */}
              <div className="message-header">
                <div>
                  <h2>{m.name}</h2>
                  <a href={`mailto:${m.email}`}>{m.email}</a>
                </div>
                <time dateTime={m.created}>{new Date(m.created).toLocaleString()}</time>
              </div>

              <p className="message-body">{m.message}</p>

              {/* Actions */}
              <div className="message-actions">
                <button type="button" className="admin-btn" onClick={() => toggleRead(m)}>
                  {m.read ? 'Mark unread' : 'Mark read'}
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger"
                  onClick={() => handleDelete(m._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Messages
