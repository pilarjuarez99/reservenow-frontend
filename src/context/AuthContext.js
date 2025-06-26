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
    // Simular verificación de token en localStorage o consulta a backend para validar sesión
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setUserEmail(localStorage.getItem('userEmail'));
      setRole(localStorage.getItem('role'));
    }
    setLoading(false);
  }, []);

  const login = (token, email, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('role', role);
    setToken(token);
    setUserEmail(email);
    setRole(role);
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