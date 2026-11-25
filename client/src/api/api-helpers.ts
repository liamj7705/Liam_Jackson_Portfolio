/**
 * Shared helpers for the API files.
 */

// The JWT used for admin requests
export type Credentials = { t: string }

// Parse the JSON response. Throws the server's { error } message if the request failed
export async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }
  return data as T
}

// Headers for requests that need to be signed in
export function authHeaders(credentials: Credentials) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${credentials.t}`,
  }
}
