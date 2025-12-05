import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaVideo, FaClipboardList, FaCheckSquare, FaStar, FaChartBar } from 'react-icons/fa';

import './Components.css'; // Importa o CSS

function BottomNav( {pendingCount, user} ) {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
        <FaHome />
        <span>Início</span>
      </NavLink>
      
      <NavLink to="/videos" className={({ isActive }) => isActive ? "active" : ""}>
        <div className='nav-icon-wrapper'>
          <FaVideo />
        </div>
        <span>Vídeos</span>
      </NavLink>
      
      <NavLink to="/checklists" className={({ isActive }) => isActive ? "active" : ""}>
        <div className="nav-icon-wrapper">
          <FaCheckSquare />
          {pendingCount > 0 && <span className="notification-dot"></span>}
        </div>
        <span>Tarefas</span>
      </NavLink>
      
      <NavLink to="/quizzes" className={({ isActive }) => isActive ? "active" : ""}>
        <div className='nav-icon-wrapper'>
          <FaClipboardList />
        </div>
        <span>Quizzes</span>
      </NavLink>
      
      <NavLink to="/pontos" className={({ isActive }) => isActive ? "active" : ""}>
        <FaStar />
        <span>Pontos</span>
      </NavLink>
      
      {user.role === 'gestor' && (
        <NavLink to="/gestao" className={({ isActive }) => isActive ? "active" : ""}>
          <FaChartBar />
          <span>Gestão</span>
        </NavLink>
      )}
    </nav>
  );
}

export default BottomNav;