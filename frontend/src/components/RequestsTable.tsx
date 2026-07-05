import type { ServiceRequest } from '../types/request'

type RequestsTableProps = {
  requests: ServiceRequest[]
  isLoading: boolean
  onCreate: () => void
  onEdit: (request: ServiceRequest) => void
  onDelete: (id: number) => void
}

export function RequestsTable({
  requests,
  isLoading,
  onCreate,
  onEdit,
  onDelete,
}: RequestsTableProps) {
  return (
    <div className="table-panel">
      <div className="section-heading">
        <h2>Requests</h2>
        <div className="heading-actions">
          {isLoading && <span>Loading...</span>}
          <button type="button" className="primary-button" onClick={onCreate}>
            New request
          </button>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Requester</th>
              <th>Department</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && !isLoading ? (
              <tr>
                <td className="empty-state" colSpan={6}>
                  No service requests found.
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <strong>{request.title}</strong>
                    <span>{request.description}</span>
                  </td>
                  <td>{request.requestedBy}</td>
                  <td>{request.department}</td>
                  <td>
                    <span className={`status status-${request.status.toLowerCase()}`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="row-actions">
                      <button type="button" className="ghost-button" onClick={() => onEdit(request)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="danger-button"
                        onClick={() => onDelete(request.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
