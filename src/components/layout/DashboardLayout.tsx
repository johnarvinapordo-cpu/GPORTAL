import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, BookOpen, GraduationCap, CreditCard, Users, LogOut, Bell, Search, Calendar } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'
import { cn } from '@/lib/utils'

type UserRole = 'student' | 'teacher' | 'admin' | 'registrar' | 'finance'

interface StoredUser {
  id: number
  user_id: string
  name: string
  email: string
  role: UserRole
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [storedUser, setStoredUser] = useState<StoredUser | null>(null)
  const location = useLocation()

  useEffect(() => {
    const stored = localStorage.getItem('cmdi_user') || localStorage.getItem('user')
    if (stored) {
      try {
        setStoredUser(JSON.parse(stored))
      } catch {
        setStoredUser(null)
      }
    }
  }, [])

  if (!storedUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div>Loading...</div>
      </div>
    )
  }

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: `/${storedUser.role}/dashboard` },
    ...(storedUser.role === 'student'
      ? [
          { label: 'Enroll', icon: BookOpen, path: '/student/enrollment' },
          { label: 'Grades', icon: GraduationCap, path: '/student/grades' },
          { label: 'Finance', icon: CreditCard, path: '/student/finance' },
        ]
      : []),
    ...(storedUser.role === 'teacher'
      ? [
          { label: 'Classes', icon: BookOpen, path: '/teacher/classes' },
          { label: 'Students', icon: Users, path: '/teacher/students' },
          { label: 'Grades', icon: GraduationCap, path: '/teacher/grades' },
        ]
      : []),
    ...(storedUser.role === 'admin'
      ? [
          { label: 'Users', icon: Users, path: '/admin/users' },
          { label: 'Analytics', icon: LayoutDashboard, path: '/admin/analytics' },
          { label: 'Reports', icon: CreditCard, path: '/admin/reports' },
        ]
      : []),
    ...(storedUser.role === 'registrar'
      ? [
          { label: 'Enrollments', icon: Calendar, path: '/registrar/enrollment' },
          { label: 'Records', icon: Users, path: '/registrar/records' },
        ]
      : []),
    ...(storedUser.role === 'finance'
      ? [
          { label: 'Payments', icon: CreditCard, path: '/finance/payments' },
          { label: 'Reports', icon: LayoutDashboard, path: '/finance/reports' },
        ]
      : []),
  ]

  const handleLogout = () => {
    localStorage.removeItem('cmdi_user')
    localStorage.removeItem('cmdi_token')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-64 bg-card border-r border-border fixed h-screen flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary">CMDI Portal</h2>
          <p className="text-xs text-muted-foreground capitalize">{storedUser.role} Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                location.pathname === item.path
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Avatar className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">{storedUser.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{storedUser.role}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </aside>

      <div className="flex-1 ml-64">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm font-medium text-muted-foreground">
              <span>Dashboard</span>
              <span className="mx-2">•</span>
              <span className="text-foreground capitalize">{location.pathname.split('/').pop()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                className="h-9 w-64 rounded-full bg-muted pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border-border text-foreground transition-all placeholder:text-muted-foreground"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout;
