import { createContext } from 'react'
import type { AuthData } from '../api/api-auth'

export type AuthContextValue = {
  auth: AuthData | null
  isAdmin: boolean
  login: (data: AuthData) => void
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)