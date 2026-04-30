import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  DollarSign,
  Users,
  Settings,
  LogOut,
  GraduationCap,
  Bell,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AppUser } from '@/types'

interface SidebarProps {
  user: AppUser
  onLogout: () => void
}

const studentLinks = [
  { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/student/enrollment', icon: BookOpen, label: 'Enrollment' },
  { to: '/student/grades', icon: ClipboardCheck, label: 'Grades' },
  { to: '/student/finance', icon: DollarSign, label: 'Tuition / Payments' },
  { to: '/student/evaluations', icon: GraduationCap, label: 'Evaluations' },
  { to: '/student/notifications', icon: Bell, label: 'Notifications' },
  { to: '/student/profile', icon: Users, label: 'Profile' },
]

const teacherLinks = [
  { to: '/teacher/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/teacher/courses', icon: BookOpen, label: 'My Classes' },
  { to: '/teacher/grades', icon: ClipboardCheck, label: 'Grade Submission' },
  { to: '/teacher/evaluations', icon: Users, label: 'Evaluations' },
]

const adminLinks = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/courses', icon: BookOpen, label: 'Courses' },
  { to: '/admin/reports', icon: Settings, label: 'Reports' },
]

const registrarLinks = [
  { to: '/registrar/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/registrar/enrollments', icon: Users, label: 'Enrollments' },
  { to: '/registrar/courses', icon: BookOpen, label: 'Courses' },
  { to: '/registrar/records', icon: Settings, label: 'Records' },
]

const financeLinks = [
  { to: '/finance/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/finance/payments', icon: DollarSign, label: 'Payments' },
  { to: '/finance/reports', icon: Settings, label: 'Reports' },
]

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const getLinks = () => {
    switch (user.role) {
      case 'student':
        return studentLinks
      case 'teacher':
        return teacherLinks
      case 'admin':
        return adminLinks
      case 'registrar':
        return registrarLinks
      case 'finance':
        return financeLinks
      default:
        return []
    }
  }

  const roleLabels: Record<string, string> = {
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Administrator',
    registrar: 'Registrar',
    finance: 'Finance',
  }

return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 border-r border-blue-900/30 flex flex-col">
      <div className="p-6 border-b border-blue-900/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-inner shadow-black/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white">CMDI Grade Portal</h1>
            <p className="text-xs text-blue-300">{roleLabels[user.role]}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {getLinks().map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.user_id}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </aside>
  )
}
