import { useState } from 'react'
import type { ReactNode } from 'react'
import { signout as apiSignout } from '../api/api-auth'
import type { AuthData } from '../api/api-auth'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'jwt'

function loadAuth(): AuthData | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as AuthData) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthData | null>(loadAuth)

  function login(data: AuthData) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    setAuth(data)
  }

  async function logout() {
    sessionStorage.removeItem(STORAGE_KEY)
    setAuth(null)
    try {
      await apiSignout()
    } catch {
      // Already signed out locally; a failed server call doesn't matter
    }
  }

  return (
    <AuthContext.Provider
      value={{ auth, isAdmin: auth?.user.role === 'admin', login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}