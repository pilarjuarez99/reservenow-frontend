import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="admin-no-mobile">
        <p>El panel de administración no está disponible en dispositivos móviles.</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h2>Panel de Administración</h2>
      <nav className="admin-nav">
        <ul>
          <li><Link to="/admin/agregar" className="admin-link">Agregar Producto</Link></li>
          <li><Link to="/admin/lista" className="admin-link">Lista de Productos</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminPanel;