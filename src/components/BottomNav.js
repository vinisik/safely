import React from 'react';
import { NavLink } from 'react-router-dom';
// Importando os ícones que vamos usar
import { FaHome, FaVideo, FaClipboardList, FaCheckSquare, FaStar } from 'react-icons/fa';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" exact activeClassName="active">
        <FaHome size={22} />
        <span>Início</span>
      </NavLink>
      <NavLink to="/videos" activeClassName="active">
        <FaVideo size={22} />
        <span>Vídeos</span>
      </NavLink>
      <NavLink to="/quizzes" activeClassName="active">
        <FaClipboardList size={22} />
        <span>Quizzes</span>
      </NavLink>
      <NavLink to="/checklists" activeClassName="active">
        <FaCheckSquare size={22} />
        <span>Checklists</span>
      </NavLink>
      <NavLink to="/pontos" activeClassName="active">
        <FaStar size={22} />
        <span>Pontos</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;