import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRequest } from '../api/requestsApi'
import { RequestForm } from '../components/RequestForm'
import { PageHeader } from '../components/PageHeader'
import { emptyRequestForm, type RequestFormData } from '../types/request'

export function CreateRequestPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = async (formData: RequestFormData) => {
    setError('')

    try {
      await createRequest(formData)
      navigate('/requests')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <>
      <PageHeader visibleCount={0} />
      {error && <p className="alert">{error}</p>}
      <RequestForm
        title="Create Request"
        initialValues={emptyRequestForm}
        showStatus={false}
        submitLabel="Create request"
        onBack={() => navigate('/requests')}
        onSubmit={handleSubmit}
      />
    </>
  )
}
