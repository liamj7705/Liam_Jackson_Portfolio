/**
 * Footer.
 * Site name, page links, social links, and copyright notice.
 */
import { NavLink } from 'react-router-dom'
import './Footer.css'

// Links to each page of the portfolio
const pageLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

// Links to my social media profiles, kept here so they're easy to update
const socialLinks = [
  { href: 'https://github.com/liamj7705', label: 'GitHub' },
  { href: 'https://linkedin.com/in/liam-m-jackson', label: 'LinkedIn' },
  { href: 'mailto:liamjackson047@gmail.com', label: 'Email' },
]

function Footer() {
  // Year range for the copyright notice.
  // Shows just the start year if it's still that year, otherwise "start - current"
  const startYear = 2026
  const currentYear = new Date().getFullYear()
  const year =
    startYear === currentYear ? `${startYear}` : `${startYear} - ${currentYear}`

  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <h2>Liam Jackson</h2>
          <p>Software engineering student and freelance web developer.</p>
        </div>

        {/* Page links */}
        <nav className="footer-column" aria-label="Footer navigation">
          <h3>Pages</h3>
          <ul>
            {pageLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links */}
        <div className="footer-column">
          <h3>Connect</h3>
          <ul>
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer-copy">© {year} Liam Jackson. All rights reserved.</p>
    </footer>
  )
}

export default Footer
