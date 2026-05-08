import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { AppUser } from "../types";

interface AuthContextType {
  user: AppUser | null;
  profile: AppUser | null;
  loading: boolean;
  signOut: () => void;
  setUser: (user: AppUser) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: () => {},
  setUser: () => {},
});

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUserState] = useState<AppUser | null>(null);

  const [profile, setProfile] = useState<AppUser | null>(null);

  const [loading, setLoading] = useState(true);

  // LOAD USER ON APP START
  useEffect(() => {
    const storedUser =
      localStorage.getItem("cmdi_user") ||
      localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser: AppUser = JSON.parse(storedUser);

        setUserState(parsedUser);
        setProfile(parsedUser);
      } catch (error) {
        console.error("Failed to parse user:", error);

        setUserState(null);
        setProfile(null);
      }
    }

    setLoading(false);
  }, []);

  // LOGIN / SET USER
  const setUser = (newUser: AppUser) => {
    setUserState(newUser);

    setProfile(newUser);

    localStorage.setItem(
      "cmdi_user",
      JSON.stringify(newUser)
    );
  };

  // LOGOUT
  const signOut = () => {
    setUserState(null);

    setProfile(null);

    localStorage.removeItem("cmdi_user");
    localStorage.removeItem("cmdi_token");

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signOut,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// HOOK
export const useAuth = () => useContext(AuthContext);