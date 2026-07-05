import { updateRequest } from '../api/requestsApi'
import { RequestForm } from '../components/RequestForm'
import { PageHeader } from '../components/PageHeader'
import type { RequestFormData, ServiceRequest } from '../types/request'

type EditRequestPageProps = {
  request: ServiceRequest
  onBack: () => void
}

export function EditRequestPage({ request, onBack }: EditRequestPageProps) {
  const initialValues: RequestFormData = {
    title: request.title,
    description: request.description,
    department: request.department,
    status: request.status,
    requestedBy: request.requestedBy,
  }

  const handleSubmit = async (formData: RequestFormData) => {
    await updateRequest(request.id, formData)
    onBack()
  }

  return (
    <>
      <PageHeader visibleCount={1} />
      <RequestForm
        title="Edit Request"
        initialValues={initialValues}
        showStatus
        submitLabel="Save changes"
        onBack={onBack}
        onSubmit={handleSubmit}
      />
    </>
  )
}
