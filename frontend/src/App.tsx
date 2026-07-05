import { useState } from 'react'
import { CreateRequestPage } from './pages/CreateRequestPage'
import { EditRequestPage } from './pages/EditRequestPage'
import { RequestsPage } from './pages/RequestsPage'
import type { ServiceRequest } from './types/request'
import './App.css'

type AppPage =
  | { name: 'list' }
  | { name: 'create' }
  | { name: 'edit'; request: ServiceRequest }

function App() {
  const [page, setPage] = useState<AppPage>({ name: 'list' })

  const goToList = () => setPage({ name: 'list' })

  return (
    <main className="app-shell">
      {page.name === 'list' && (
        <RequestsPage
          onCreate={() => setPage({ name: 'create' })}
          onEdit={(request) => setPage({ name: 'edit', request })}
        />
      )}

      {page.name === 'create' && <CreateRequestPage onBack={goToList} />}

      {page.name === 'edit' && <EditRequestPage request={page.request} onBack={goToList} />}
    </main>
  )
}

export default App
