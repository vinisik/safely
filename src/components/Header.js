import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import safelyLogo from '../assets/logo.png';
import useIsMobile from '../hooks/useIsMobile';
// Importa ícones para o dropdown do desktop
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

// Recebe 'onProfileClick' (para mobile) e 'onLogout' (para desktop)
function Header({ user, onProfileClick, onLogout }) {
  // Estado para controlar o dropdown do desktop
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref para fechar o dropdown ao clicar fora
  const isMobile = useIsMobile(); // Verifica se a tela é mobile
  const companyInfo = 'Michelin - Itatiaia'; // Informação fixa da empresa

  // Efeito para adicionar/remover o listener de clique fora (apenas no desktop)
  useEffect(() => {
    function handleClickOutside(event) {
      // Se o clique foi fora do elemento referenciado pelo dropdownRef
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Fecha o dropdown
      }
    }
    // Adiciona o listener somente se for desktop E o dropdown estiver aberto
    if (!isMobile && isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // Função de limpeza: remove o listener quando o componente desmonta ou as dependências mudam
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isMobile]); // Re-executa se o estado de abertura ou se é mobile mudar

  // Função unificada para o clique na área do usuário
  const handleUserInfoClick = () => {
    if (isMobile) {
      // Se for mobile, chama a função para abrir o painel lateral
      onProfileClick();
    } else {
      // Se for desktop, alterna o estado de abertura do dropdown
      setDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        <img src={safelyLogo} alt="Safely Logo" />
      </NavLink>
      
      <nav className="desktop-nav">
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Início</NavLink></li>
          <li><NavLink to="/videos" className={({ isActive }) => isActive ? "active-link" : ""}>Treinamentos</NavLink></li>
          <li><NavLink to="/quizzes" className={({ isActive }) => isActive ? "active-link" : ""}>Quizzes</NavLink></li>
          <li><NavLink to="/checklists" className={({ isActive }) => isActive ? "active-link" : ""}>Checklists</NavLink></li>
          <li><NavLink to="/pontos" className={({ isActive }) => isActive ? "active-link" : ""}>Meus Pontos</NavLink></li>
          {user.role === 'gestor' && (
            <li><NavLink to="/gestao" className={({ isActive }) => isActive ? "active-link" : ""}>Gestão</NavLink></li>
          )}
        </ul>
      </nav>

      <div className="user-info-container" ref={dropdownRef}>
        {/* Área clicável do usuário */}
        <div className="user-info" onClick={handleUserInfoClick}>
          <img src={user.profilePictureUrl} alt="Avatar do Usuário" />
          {!isMobile && (
            <div className="user-details">
              <span className="user-name">
                {user.name}
              </span>
              <span className="user-subtitle">
                {companyInfo}
              </span>
            </div>
          )}
          {!isMobile && <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▾</span>}
        </div>

        {!isMobile && isDropdownOpen && (
          <div className="profile-dropdown">
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