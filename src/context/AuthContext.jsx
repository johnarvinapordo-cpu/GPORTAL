import { createContext, useContext, useState, useEffect } from "react";

/** @typedef {Object} AuthContextType
 * @property {Object|null} user
 * @property {(user: Object) => void} setUser
 * @property {() => void} logout
 * @property {boolean} loading
 */

/** @type {AuthContextType} */
const defaultAuthContext = {
  user: null,
  setUser: () => {},
  logout: () => {},
  loading: true,
};

const AuthContext = createContext(defaultAuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage
    const storedUser = localStorage.getItem('cmdi_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('cmdi_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('cmdi_user')
  }

  return (
    <AuthContext.Provider value={{ user, setUser: login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
