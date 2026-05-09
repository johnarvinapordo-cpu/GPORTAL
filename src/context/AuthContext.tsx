import React, { createContext, useContext, useEffect, useState } from "react";
import type { AppUser } from "../types";

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signOut: () => void;
  setUser: (user: AppUser) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: () => {},
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("cmdi_user");

    if (stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        setUserState(null);
      }
    }

    setLoading(false);
  }, []);

  const setUser = (newUser: AppUser) => {
    const normalized = {
      ...newUser,
      role: newUser.role?.toLowerCase().trim(),
    };

    setUserState(normalized);
    localStorage.setItem("cmdi_user", JSON.stringify(normalized));
  };

  const signOut = () => {
    setUserState(null);
    localStorage.removeItem("cmdi_user");
    localStorage.removeItem("cmdi_token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);