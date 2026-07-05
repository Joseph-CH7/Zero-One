import { useEffect, useState } from 'react'
import { deleteRequest, getRequests } from '../api/requestsApi'
import { PageHeader } from '../components/PageHeader'
import { RequestFilters } from '../components/RequestFilters'
import { RequestsTable } from '../components/RequestsTable'
import type { RequestFilters as RequestFiltersType, ServiceRequest } from '../types/request'

const defaultFilters: RequestFiltersType = {
  title: '',
  requestedBy: '',
  department: '',
  status: '',
}

export function RequestsPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [filters, setFilters] = useState<RequestFiltersType>(defaultFilters)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true)
      setError('')

      try {
        const data = await getRequests(filters)
        setRequests(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [filters])

  const handleDelete = async (id: number) => {
    const shouldDelete = window.confirm('Delete this service request?')

    if (!shouldDelete) return

    setError('')

    try {
      await deleteRequest(id)
      setRequests((currentRequests) => currentRequests.filter((request) => request.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <>
      <PageHeader visibleCount={requests.length} />
      {error && <p className="alert">{error}</p>}
      <RequestFilters filters={filters} onChange={setFilters} />
      <RequestsTable
        requests={requests}
        isLoading={isLoading}
        onDelete={handleDelete}
      />
    </>
  )
}
