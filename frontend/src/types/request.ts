export type Department = 'IT' | 'HR' | 'FACILITIES' | 'FINANCE'

export type RequestStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CANCELLED'

export type ServiceRequest = {
  id: number
  title: string
  description: string
  department: Department
  status: RequestStatus
  requestedBy: string
  createdAt: string
  updatedAt: string
}

export type RequestFormData = {
  title: string
  description: string
  department: Department
  status: RequestStatus
  requestedBy: string
}

export type RequestFilters = {
  title: string
  requestedBy: string
  department: string
  status: string
}

export const departments: Department[] = ['IT', 'HR', 'FACILITIES', 'FINANCE']

export const statuses: RequestStatus[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CANCELLED']

export const emptyRequestForm: RequestFormData = {
  title: '',
  description: '',
  department: 'IT',
  status: 'OPEN',
  requestedBy: '',
}
