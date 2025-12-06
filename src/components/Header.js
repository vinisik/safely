import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import safelyLogo from '../assets/logo.png';
import useIsMobile from '../hooks/useIsMobile';
import { FaUser, FaCog, FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import './Components.css';

function Header({ user, onProfileClick, onLogout }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); 
  const dropdownRef = useRef(null);
  const isMobile = useIsMobile();
  const companyInfo = 'Michelin - Itatiaia';

  useEffect(() => {
    const isDark = document.body.classList.contains('dark-mode');
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('safely_theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('safely_theme', 'light');
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (!isMobile && isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isMobile]);

  const handleUserInfoClick = () => {
    if (isMobile) {
      onProfileClick();
    } else {
      setDropdownOpen(!isDropdownOpen);
    }
  };

  const getNavLinkClass = ({ isActive }) => isActive ? "navLink navLinkActive" : "navLink";

  return (
    <header className="headerModern">
      <NavLink to="/" className="logoLink">
        <img src={safelyLogo} alt="Safely Logo" className="logoImg" />
      </NavLink>
      
      <nav className="desktopNav">
        <ul>
          <li><NavLink to="/" className={getNavLinkClass}>Início</NavLink></li>
          <li><NavLink to="/videos" className={getNavLinkClass}>Treinamentos</NavLink></li>
          <li><NavLink to="/quizzes" className={getNavLinkClass}>Quizzes</NavLink></li>
          <li><NavLink to="/checklists" className={getNavLinkClass}>Checklists</NavLink></li>
          <li><NavLink to="/pontos" className={getNavLinkClass}>Meus Pontos</NavLink></li>
          {user.role === 'gestor' && (
            <li><NavLink to="/gestao" className={getNavLinkClass}>Gestão</NavLink></li>
          )}
        </ul>
      </nav>

      <div className="userInfoContainer" ref={dropdownRef}>
        <div className="userInfo" onClick={handleUserInfoClick}>
          <img src={user.profilePictureUrl} alt="Avatar" className="userAvatar" />
          {!isMobile && (
            <>
              <div className="userDetails">
                <span className="userName">{user.name}</span>
                <span className="userSubtitle">{companyInfo}</span>
              </div>
              <span className={`dropdownArrow ${isDropdownOpen ? 'open' : ''}`}>▾</span>
            </>
          )}
        </div>

        {/* Dropdown Desktop */}
        {!isMobile && isDropdownOpen && (
          <div className="profileDropdown">
            <ul>
              <li>
                <NavLink to="/perfil" onClick={() => setDropdownOpen(false)}>
                  <FaUser /> Meu Perfil
                </NavLink>
              </li>
              <li>
                <NavLink to="/configuracoes" onClick={() => setDropdownOpen(false)}>
                  <FaCog /> Configurações
                </NavLink>
              </li>
              
              {/* --- ALTERAÇÃO AQUI --- */}
              <li>
                <button onClick={toggleTheme} style={{justifyContent: 'space-between'}}>
                   <span style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                     {/* Ícone */}
                     {darkMode ? <FaMoon /> : <FaSun />} 
                     {/* Texto Fixo */}
                     Tema
                   </span>
                   {/* Estado Atual (Claro ou Escuro) */}
                   <span style={{fontSize: '0.75rem', opacity: 0.6, fontWeight: '600', textTransform: 'uppercase'}}>
                     {darkMode ? 'Escuro' : 'Claro'}
                   </span>
                </button>
              </li>
              {/* ---------------------- */}

              <li>
                <button onClick={() => {
                  setDropdownOpen(false);
                  onLogout();
                }}>
                  <FaSignOutAlt /> Sair
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;