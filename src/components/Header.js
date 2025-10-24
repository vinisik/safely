import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import safelyLogo from '../assets/logo.png';
import useIsMobile from '../hooks/useIsMobile';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

function Header({ user, onLogout }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isMobile = useIsMobile

  const companyInfo = 'Michelin - Itatiaia';

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        <img src={safelyLogo} alt="Safely Logo" />
      </NavLink>
      
      <nav className="desktop-nav">
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Início</NavLink></li>
          <li><NavLink to="/videos" className={({ isActive }) => isActive ? "active-link" : ""}>Treinamentos</NavLink></li>
          <li><NavLink to="/checklists" className={({ isActive }) => isActive ? "active-link" : ""}>Checklists</NavLink></li>
          <li><NavLink to="/quizzes" className={({ isActive }) => isActive ? "active-link" : ""}>Quizzes</NavLink></li>
          <li><NavLink to="/pontos" className={({ isActive }) => isActive ? "active-link" : ""}>Meus Pontos</NavLink></li>
        </ul>
      </nav>

      <div className="user-info-container" ref={dropdownRef}>
        <div className="user-info" onClick={() => setDropdownOpen(!isDropdownOpen)}>
          <img src={user.profilePictureUrl} alt="Avatar do Usuário" />
          {isMobile && (
            <div className='user-details'>
              <span className="user-name">
                {user.name}
              </span>
              <span className="user-subtitle">
                  {companyInfo} 
              </span>
            </div>
            
          )}
          <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}><FaAngleDown/></span>
        </div>

        {isDropdownOpen && (
          <div className="profile-dropdown">
            <ul>
              <li className='user-name-dropdown'>{user.name} <span className='arrow-up' ><FaAngleUp onClick={() => setDropdownOpen(!isDropdownOpen)}/></span></li>
              <li><NavLink to="/perfil" onClick={() => setDropdownOpen(false)}>Meu Perfil</NavLink></li>
              <li><NavLink to="/configuracoes" onClick={() => setDropdownOpen(false)}>Configurações</NavLink></li>
              <li>
                <button onClick={() => {
                  setDropdownOpen(false);
                  onLogout();
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