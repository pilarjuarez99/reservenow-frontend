import React, { createContext, useState, useEffect } from 'react';

// Crear contexto
export const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || null);
  const [role, setRole] = useState(() => localStorage.getItem('role') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setUserEmail(localStorage.getItem('userEmail'));
      setRole(localStorage.getItem('role'));
    }
    setLoading(false);
  }, []);

  const login = (newToken, email, newRole) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('role', newRole);
    setToken(newToken);
    setUserEmail(email);
    setRole(newRole);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');
    setToken(null);
    setUserEmail(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, userEmail, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};