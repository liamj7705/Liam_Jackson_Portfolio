/**
 * Qualifications API (education entries).
 */
import { authHeaders, handleResponse } from './api-helpers'
import type { Credentials } from './api-helpers'

export type Status = 'Completed' | 'In progress'

export type Qualification = {
  _id: string
  title: string
  institution: string
  startYear?: number | null
  endYear?: number | null
  status: Status
  highlights?: string[]
}

// What you send when creating/updating (MongoDB makes the _id)
export type QualificationInput = Omit<Qualification, '_id'>

// ---------- Public ----------

// Get all qualifications
export async function listQualifications(
  signal?: AbortSignal,
): Promise<Qualification[]> {
  const response = await fetch('/api/qualifications', { signal })
  return handleResponse<Qualification[]>(response)
}

// Get a single qualification
export async function readQualification(
  id: string,
  signal?: AbortSignal,
): Promise<Qualification> {
  const response = await fetch(`/api/qualifications/${id}`, { signal })
  return handleResponse<Qualification>(response)
}

// ---------- Admin only ----------

// Create a new qualification
export async function createQualification(
  qualification: QualificationInput,
  credentials: Credentials,
): Promise<Qualification> {
  const response = await fetch('/api/qualifications', {
    method: 'POST',
    headers: authHeaders(credentials),
    body: JSON.stringify(qualification),
  })
  return handleResponse<Qualification>(response)
}

// Update an existing qualification
export async function updateQualification(
  id: string,
  qualification: Partial<QualificationInput>,
  credentials: Credentials,
): Promise<Qualification> {
  const response = await fetch(`/api/qualifications/${id}`, {
    method: 'PUT',
    headers: authHeaders(credentials),
    body: JSON.stringify(qualification),
  })
  return handleResponse<Qualification>(response)
}

// Delete a qualification
export async function removeQualification(id: string, credentials: Credentials) {
  const response = await fetch(`/api/qualifications/${id}`, {
    method: 'DELETE',
    headers: authHeaders(credentials),
  })
  return handleResponse(response)
}
