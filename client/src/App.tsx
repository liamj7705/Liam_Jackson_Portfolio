/**
 * App layout and routes.
 * The navbar and footer appear on every page; the page in between changes with the URL.
 */
import { Route, Routes } from 'react-router-dom'

// Layout components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AdminRoute from './components/AdminRoute'

// Public pages
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Education from './pages/Education'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

// Admin pages
import ProjectForm from './pages/ProjectForm'
import QualificationForm from './pages/QualificationForm'
import Messages from './pages/Messages'

import './App.css'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin-only pages */}
          <Route
            path="/projects/new"
            element={<AdminRoute><ProjectForm /></AdminRoute>}
          />
          <Route
            path="/projects/:projectId/edit"
            element={<AdminRoute><ProjectForm /></AdminRoute>}
          />
          <Route
            path="/education/new"
            element={<AdminRoute><QualificationForm /></AdminRoute>}
          />
          <Route
            path="/education/:qualificationId/edit"
            element={<AdminRoute><QualificationForm /></AdminRoute>}
          />
          <Route
            path="/messages"
            element={<AdminRoute><Messages /></AdminRoute>}
          />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
