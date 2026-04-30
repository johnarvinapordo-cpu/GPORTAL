import { Bell, Search } from 'lucide-react'
import type { AppUser } from '@/types'

interface HeaderProps {
  user: AppUser
  onLogout: () => void
}

export default function Header({ user }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const roleLabels: Record<string, string> = {
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Administrator',
    registrar: 'Registrar',
    finance: 'Finance',
  }

return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-slate-900/80 backdrop-blur-sm border-b border-blue-900/30 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 rounded-lg bg-slate-800/50 border border-blue-900/30 text-sm text-white placeholder:text-blue-300/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-slate-800 transition-colors" title="Notifications">
            <Bell className="w-5 h-5 text-blue-200" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-blue-900/30">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{getGreeting()}, {user.name.split(' ')[0]}!</p>
              <p className="text-xs text-blue-300">{roleLabels[user.role]} Portal</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-medium">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
