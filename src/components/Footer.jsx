import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-left">
        <img src="/logo.png" alt="ReservaNow Logo" className="footer-logo" />
        <span>© {currentYear} ReservaNow. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;