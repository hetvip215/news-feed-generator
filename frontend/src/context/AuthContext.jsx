import { createContext, useEffect, useState } from "react";
import { fetchWithAuth } from "../util/fetchWithAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const fetchUser = async () => {
    try {
      const res = await fetchWithAuth("http://localhost:5000/api/v1/users/me");
      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data?.data || null);
    } catch (err) {
      console.warn("🔴 Auth fetch error:", err.message);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:5000/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // Clear user and stop further API fetches
      setUser(null);
      setAuthLoading(false);
      
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
