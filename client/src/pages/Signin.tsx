/**
 * Sign in page.
 * Signs the user in and saves their session, then goes to the home page.
 */
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signin } from '../api/api-auth'
import { useAuth } from '../context/useAuth'
import './Contact.css' // Reuses the contact form styles

function Signin() {
  const [values, setValues] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Optional message passed from another page (e.g. "Account created" after sign up)
  const message = (location.state as { message?: string } | null)?.message

  // Update the matching field as the user types
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // Sign in, save the session, then go home
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const data = await signin(values.email, values.password)
      login(data)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact">
      <div className="container" style={{ maxWidth: 480 }}>
        <h1>Sign In</h1>
        {message && <p className="form-status">{message}</p>}

        <form className="contact-form" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="form-status" role="alert">
            {error}
          </p>
          <p>
            No account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Signin
