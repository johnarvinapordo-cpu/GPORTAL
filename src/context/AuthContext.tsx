import React, { createContext, useContext, useEffect, useState } from 'react'
import type { AppUser } from '../types'

export type UserRole = AppUser['role']

interface AuthContextType {
  user: AppUser | null
  profile: AppUser | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null)
  const [profile, setProfile] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('cmdi_user') || localStorage.getItem('user')
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AppUser
        setUser(parsed)
        setProfile(parsed)
      } catch {
        setUser(null)
        setProfile(null)
      }
    }
    setLoading(false)
  }, [])

  const signOut = async () => {
    localStorage.removeItem('cmdi_user')
    localStorage.removeItem('cmdi_token')
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
