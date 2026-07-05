import { type FormEvent, useState } from 'react'
import {
  departments,
  statuses,
  type Department,
  type RequestFormData,
  type RequestStatus,
} from '../types/request'

type RequestFormProps = {
  title: string
  initialValues: RequestFormData
  showStatus: boolean
  submitLabel: string
  onBack: () => void
  onSubmit: (formData: RequestFormData) => Promise<void>
}

export function RequestForm({
  title,
  initialValues,
  showStatus,
  submitLabel,
  onBack,
  onSubmit,
}: RequestFormProps) {
  const [form, setForm] = useState<RequestFormData>(initialValues)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)

    try {
      await onSubmit(form)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form className="form-panel form-page" onSubmit={handleSubmit}>
      <div className="section-heading">
        <h2>{title}</h2>
        <button type="button" className="text-button" onClick={onBack}>
          Back to table
        </button>
      </div>

      <label>
        Title
        <input
          required
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="Laptop not working"
        />
      </label>

      <label>
        Requested by
        <input
          required
          value={form.requestedBy}
          onChange={(event) => setForm({ ...form, requestedBy: event.target.value })}
          placeholder="Employee name"
        />
      </label>

      <label>
        Department
        <select
          value={form.department}
          onChange={(event) => setForm({ ...form, department: event.target.value as Department })}
        >
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </label>

      {showStatus && (
        <label>
          Status
          <select
            value={form.status}
            onChange={(event) => setForm({ ...form, status: event.target.value as RequestStatus })}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        </label>
      )}

      <label>
        Description
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          placeholder="Describe the request"
        />
      </label>

      <button className="primary-button" type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
