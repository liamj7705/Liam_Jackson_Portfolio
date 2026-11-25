/**
 * User API: create an account.
 */
import { handleResponse } from './api-helpers'

export type SignupInput = {
  name: string
  email: string
  password: string
}

// Create a new user account
export async function signup(user: SignupInput): Promise<{ message: string }> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  return handleResponse<{ message: string }>(response)
}
