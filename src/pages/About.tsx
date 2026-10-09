import profilePhoto from '../assets/profile.jfif'
import './About.css'

const resumeURL = '${import.meta.env.BASE_URL}Liam_Jackson_Resume.pdf'

function About() {
  return (
    <section className="about">
      <div className="container about-inner">
        <img
          src={profilePhoto}
          alt="Portrait of Liam Jackson"
          className="about-photo"
        />

        <div className="about-content">
          <h1>About Me</h1>
          <p className="about-name">Liam Jackson</p>

          <p>
            I'm a Software Engineering Technology student at Centennial College
            and a freelance web developer. I build and maintain websites for
            clients, and I also run my own painting business, which taught me
            how to communicate with customers, manage deadlines, and take
            pride in finished work. I enjoy turning ideas into clean,
            reliable websites, and I'm looking for opportunities to keep
            growing as a developer.
          </p>

          <div className="about-buttons">
            <a
              href={resumeURL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Resume (PDF)
            </a>
            <a
              href={resumeURL}
              download
              className="btn btn-outline"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About