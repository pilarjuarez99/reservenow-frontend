import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute({ children, requiredRole }) {
  const { token, role, loading } = useContext(AuthContext);

  // Mostrar mientras se verifica autenticación
  if (loading) return <p>Cargando...</p>;

  if (!token) {
    // No autenticado: redirigir a login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // No tiene el rol necesario: redirigir a home
    return <Navigate to="/" replace />;
  }

  // Todo OK: renderizar children
  return children;
}
