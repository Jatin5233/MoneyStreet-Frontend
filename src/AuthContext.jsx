import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/check-auth`, {
      withCredentials: true
    }).then(res => {
        console.log(res.data)
      setIsAuthenticated(res.data.loggedIn);
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
