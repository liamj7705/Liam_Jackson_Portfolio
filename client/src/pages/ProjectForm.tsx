/**
 * Project form (admin only).
 * Used for both adding a new project and editing an existing one.
 * If the URL has a :projectId, the form loads that project and saves changes to it.
 */
import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createProject, readProject, updateProject } from '../api/api-projects'
import type { Category, ProjectInput } from '../api/api-projects'
import { useAuth } from '../context/useAuth'
import './Contact.css' // Reuses the contact form styles

// All fields are strings while editing; they're converted when saving
type FormValues = {
  title: string
  category: Category
  description: string
  tech: string // Typed as "React, TypeScript, Vite" and split on save
  image: string
  liveUrl: string
  codeUrl: string
}

const emptyForm: FormValues = {
  title: '',
  category: 'Client',
  description: '',
  tech: '',
  image: '',
  liveUrl: '',
  codeUrl: '',
}

function ProjectForm() {
  const { projectId } = useParams()
  const isEdit = Boolean(projectId)
  const { auth } = useAuth()
  const navigate = useNavigate()

  const [values, setValues] = useState<FormValues>(emptyForm)
  const [loading, setLoading] = useState(isEdit) // Only load when editing
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // In edit mode, load the existing project into the form
  useEffect(() => {
    if (!projectId) return
    const controller = new AbortController()

    readProject(projectId, controller.signal)
      .then((project) =>
        setValues({
          title: project.title,
          category: project.category,
          description: project.description,
          tech: project.tech.join(', '),
          image: project.image ?? '',
          liveUrl: project.liveUrl ?? '',
          codeUrl: project.codeUrl ?? '',
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
  }, [projectId])

  // Update the matching field as the user types
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // Save the project, then go back to the Projects page
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!auth) return

    setError('')
    setSubmitting(true)

    // Convert the form values into the shape the API expects
    const project: ProjectInput = {
      title: values.title,
      category: values.category,
      description: values.description,
      tech: values.tech
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      image: values.image.trim(),
      liveUrl: values.liveUrl.trim(),
      codeUrl: values.codeUrl.trim(),
    }
    const credentials = { t: auth.token }

    try {
      if (projectId) {
        await updateProject(projectId, project, credentials)
      } else {
        await createProject(project, credentials)
      }
      navigate('/projects')
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
          <p>Loading project...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="contact">
      <div className="container" style={{ maxWidth: 640 }}>
        <h1>{isEdit ? 'Edit Project' : 'Add Project'}</h1>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={values.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
            >
              <option value="Client">Client</option>
              <option value="Personal">Personal</option>
              <option value="School">School</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              required
              value={values.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="tech">Tech (comma-separated)</label>
            <input
              id="tech"
              name="tech"
              type="text"
              required
              placeholder="React, TypeScript, Vite"
              value={values.tech}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="image">Image path (optional)</label>
            <input
              id="image"
              name="image"
              type="text"
              placeholder="images/my-project.jpg"
              value={values.image}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="liveUrl">Live site URL (optional)</label>
            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              value={values.liveUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="codeUrl">Code URL (optional)</label>
            <input
              id="codeUrl"
              name="codeUrl"
              type="url"
              value={values.codeUrl}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Project'}
          </button>

          <p className="form-status" role="alert">
            {error}
          </p>
          <p>
            <Link to="/projects">← Back to projects</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default ProjectForm
