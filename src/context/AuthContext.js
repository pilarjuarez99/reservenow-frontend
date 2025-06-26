import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  const [role, setRole] = useState(localStorage.getItem('role'));

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
    <AuthContext.Provider value={{ token, userEmail, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};