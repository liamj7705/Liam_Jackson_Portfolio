/**
 * Sign up page.
 * Creates a new account, then sends the user to the sign in page.
 */
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api/api-user'
import './Contact.css' // Reuses the contact form styles

function Signup() {
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  // Update the matching field as the user types
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // Create the account, then go to sign in with a success message
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await signup(values)
      navigate('/signin', { state: { message: 'Account created. Please sign in.' } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact">
      <div className="container" style={{ maxWidth: 480 }}>
        <h1>Sign Up</h1>

        <form className="contact-form" onSubmit={handleSubmit}>
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className="form-status" role="alert">
            {error}
          </p>
          <p>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Signup
