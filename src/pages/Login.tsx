import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { AppUser } from '@/types'

type User = AppUser

interface LoginProps {
  onLogin?: (user: User) => void
}

const demoUsers: User[] = [
  { id: 1, user_id: 'STU-001', name: 'Juan Dela Cruz', email: 'juan@cmdi.edu', role: 'student' },
  { id: 2, user_id: 'TCH-001', name: 'Maria Santos', email: 'maria@cmdi.edu', role: 'teacher' },
  { id: 3, user_id: 'ADM-001', name: 'Admin User', email: 'admin@cmdi.edu', role: 'admin' },
  { id: 4, user_id: 'REG-001', name: 'Registrar User', email: 'registrar@cmdi.edu', role: 'registrar' },
  { id: 5, user_id: 'FIN-001', name: 'Finance User', email: 'finance@cmdi.edu', role: 'finance' },
]

export default function Login({ onLogin }: LoginProps) {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('cmdi_token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('cmdi_user', JSON.stringify(data.user))
        setUserId('')
        setPassword('')
        setError('')
        onLogin?.(data.user)
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch (err) {
      // Fallback to demo mode if server is not running
      const foundUser = demoUsers.find(u => u.user_id === userId)
      if (foundUser && password === 'demo123') {
        localStorage.setItem('cmdi_user', JSON.stringify(foundUser))
        setUserId('')
        setPassword('')
        setError('')
        onLogin?.(foundUser)
      } else {
        setError('Invalid credentials. Use demo user IDs with password "demo123"')
      }
    }
    setLoading(false)
  }

  const handleDemoLogin = (demoUser: User) => {
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('cmdi_user', JSON.stringify(demoUser))
      onLogin?.(demoUser)
      setLoading(false)
    }, 500)
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">CMDI Grade Portal</h1>
          <p className="text-blue-400 mt-2">Sign in to your account</p>
        </div>

        <Card className="bg-slate-900 rounded-xl border border-blue-900/30 shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User ID Input */}
              <div className="space-y-2">
                <Label htmlFor="userId" className="text-blue-300">User ID</Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="bg-slate-800 border-blue-900/30 text-white placeholder:text-blue-400/50"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-800 border-blue-900/30 text-white placeholder:text-blue-400/50"
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-blue-900/30 bg-slate-800" />
                  <span className="text-blue-300">Remember me</span>
                </label>
                <a href="#" className="text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-900/20 text-red-400 text-sm border border-red-900/30">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Accounts Section */}
            <div className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-blue-900/30">
              <p className="text-sm font-medium mb-3 text-blue-300">Demo Accounts:</p>
              <div className="grid grid-cols-1 gap-2">
                {demoUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => handleDemoLogin(user)}
                    disabled={loading}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-blue-900/20 hover:bg-slate-800 transition-colors text-sm"
                  >
                    <span className="text-white">{user.name}</span>
                    <span className="text-blue-400 capitalize">{user.role}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-blue-400/70 mt-2 text-center">Password: demo123</p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-blue-400/70 mt-6">
          © 2026 CARD-MRI Development Institute Inc. All rights reserved.
        </p>
      </div>
    </div>
  )
}
