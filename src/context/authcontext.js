'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);


  useEffect(() => {
    setIsLoadingAuth(true)
    const storedUser = localStorage.getItem('current_logged_user');
    if(storedUser) {
      try{
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem('current_logged_user');
      } finally{
        setIsLoadingAuth(false)
      }
    }
  }, []);
   
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('current_logged_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_logged_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoadingAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};