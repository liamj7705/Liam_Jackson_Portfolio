/**
 * Education page.
 * Shows qualifications from the database as a timeline. Admins can add, edit, and delete them.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listQualifications, removeQualification } from '../api/api-qualifications'
import type { Qualification } from '../api/api-qualifications'
import { useAuth } from '../context/useAuth'
import './Education.css'

// Build the year label, e.g. "2025 – Present", "2018 – 2020", or just "2020"
function formatYears(item: Qualification): string {
  const end = item.status === 'In progress' ? 'Present' : item.endYear
  const { startYear } = item

  if (startYear && end) {
    return startYear === end ? `${startYear}` : `${startYear} – ${end}`
  }
  return `${end ?? startYear ?? ''}`
}

// Newest first: in-progress at the top, then by most recent year
function sortKey(item: Qualification): number {
  if (item.status === 'In progress') return 9999
  return item.endYear ?? item.startYear ?? 0
}

function Education() {
  const [qualifications, setQualifications] = useState<Qualification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('') // Error loading the list
  const [actionError, setActionError] = useState('') // Error deleting an item
  const { auth, isAdmin } = useAuth()

  // Load qualifications when the page opens
  useEffect(() => {
    const controller = new AbortController()

    listQualifications(controller.signal)
      .then((data) => setQualifications(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    // Cancel the request if the user leaves the page before it finishes
    return () => controller.abort()
  }, [])

  // Delete a qualification after confirming with the admin
  async function handleDelete(id: string) {
    if (!auth) return
    if (!window.confirm('Delete this qualification? This cannot be undone.')) return

    setActionError('')
    try {
      await removeQualification(id, { t: auth.token })
      // Remove it from state so the page updates without reloading
      setQualifications((prev) => prev.filter((q) => q._id !== id))
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  const sorted = [...qualifications].sort((a, b) => sortKey(b) - sortKey(a))

  return (
    <section className="education">
      <div className="container">
        <h1>Education</h1>
        <p className="education-intro">
          My academic background and qualifications, including what I'm
          currently working toward.
        </p>

        {/* Admin: add button */}
        {isAdmin && (
          <p className="education-actions">
            <Link to="/education/new" className="btn btn-primary">
              + Add Qualification
            </Link>
          </p>
        )}

        {/* Loading, error, and empty states */}
        {actionError && <p role="alert">{actionError}</p>}
        {loading && <p>Loading education...</p>}
        {error && <p role="alert">Couldn't load education: {error}</p>}
        {!loading && !error && sorted.length === 0 && <p>No qualifications yet.</p>}

        {/* ---------- Timeline ---------- */}
        <ol className="timeline">
          {sorted.map((item) => (
            <li key={item._id} className="timeline-item">
              <div className="timeline-card">
                <div className="timeline-meta">
                  <span className="timeline-years">{formatYears(item)}</span>
                  <span
                    className={
                      item.status === 'In progress'
                        ? 'status-badge in-progress'
                        : 'status-badge'
                    }
                  >
                    {item.status}
                  </span>
                </div>

                <h2>{item.title}</h2>
                <p className="timeline-institution">{item.institution}</p>

                {item.highlights && item.highlights.length > 0 && (
                  <ul className="timeline-highlights">
                    {item.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}

                {/* Admin controls */}
                {isAdmin && (
                  <div className="timeline-admin">
                    <Link to={`/education/${item._id}/edit`} className="admin-btn">
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Education
