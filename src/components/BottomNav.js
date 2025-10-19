import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaVideo, FaClipboardList, FaCheckSquare, FaStar } from 'react-icons/fa';

function BottomNav( {pendingCount} ) {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
        <FaHome size={22} />
        <span>Início</span>
      </NavLink>
      <NavLink to="/videos" className={({ isActive }) => isActive ? "active" : ""}>
        <div className='nav-icon-wrapper'>
          <FaVideo size={22} />
          <span className='notification-dot'></span>
        </div>
        <span>Vídeos</span>
      </NavLink>
      <NavLink to="/checklists" className={({ isActive }) => isActive ? "active" : ""}>
        <div className="nav-icon-wrapper">
          <FaCheckSquare size={24} />
          {pendingCount > 0 && <span className="notification-dot"></span>}
        </div>
        <span>Checklists</span>
      </NavLink>
      <NavLink to="/quizzes" className={({ isActive }) => isActive ? "active" : ""}>
        <div className='nav-icon-wrapper'>
          <FaClipboardList size={22} />
          <span className='notification-dot'></span>
        </div>
        <span>Quizzes</span>
      </NavLink>
      <NavLink to="/pontos" className={({ isActive }) => isActive ? "active" : ""}>
        <FaStar size={22} />
        <span>Pontos</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;