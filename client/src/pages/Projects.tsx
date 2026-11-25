/**
 * Projects page.
 * Shows projects from the database with category filters. Admins can add, edit, and delete them.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { listProjects, removeProject } from '../api/api-projects'
import type { Category, Project } from '../api/api-projects'
import { useAuth } from '../context/useAuth'
import './Projects.css'

type Filter = 'All' | Category

// Buttons shown in the filter bar
const filters: Filter[] = ['All', 'Client', 'Personal', 'School']

function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('') // Error loading the list
  const [actionError, setActionError] = useState('') // Error deleting a project
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const { auth, isAdmin } = useAuth()

  // Load projects when the page opens
  useEffect(() => {
    const controller = new AbortController()

    listProjects(controller.signal)
      .then((data) => setProjects(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    // Cancel the request if the user leaves the page before it finishes
    return () => controller.abort()
  }, [])

  // Delete a project after confirming with the admin
  async function handleDelete(projectId: string) {
    if (!auth) return
    if (!window.confirm('Delete this project? This cannot be undone.')) return

    setActionError('')
    try {
      await removeProject(projectId, { t: auth.token })
      // Remove it from state so the page updates without reloading
      setProjects((prev) => prev.filter((p) => p._id !== projectId))
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  // Only show projects in the selected category
  const visibleProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  return (
    <section className="projects">
      <div className="container">
        <h1>Projects</h1>
        <p className="projects-intro">
          A selection of websites and applications I've built for clients, for
          my own business, and during my studies.
        </p>

        {/* ---------- Filter bar ---------- */}
        <div className="filter-bar" role="group" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={filter === activeFilter ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={filter === activeFilter}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Admin: add button */}
        {isAdmin && (
          <p>
            <Link to="/projects/new" className="btn btn-primary">
              + Add Project
            </Link>
          </p>
        )}

        {/* Loading, error, and empty states */}
        {actionError && <p role="alert">{actionError}</p>}
        {loading && <p>Loading projects...</p>}
        {error && <p role="alert">Couldn't load projects: {error}</p>}
        {!loading && !error && visibleProjects.length === 0 && <p>No projects yet.</p>}

        {/* ---------- Project grid ---------- */}
        <div className="project-grid">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
