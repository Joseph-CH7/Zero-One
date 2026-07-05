import { departments, statuses, type RequestFilters as RequestFiltersType } from '../types/request'

type RequestFiltersProps = {
  filters: RequestFiltersType
  onChange: (filters: RequestFiltersType) => void
}

export function RequestFilters({ filters, onChange }: RequestFiltersProps) {
  return (
    <section className="toolbar" aria-label="Request filters">
      <label>
        Search title
        <input
          type="search"
          placeholder="Search by title"
          value={filters.title}
          onChange={(event) => onChange({ ...filters, title: event.target.value })}
        />
      </label>

      <label>
        Requested by
        <input
          type="search"
          placeholder="Search requester"
          value={filters.requestedBy}
          onChange={(event) => onChange({ ...filters, requestedBy: event.target.value })}
        />
      </label>

      <label>
        Department
        <select
          value={filters.department}
          onChange={(event) => onChange({ ...filters, department: event.target.value })}
        >
          <option value="">All departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </label>

      <label>
        Status
        <select
          value={filters.status}
          onChange={(event) => onChange({ ...filters, status: event.target.value })}
        >
          <option value="">All statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.replace('_', ' ')}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}
