import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import type { Category } from '../data/projects'
import './Projects.css'

type Filter = 'All' | Category

const filters: Filter[] = ['All', 'Client', 'Personal', 'School']

function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')

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

        <div className="project-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects