/**
 * ScrollToTop.
 * Scrolls back to the top of the page whenever the route changes.
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Renders nothing; it only runs the effect above
  return null
}

export default ScrollToTop
