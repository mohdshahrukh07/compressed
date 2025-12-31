"use client";

import { createContext, useContext, useState, useEffect } from "react"; 
import { useRouter } from "next/navigation";
import { refreshAccessToken } from "./api/auth";

const AuthContext = createContext(null);
let isRefreshing = false;

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (typeof window === "undefined") return;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        setUser(null);
        setLoading(false);
        router.push("/login");
        return;
      }

      // 🔒 Prevent duplicate refresh calls
      if (isRefreshing) return;
      isRefreshing = true;

      const refreshedUser = await refreshAccessToken();

      isRefreshing = false; // 🔓 Unlock

      if (!refreshedUser) {
        setUser(null);
        setLoading(false);
        router.push("/login");
        return;
      }

      setUser(refreshedUser);
      setLoading(false);
    }

    checkAuth();
  }, []);

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }