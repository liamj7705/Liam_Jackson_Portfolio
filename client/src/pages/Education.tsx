import { qualifications } from '../data/education'
import type { Qualification } from '../data/education'
import './Education.css'

function formatYears(item: Qualification): string {
  const { startYear, endYear } = item

  if (startYear && endYear) {
    return startYear === endYear ? `${startYear}` : `${startYear} – ${endYear}`
  }
  if (endYear) return `${endYear}`
  if (startYear) return `${startYear}`
  return ''
}

function Education() {
  return (
    <section className="education">
      <div className="container">
        <h1>Education</h1>
        <p className="education-intro">
          My academic background and qualifications, including what I'm
          currently working toward.
        </p>

        <ol className="timeline">
          {qualifications.map((item) => (
            <li key={item.id} className="timeline-item">
              <div className="timeline-card">
                <div className="timeline-meta">
                  <span className="timeline-years">{formatYears(item)}</span>
                  <span
                    className={
                      item.status === 'In progress' ? 'status-badge in-progress' : 'status-badge'
                    }
                  >
                    {item.status}
                  </span>
                </div>

                <h2>{item.qualification}</h2>
                <p className="timeline-institution">{item.institution}</p>

                {item.highlights && (
                  <ul className="timeline-highlights">
                    {item.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Education