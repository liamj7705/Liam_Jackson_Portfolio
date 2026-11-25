/**
 * Projects API.
 */
import { authHeaders, handleResponse } from './api-helpers'
import type { Credentials } from './api-helpers'

export type Category = 'Client' | 'Personal' | 'School'

export type Project = {
  _id: string
  title: string
  category: Category
  description: string
  tech: string[]
  image?: string
  liveUrl?: string
  codeUrl?: string
}

// What you send when creating/updating (MongoDB makes the _id)
export type ProjectInput = Omit<Project, '_id'>

// ---------- Public ----------

// Get all projects
export async function listProjects(signal?: AbortSignal): Promise<Project[]> {
  const response = await fetch('/api/projects', { signal })
  return handleResponse<Project[]>(response)
}

// Get a single project
export async function readProject(
  projectId: string,
  signal?: AbortSignal,
): Promise<Project> {
  const response = await fetch(`/api/projects/${projectId}`, { signal })
  return handleResponse<Project>(response)
}

// ---------- Admin only ----------

// Create a new project
export async function createProject(
  project: ProjectInput,
  credentials: Credentials,
): Promise<Project> {
  const response = await fetch('/api/projects', {
    method: 'POST',
    headers: authHeaders(credentials),
    body: JSON.stringify(project),
  })
  return handleResponse<Project>(response)
}

// Update an existing project
export async function updateProject(
  projectId: string,
  project: Partial<ProjectInput>,
  credentials: Credentials,
): Promise<Project> {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: 'PUT',
    headers: authHeaders(credentials),
    body: JSON.stringify(project),
  })
  return handleResponse<Project>(response)
}

// Delete a project
export async function removeProject(projectId: string, credentials: Credentials) {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: 'DELETE',
    headers: authHeaders(credentials),
  })
  return handleResponse(response)
}
