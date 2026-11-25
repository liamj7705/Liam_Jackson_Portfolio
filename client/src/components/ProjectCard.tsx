/**
 * ProjectCard.
 * Shows one project. Admins also see Edit and Delete buttons.
 */
import { Link } from 'react-router-dom'
import type { Project } from '../api/api-projects'
import './ProjectCard.css'

type ProjectCardProps = {
  project: Project
  isAdmin?: boolean
  onDelete?: (projectId: string) => void
}

function ProjectCard({ project, isAdmin = false, onDelete }: ProjectCardProps) {
  const { title, category, description, tech, image, liveUrl, codeUrl } = project

  // Images in the database are stored like "images/jacksonspaint.jpg" (files in client/public/images).
  // Add the site's base URL so the path works when deployed. Full URLs are used as-is.
  const imageSrc =
    image && !image.startsWith('http') ? `${import.meta.env.BASE_URL}${image}` : image

  return (
    <article className="project-card">
      {/* Screenshot, or the first letter of the title if there's no image */}
      {image ? (
        <img src={imageSrc} alt={`Screenshot of ${title}`} className="project-image" />
      ) : (
        <div className="project-image project-image-placeholder" aria-hidden="true">
          {title.charAt(0)}
        </div>
      )}

      <div className="project-body">
        <span className="project-category">{category}</span>
        <h3>{title}</h3>
        <p>{description}</p>

        {/* Technologies used */}
        <ul className="project-tech">
          {tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* Links, only shown if the project has at least one */}
        {(liveUrl || codeUrl) && (
          <div className="project-links">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                Live Site →
              </a>
            )}
            {codeUrl && (
              <a href={codeUrl} target="_blank" rel="noopener noreferrer">
                Code →
              </a>
            )}
          </div>
        )}

        {/* Admin controls */}
        {isAdmin && (
          <div className="project-admin">
            <Link to={`/projects/${project._id}/edit`} className="admin-btn">
              Edit
            </Link>
            <button
              type="button"
              className="admin-btn admin-btn-danger"
              onClick={() => onDelete?.(project._id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectCard
