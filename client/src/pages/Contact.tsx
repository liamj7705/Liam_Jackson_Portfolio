/**
 * Contact page.
 * Contact details and a form that saves messages to the database.
 */
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { createContact } from '../api/api-contacts'
import './Contact.css'

// Where the form is in the sending process
type Status = 'idle' | 'sending' | 'success' | 'error'

const emptyForm = { name: '', email: '', message: '' }

// Contact details shown in the info card
const contactDetails = [
  {
    label: 'Email',
    value: 'liamjackson047@gmail.com',
    href: 'mailto:liamjackson047@gmail.com',
  },
  {
    label: 'Phone',
    value: '289-314-5747',
    href: 'tel:+12893145747',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/liam-m-jackson',
    href: 'https://linkedin.com/in/liam-m-jackson',
  },
  {
    label: 'GitHub',
    value: 'github.com/liamj7705',
    href: 'https://github.com/liamj7705',
  },
]

function Contact() {
  const [values, setValues] = useState(emptyForm)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Update the matching field as the user types
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // Send the message, then clear the form if it worked
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      await createContact(values)
      setStatus('success')
      setValues(emptyForm)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : '')
    }
  }

  return (
    <section className="contact">
      <div className="container">
        <h1>Contact Me</h1>
        <p className="contact-intro">
          Have a question, a project in mind, or an opportunity to share? Send
          me a message and I'll get back to you as soon as I can.
        </p>

        <div className="contact-layout">
          {/* ---------- Contact info ---------- */}
          <aside className="contact-card">
            <h2>Contact Information</h2>
            <ul>
              {contactDetails.map((item) => (
                <li key={item.label}>
                  <span className="contact-label">{item.label}</span>
                  <a
                    href={item.href}
                    // Open web links in a new tab (not mailto: or tel: links)
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {item.value}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* ---------- Message form ---------- */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>

            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={values.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {/* Success or error message (announced by screen readers) */}
            <p className="form-status" role="status" aria-live="polite">
              {status === 'success' &&
                "Thanks! Your message was sent. I'll be in touch soon."}
              {status === 'error' &&
                (errorMessage ||
                  'Something went wrong. Please try again or email me directly.')}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
