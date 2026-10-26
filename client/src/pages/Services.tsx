import { Link } from 'react-router-dom'
import { services } from '../data/services'
import './Services.css'

function Services() {
  return (
    <section className="services">
      <div className="container">
        <h1>Services</h1>
        <p className="services-intro">
          I help small businesses get online with websites that are clear,
          fast, and easy to manage. Here's what I can do for you.
        </p>

        <div className="service-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <span className="service-icon" aria-hidden="true">
                {service.icon}
              </span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul className="service-includes">
                {service.includes.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="services-cta">
          <h2>Have a project in mind?</h2>
          <p>Tell me what you need and I'll get back to you with next steps.</p>
          <Link to="/contact" className="btn btn-primary">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Services