import { Navigate, Route, Routes } from 'react-router-dom'
import { CreateRequestPage } from './pages/CreateRequestPage'
import { EditRequestPage } from './pages/EditRequestPage'
import { RequestsPage } from './pages/RequestsPage'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <Routes>
        <Route path="/" element={<Navigate to="/requests" replace />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/requests/new" element={<CreateRequestPage />} />
        <Route path="/requests/:id/edit" element={<EditRequestPage />} />
        <Route path="*" element={<Navigate to="/requests" replace />} />
      </Routes>
    </main>
  )
}

export default App
