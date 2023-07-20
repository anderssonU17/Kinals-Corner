import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/navbar.css';
import logo from '../assets/image/LogoHd.png';

export const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navbarRef = useRef(null);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileMenuClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" ref={navbarRef}>
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" className="logo" />
          <span className="brand-name">Kinals'Corner</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/ayuda-social">
                Ayuda Social
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/maestros">
                Maestros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/foro">
                Foro
              </a>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-outline-primary rounded-pill create-forum-btn">
                Crear foro
              </button>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="notificationsDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={showNotifications}
                onClick={handleNotificationClick}
              >
                <FontAwesomeIcon icon={faBell} />
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  showNotifications ? 'show' : ''
                }`}
                aria-labelledby="notificationsDropdown"
              >
                {/* Aquí puedes agregar la lista de notificaciones */}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={showProfileMenu}
                onClick={handleProfileMenuClick}
              >
                <FontAwesomeIcon icon={faUser} />
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end ${
                  showProfileMenu ? 'show' : ''
                }`}
                aria-labelledby="profileDropdown"
              >
                <li>
                  <a className="dropdown-item" href="/perfil">
                    Ver perfil
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/" onClick={cerrarSesion}>
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
