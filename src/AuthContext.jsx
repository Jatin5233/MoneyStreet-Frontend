import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/check-auth`, {
        withCredentials: true
      });
      setIsAuthenticated(res.data.loggedIn);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

