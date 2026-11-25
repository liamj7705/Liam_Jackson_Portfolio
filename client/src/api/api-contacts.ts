/**
 * Contacts API: messages sent through the contact form.
 */
import { authHeaders, handleResponse } from './api-helpers'
import type { Credentials } from './api-helpers'

export type Contact = {
  _id: string
  name: string
  email: string
  message: string
  read: boolean
  created: string // Dates arrive from JSON as strings
}

// The fields a visitor fills in on the contact form
export type ContactInput = Pick<Contact, 'name' | 'email' | 'message'>

// ---------- Public ----------

// Send a new message
export async function createContact(contact: ContactInput): Promise<Contact> {
  const response = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  })
  return handleResponse<Contact>(response)
}

// ---------- Admin only ----------

// Get all messages
export async function listContacts(
  credentials: Credentials,
  signal?: AbortSignal,
): Promise<Contact[]> {
  const response = await fetch('/api/contacts', {
    headers: authHeaders(credentials),
    signal,
  })
  return handleResponse<Contact[]>(response)
}

// Update a message (used to mark it read or unread)
export async function updateContact(
  id: string,
  changes: Partial<Pick<Contact, 'read'>>,
  credentials: Credentials,
): Promise<Contact> {
  const response = await fetch(`/api/contacts/${id}`, {
    method: 'PUT',
    headers: authHeaders(credentials),
    body: JSON.stringify(changes),
  })
  return handleResponse<Contact>(response)
}

// Delete a message
export async function removeContact(id: string, credentials: Credentials) {
  const response = await fetch(`/api/contacts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(credentials),
  })
  return handleResponse(response)
}
