import { Link } from 'react-router-dom'
import type { ServiceRequest } from '../types/request'

type RequestsTableProps = {
  requests: ServiceRequest[]
  isLoading: boolean
  onDelete: (id: number) => void
}

const formatCreatedAt = (createdAt: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(createdAt))

export function RequestsTable({
  requests,
  isLoading,
  onDelete,
}: RequestsTableProps) {
  return (
    <div className="table-panel">
      <div className="section-heading">
        <h2>Requests</h2>
        <div className="heading-actions">
          {isLoading && <span>Loading...</span>}
          <Link className="primary-button" to="/requests/new">
            New request
          </Link>
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
                  <th>Created at</th>
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
                  <td>
                    <time className="created-at" dateTime={request.createdAt}>
                      {formatCreatedAt(request.createdAt)}
                    </time>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link className="ghost-button" to={`/requests/${request.id}/edit`}>
                        Edit
                      </Link>
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
