/**
 * Qualification form (admin only).
 * Used for both adding a new qualification and editing an existing one.
 * If the URL has a :qualificationId, the form loads it and saves changes to it.
 */
import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  createQualification,
  readQualification,
  updateQualification,
} from '../api/api-qualifications'
import type { QualificationInput, Status } from '../api/api-qualifications'
import { useAuth } from '../context/useAuth'
import './Contact.css' // Reuses the contact form styles

// All fields are strings while editing; they're converted when saving
type FormValues = {
  title: string
  institution: string
  startYear: string
  endYear: string
  status: Status
  highlights: string // One per line
}

const emptyForm: FormValues = {
  title: '',
  institution: '',
  startYear: '',
  endYear: '',
  status: 'Completed',
  highlights: '',
}

// '' → null so clearing a year on edit actually removes it
function toYear(value: string): number | null {
  return value.trim() === '' ? null : Number(value)
}

function QualificationForm() {
  const { qualificationId } = useParams()
  const isEdit = Boolean(qualificationId)
  const { auth } = useAuth()
  const navigate = useNavigate()

  const [values, setValues] = useState<FormValues>(emptyForm)
  const [loading, setLoading] = useState(isEdit) // Only load when editing
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // In edit mode, load the existing qualification into the form
  useEffect(() => {
    if (!qualificationId) return
    const controller = new AbortController()

    readQualification(qualificationId, controller.signal)
      .then((q) =>
        setValues({
          title: q.title,
          institution: q.institution,
          startYear: q.startYear ? String(q.startYear) : '',
          endYear: q.endYear ? String(q.endYear) : '',
          status: q.status,
          highlights: (q.highlights ?? []).join('\n'),
        }),
      )
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    // Cancel the request if the user leaves the page before it finishes
    return () => controller.abort()
  }, [qualificationId])

  // Update the matching field as the user types
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // Save the qualification, then go back to the Education page
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!auth) return

    setError('')
    setSubmitting(true)

    // Convert the form values into the shape the API expects
    const qualification: QualificationInput = {
      title: values.title,
      institution: values.institution,
      startYear: toYear(values.startYear),
      endYear: toYear(values.endYear),
      status: values.status,
      highlights: values.highlights
        .split('\n')
        .map((h) => h.trim())
        .filter(Boolean),
    }
    const credentials = { t: auth.token }

    try {
      if (qualificationId) {
        await updateQualification(qualificationId, qualification, credentials)
      } else {
        await createQualification(qualification, credentials)
      }
      navigate('/education')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <section className="contact">
        <div className="container">
          <p>Loading qualification...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="contact">
      <div className="container" style={{ maxWidth: 640 }}>
        <h1>{isEdit ? 'Edit Qualification' : 'Add Qualification'}</h1>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title">Qualification</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Software Engineering Technology"
              value={values.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="institution">Institution</label>
            <input
              id="institution"
              name="institution"
              type="text"
              required
              value={values.institution}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="Completed">Completed</option>
              <option value="In progress">In progress</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="startYear">Start year (optional)</label>
            <input
              id="startYear"
              name="startYear"
              type="number"
              min={1900}
              max={2100}
              value={values.startYear}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="endYear">End year (optional, ignored while in progress)</label>
            <input
              id="endYear"
              name="endYear"
              type="number"
              min={1900}
              max={2100}
              value={values.endYear}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="highlights">Highlights (one per line, optional)</label>
            <textarea
              id="highlights"
              name="highlights"
              rows={4}
              value={values.highlights}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Qualification'}
          </button>

          <p className="form-status" role="alert">
            {error}
          </p>
          <p>
            <Link to="/education">← Back to education</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default QualificationForm
