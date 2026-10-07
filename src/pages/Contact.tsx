import { useState } from 'react'
import type { FormEvent } from 'react'
import './Contact.css'

const FORM_URL = 'https://formspree.io/f/maeqqbqq'

type Status = 'idle' | 'sending' | 'success' | 'error'

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
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')

    try {
      const response = await fetch(FORM_URL, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
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
          <aside className="contact-card">
            <h2>Contact Information</h2>
            <ul>
              {contactDetails.map((item) => (
                <li key={item.label}>
                  <span className="contact-label">{item.label}</span>
                  <a
                    href={item.href}
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

          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>

            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={6} required />
            </div>

            {/* Honeypot: hidden from people, bots tend to fill it in */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="honeypot"
              aria-hidden="true"
            />

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            <p className="form-status" role="status" aria-live="polite">
              {status === 'success' &&
                "Thanks! Your message was sent. I'll be in touch soon."}
              {status === 'error' &&
                'Something went wrong. Please try again or email me directly.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact