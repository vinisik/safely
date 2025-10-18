import React from 'react';
import { Link } from 'react-router-dom';
import safelyLogo from '../assets/logo.png';

// O Header agora recebe o 'user' como uma propriedade
function Header({ user }) {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={safelyLogo} alt="Safely Logo" />
        SAFE<span className='sufix'>LY</span>
      </Link>
      
      <nav className="desktop-nav">
        {/* ... (o menu continua igual) ... */}
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/videos">Treinamentos em Vídeo</Link></li>
          <li><Link to="/quizzes">Quizzes</Link></li>
          <li><Link to="/checklists">Checklists de Segurança</Link></li>
          <li><Link to="/pontos">Meus Pontos</Link></li>
        </ul>
      </nav>

      <div className="user-info">
        <img src="https://i.pravatar.cc/35" alt="Avatar do Usuário" />
        {/* A saudação agora usa o nome do usuário que veio do estado do App.js */}
        <span className="user-name">Olá, {user.name}!</span>
      </div>
    </header>
  );
}

export default Header;