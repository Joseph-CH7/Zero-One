import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getRequestById, updateRequest } from '../api/requestsApi'
import { RequestForm } from '../components/RequestForm'
import { PageHeader } from '../components/PageHeader'
import type { RequestFormData, ServiceRequest } from '../types/request'

export function EditRequestPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const requestId = Number(id)
  const [request, setRequest] = useState<ServiceRequest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRequest = async () => {
      if (!Number.isInteger(requestId)) {
        setError('Invalid request ID.')
        return
      }

      setIsLoading(true)
      setError('')

      try {
        const data = await getRequestById(requestId)
        setRequest(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequest()
  }, [requestId])

  const handleSubmit = async (formData: RequestFormData) => {
    if (!request) return

    setError('')

    try {
      await updateRequest(request.id, formData)
      navigate('/requests')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const initialValues: RequestFormData | null = request
    ? {
        title: request.title,
        description: request.description,
        department: request.department,
        status: request.status,
        requestedBy: request.requestedBy,
      }
    : null

  return (
    <>
      <PageHeader visibleCount={1} />
      {error && <p className="alert">{error}</p>}
      {isLoading && <p className="alert alert-info">Loading request...</p>}
      {initialValues && (
        <RequestForm
          title="Edit Request"
          initialValues={initialValues}
          showStatus
          submitLabel="Save changes"
          onBack={() => navigate('/requests')}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
}
