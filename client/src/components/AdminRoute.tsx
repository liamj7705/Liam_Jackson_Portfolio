/**
 * AdminRoute.
 * Wraps a page so only admins can see it.
 */
import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../context/useAuth'

function AdminRoute({ children }: { children: ReactNode }) {
  const { auth, isAdmin } = useAuth()

  if (!isAdmin) {
    // Signed-in regular users go home; visitors go to sign in
    return <Navigate to={auth ? '/' : '/signin'} replace />
  }

  return <>{children}</>
}

export default AdminRoute
