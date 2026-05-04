import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import StudentDashboard from './pages/student/Dashboard'
import EnrollmentPage from './pages/Enrollment'
import SubmissionsPage from './pages/student/Submissions'
import TeacherDashboard from './pages/teacher/Dashboard'
import EvaluationsPage from './pages/teacher/Evaluations'
import NotificationsPage from './pages/Notifications'
import AdminDashboard from './pages/admin/AdminDashboard'
import RegistrarDashboard from './pages/registrar/Dashboard'
import FinanceDashboard from './pages/finance/Dashboard'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import type { AppUser } from './types'

function App() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('cmdi_user') || localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('cmdi_user')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData: AppUser) => {
    setUser(userData)
    localStorage.setItem('cmdi_user', JSON.stringify(userData))
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('cmdi_user')
    localStorage.removeItem('cmdi_token')
    localStorage.removeItem('user')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  const renderStudentRoutes = () => (
    <Routes>
      <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
      <Route path="/student/dashboard" element={<StudentDashboard user={user as Extract<AppUser, { role: 'student' }>} />} />
      <Route path="/student/enrollment" element={<EnrollmentPage />} />
      <Route path="/student/submissions" element={<SubmissionsPage />} />
      <Route path="/student/notifications" element={<NotificationsPage />} />
      <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
    </Routes>
  )

  const renderTeacherRoutes = () => (
    <Routes>
      <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
      <Route path="/teacher/dashboard" element={<TeacherDashboard user={user as Extract<AppUser, { role: 'teacher' }>} />} />
      <Route path="/teacher/evaluations" element={<EvaluationsPage />} />
      <Route path="/teacher/notifications" element={<NotificationsPage />} />
      <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
    </Routes>
  )

  const getDashboard = () => {
    switch (user.role) {
      case 'student':
        return renderStudentRoutes()
      case 'teacher':
        return renderTeacherRoutes()
      case 'admin':
        return <AdminDashboard user={user as Extract<AppUser, { role: 'admin' }>} />
      case 'registrar':
        return <RegistrarDashboard user={user as Extract<AppUser, { role: 'registrar' }>} />
      case 'finance':
        return <FinanceDashboard user={user as Extract<AppUser, { role: 'finance' }>} />
      default:
        return <Navigate to="/login" replace />
    }
  }

return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex">
        <Sidebar user={user} onLogout={handleLogout} />
        <div className="flex-1 flex flex-col ml-64">
          <Header user={user} onLogout={handleLogout} />
          <main className="flex-1 p-6 mt-16 bg-slate-950">
            {getDashboard()}
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
