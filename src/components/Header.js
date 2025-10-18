import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import safelyLogo from '../assets/logo.png';

function Header({ user, onLogout }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref para o container do dropdown

  // Lógica para fechar o dropdown ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    // Adiciona o listener quando o dropdown está aberto
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Remove o listener ao limpar o efeito
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        <img src={safelyLogo} alt="Safely Logo" />
        Safe<span className='sufix'>ly</span>
      </NavLink>
      
      <nav className="desktop-nav">
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Início</NavLink></li>
          <li><NavLink to="/videos" className={({ isActive }) => isActive ? "active-link" : ""}>Treinamentos</NavLink></li>
          <li><NavLink to="/quizzes" className={({ isActive }) => isActive ? "active-link" : ""}>Quizzes</NavLink></li>
          <li><NavLink to="/checklists" className={({ isActive }) => isActive ? "active-link" : ""}>Checklists</NavLink></li>
          <li><NavLink to="/pontos" className={({ isActive }) => isActive ? "active-link" : ""}>Meus Pontos</NavLink></li>
        </ul>
      </nav>

      {/* Ref no container do usuário */}
      <div className="user-info-container" ref={dropdownRef}>
        <div className="user-info" onClick={() => setDropdownOpen(!isDropdownOpen)}>
          <img src={user.profilePictureUrl} alt="Avatar do Usuário" />
          <span className="user-name">Olá, {user.name}!</span>
          <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▾</span>
        </div>

        {isDropdownOpen && (
          <div className="profile-dropdown">
            <ul>
              <li><NavLink to="/perfil" onClick={() => setDropdownOpen(false)}>Meu Perfil</NavLink></li>
              <li><NavLink to="/configuracoes" onClick={() => setDropdownOpen(false)}>Configurações</NavLink></li>
              <li>
                <button onClick={() => {
                  setDropdownOpen(false); // Fecha o menu
                  onLogout(); // Executa o logout
                }}>
                  Sair
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