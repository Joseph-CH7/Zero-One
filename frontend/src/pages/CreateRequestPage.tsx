import { createRequest } from '../api/requestsApi'
import { RequestForm } from '../components/RequestForm'
import { PageHeader } from '../components/PageHeader'
import { emptyRequestForm, type RequestFormData } from '../types/request'

type CreateRequestPageProps = {
  onBack: () => void
}

export function CreateRequestPage({ onBack }: CreateRequestPageProps) {
  const handleSubmit = async (formData: RequestFormData) => {
    await createRequest(formData)
    onBack()
  }

  return (
    <>
      <PageHeader visibleCount={0} />
      <RequestForm
        title="Create Request"
        initialValues={emptyRequestForm}
        showStatus={false}
        submitLabel="Create request"
        onBack={onBack}
        onSubmit={handleSubmit}
      />
    </>
  )
}
