import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="left-block">
        <img src="/logo.png" alt="Logo ReservaNow" className="logo" />
        <div className="brand">
          <h1>ReservaNow</h1>
          <p>Tu lugar ideal, en un clic</p>
        </div>
      </div>
      <div className="right-block">
        {token ? (
          <>
            <span style={{ marginRight: '1rem' }}>Hola, {user?.nombre || 'Usuario'}</span>
            <button className="btn-outline" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/register"><button className="btn-outline">Crear cuenta</button></Link>
            <Link to="/login"><button className="btn-primary">Iniciar sesión</button></Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;