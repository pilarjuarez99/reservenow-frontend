import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      {/* links comunes */}
      {token && <button onClick={handleLogout}>Cerrar sesión</button>}
    </nav>
  );
}

export default Navbar;