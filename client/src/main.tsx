/**
 * Front-end entry point.
 * Renders the App inside the router and auth provider.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* HashRouter keeps routing working on static hosting */}
    <HashRouter>
      {/* Makes the signed-in user available to every page */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)
