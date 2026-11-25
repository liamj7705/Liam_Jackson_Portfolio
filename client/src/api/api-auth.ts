/**
 * Auth API: sign in and sign out.
 */
import { handleResponse } from './api-helpers'

export type Role = 'user' | 'admin'

export type User = {
  _id: string
  name: string
  email: string
  role: Role
}

// What the server returns after a successful sign in
export type AuthData = {
  token: string
  user: User
}

// Sign in with email and password
export async function signin(email: string, password: string): Promise<AuthData> {
  const response = await fetch('/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return handleResponse<AuthData>(response)
}

// Sign out (clears the server cookie)
export async function signout() {
  const response = await fetch('/auth/signout')
  return handleResponse(response)
}
