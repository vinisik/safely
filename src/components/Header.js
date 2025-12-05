import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import safelyLogo from '../assets/logo.png';
import useIsMobile from '../hooks/useIsMobile';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Components.css';

function Header({ user, onProfileClick, onLogout }) {
  // Estado para controlar o dropdown do desktop
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref para fechar o dropdown ao clicar fora
  const isMobile = useIsMobile(); // Verifica se a tela é mobile
  const companyInfo = 'Michelin - Itatiaia'; // Informação fixa da empresa

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Fecha o dropdown
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

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? "navLink navLinkActive" : "navLink";
  };

  return (
    <header className="headerModern">
      <NavLink to="/" className="logoLink">
        <img src={safelyLogo} alt="Safely Logo" className="logoImg" />
      </NavLink>
      
      <nav className="desktopNav">
        <ul>
          <li>
            <NavLink to="/" className={getNavLinkClass}>
              Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/videos" className={getNavLinkClass}>
              Treinamentos
            </NavLink>
          </li>
          <li>
            <NavLink to="/quizzes" className={getNavLinkClass}>
              Quizzes
            </NavLink>
          </li>
          <li>
            <NavLink to="/checklists" className={getNavLinkClass}>
              Checklists
            </NavLink>
          </li>
          <li>
            <NavLink to="/pontos" className={getNavLinkClass}>
              Meus Pontos
            </NavLink>
          </li>
          {/* Link condicional para Gestores */}
          {user.role === 'gestor' && (
            <li>
              <NavLink to="/gestao" className={getNavLinkClass}>
                Gestão
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      {/* Área do Usuário (Lado Direito) */}
      <div className="userInfoContainer" ref={dropdownRef}>
        <div className="userInfo" onClick={handleUserInfoClick}>
          {/* Avatar primeiro */}
          <img src={user.profilePictureUrl} alt="Avatar do Usuário" className="userAvatar" />
          
          {/* Detalhes de texto e seta aparecem apenas no Desktop */}
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

        {/* Dropdown Menu (Apenas Desktop) */}
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
              <li>
                <button onClick={() => {
                  setDropdownOpen(false); // Fecha o dropdown antes de deslogar
                  onLogout(); // Chama a função de logout passada pelo App.js
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