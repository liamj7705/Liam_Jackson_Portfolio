import { Link } from 'react-router-dom'
import './Home.css'

const exploreLinks = [
  {
    to: '/about',
    title: 'About Me',
    description: 'Learn who I am, what I do, and what drives my work.',
  },
  {
    to: '/projects',
    title: 'Projects',
    description: 'Browse websites and applications I have built.',
  },
  {
    to: '/education',
    title: 'Education',
    description: 'See my studies and the skills I am developing.',
  },
  {
    to: '/services',
    title: 'Services',
    description: 'Find out how I can help build your website.',
  },
]

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="hero-eyebrow">Welcome to my portfolio</span>
          <h1>
            Hi, I'm <span>Liam Jackson</span>
          </h1>
          <p className="hero-subtitle">
            I'm a software engineering student and freelance web developer who
            builds clean, fast, and user-friendly websites.
          </p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">
              About Me
            </Link>
            <Link to="/projects" className="btn btn-outline">
              View My Work
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      <section className="mission">
        <div className="container">
          <h2>My Mission</h2>
          <p className="mission-text">
            To build reliable, well-designed software and websites that solve
            real problems, help businesses grow, and make the web easier for
            everyone to use.
          </p>
        </div>
      </section>

      <section className="explore">
        <div className="container">
          <h2>Explore my site</h2>
          <div className="card-grid">
            {exploreLinks.map((item) => (
              <Link key={item.to} to={item.to} className="card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="card-link">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home