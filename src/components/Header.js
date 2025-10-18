import React from 'react';
// 1. Troque 'Link' por 'NavLink' na importação
import { NavLink } from 'react-router-dom';
import safelyLogo from '../assets/logo.png';

function Header({ user }) {
  return (
    <header className="header">
      <NavLink to="/" className="logo">
        <img src={safelyLogo} alt="Safely Logo" />
        Safely
      </NavLink>
      
      <nav className="desktop-nav">
        <ul>
          {/* 2. Substitua todos os <Link> por <NavLink> e adicione a função de classe */}
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
              Início
            </NavLink>
          </li>
          <li>
            <NavLink to="/videos" className={({ isActive }) => isActive ? "active-link" : ""}>
              Treinamentos em Vídeo
            </NavLink>
          </li>
          <li>
            <NavLink to="/quizzes" className={({ isActive }) => isActive ? "active-link" : ""}>
              Quizzes
            </NavLink>
          </li>
          <li>
            <NavLink to="/checklists" className={({ isActive }) => isActive ? "active-link" : ""}>
              Checklists de Segurança
            </NavLink>
          </li>
          <li>
            <NavLink to="/pontos" className={({ isActive }) => isActive ? "active-link" : ""}>
              Meus Pontos
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="user-info">
        <img src="https://i.pravatar.cc/35" alt="Avatar do Usuário" />
        <span className="user-name">Olá, {user.name}!</span>
      </div>
    </header>
  );
}

export default Header;