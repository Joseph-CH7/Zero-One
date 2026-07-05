import type { RequestFilters, RequestFormData, ServiceRequest } from '../types/request'

const API_URL = 'http://localhost:3000/requests'

const buildQueryString = (filters: RequestFilters) => {
  const params = new URLSearchParams()

  if (filters.title.trim()) params.set('title', filters.title.trim())
  if (filters.requestedBy.trim()) params.set('requestedBy', filters.requestedBy.trim())
  if (filters.department) params.set('department', filters.department)
  if (filters.status) params.set('status', filters.status)

  return params.toString()
}

const parseJsonResponse = async <T>(response: Response, errorMessage: string): Promise<T> => {
  if (!response.ok) {
    throw new Error(errorMessage)
  }

  return (await response.json()) as T
}

export const getRequests = async (filters: RequestFilters) => {
  const queryString = buildQueryString(filters)
  const response = await fetch(`${API_URL}${queryString ? `?${queryString}` : ''}`)

  return parseJsonResponse<ServiceRequest[]>(response, 'Could not load service requests.')
}

export const createRequest = async (formData: RequestFormData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: formData.title,
      description: formData.description,
      department: formData.department,
      requestedBy: formData.requestedBy,
    }),
  })

  return parseJsonResponse<ServiceRequest>(response, 'Could not create the service request.')
}

export const updateRequest = async (id: number, formData: RequestFormData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  return parseJsonResponse<ServiceRequest>(response, 'Could not update the service request.')
}

export const deleteRequest = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  return parseJsonResponse<ServiceRequest>(response, 'Could not delete the service request.')
}
