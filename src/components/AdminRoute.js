import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { token, role } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== 'ROLE_ADMIN') {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;