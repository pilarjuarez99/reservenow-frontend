import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { userEmail, token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <Link to="/" className="left-block" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
        <img src="/logo.png" alt="Logo ReservaNow" className="logo" />
        <div className="brand" style={{ marginLeft: '0.5rem' }}>
          <h1>ReservaNow</h1>
          <p>Tu lugar ideal, en un clic</p>
        </div>
      </Link>
      <div className="right-block">
        {token ? (
          <>
            <span style={{ marginRight: '1rem' }}>Hola, {userEmail || 'Usuario'}</span>

            {role === 'admin' && (
              <Link to="/admin" style={{ marginRight: '1rem' }}>
                <button className="btn-primary">Panel Admin</button>
              </Link>
            )}

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