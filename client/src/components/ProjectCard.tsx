import type { Project } from '../data/projects'
import './ProjectCard.css'

type ProjectCardProps = {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const { title, category, description, tech, image, liveUrl, codeUrl } = project

  return (
    <article className="project-card">
      {image ? (
        <img src={image} alt={`Screenshot of ${title}`} className="project-image" />
      ) : (
        <div className="project-image project-image-placeholder" aria-hidden="true">
          {title.charAt(0)}
        </div>
      )}

      <div className="project-body">
        <span className="project-category">{category}</span>
        <h3>{title}</h3>
        <p>{description}</p>

        <ul className="project-tech">
          {tech.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

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
      </div>
    </article>
  )
}

export default ProjectCard