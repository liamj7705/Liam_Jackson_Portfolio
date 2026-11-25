/**
 * Navbar.
 * Logo, page links, and the sign in / sign out area.
 */
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import LiamLogo from '../assets/LiamLogo.png'
import './Navbar.css'

// Links to each page of the site
const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

// Adds the "active" class to the link for the current page
const activeClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '')

function Navbar() {
  const { auth, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  // Sign out, then go back to the home page
  async function handleSignout() {
    await logout()
    navigate('/')
  }

  return (
    <header>
      <nav className="navigation" aria-label="Main navigation">
        {/* Logo */}
        <NavLink to="/" className="logo-link" aria-label="Go to home page">
          <img src={LiamLogo} alt="Liam Jackson" className="logo-img" />
        </NavLink>

        <div className="nav-links">
          {/* Page links */}
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={activeClass}>
              {link.label}
            </NavLink>
          ))}

          {/* Account area */}
          <div className="nav-auth">
            {auth ? (
              // Signed in
              <>
                {isAdmin && (
                  <NavLink to="/messages" className={activeClass}>
                    Messages
                  </NavLink>
                )}
                <span className="nav-user">
                  {auth.user.name}
                  {auth.user.role === 'admin' && (
                    <span className="nav-badge">Admin</span>
                  )}
                </span>
                <button type="button" className="nav-btn" onClick={handleSignout}>
                  Sign Out
                </button>
              </>
            ) : (
              // Signed out
              <>
                <NavLink to="/signin" className={activeClass}>
                  Sign In
                </NavLink>
                <NavLink to="/signup" className="nav-btn">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
