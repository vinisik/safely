import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt, FaPlus, FaChartBar, FaMoon, FaSun, FaHeadset } from 'react-icons/fa'; // Adicionado FaHeadset
import './Components.css';

function SidePanelMenu({ isOpen, onClose, user, onLogout, onOpenChat }) {
  const companyInfo = 'Michelin - Itatiaia';
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDarkMode(document.body.classList.contains('dark-mode'));
    }
  }, [isOpen]);

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

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`side-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`side-panel ${isOpen ? 'open' : ''}`} onClick={handlePanelClick}>
        
        <div className="side-panel-header">
          <img src={user.profilePictureUrl} alt="Avatar" className="side-panel-avatar"/>
          <div className="side-panel-user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-subtitle">{companyInfo}</span>
          </div>
          <button className="add-account-btn"><FaPlus /></button>
        </div>
        
        <nav className="side-panel-nav">
          <ul>
            <li><NavLink to="/perfil" onClick={onClose}><FaUser /> Perfil</NavLink></li>
            {user.role === 'gestor' && (
              <li><NavLink to="/gestao" onClick={onClose}><FaChartBar /> Gestão</NavLink></li>
            )}
            
            <li>
                <a href="#" onClick={(e) => { 
                    e.preventDefault(); 
                    onOpenChat(); // Abre o chat
                    onClose();    // Fecha o menu lateral
                }}>
                    <FaHeadset /> Suporte Online
                </a>
            </li>

            <li><NavLink to="/configuracoes" onClick={onClose}><FaCog /> Configurações</NavLink></li>
            
            <li>
                <a href="#" onClick={(e) => { e.preventDefault(); toggleTheme(); }} style={{justifyContent: 'space-between', display: 'flex', width: '100%'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        {darkMode ? <FaMoon /> : <FaSun />}
                        <span>Tema</span>
                    </div>
                    <span style={{fontSize: '0.85rem', opacity: 0.6, fontWeight: '500'}}>
                        {darkMode ? 'Escuro' : 'Claro'}
                    </span>
                </a>
            </li>

          </ul>
        </nav>

        <div className="side-panel-footer">
          <button onClick={() => { onClose(); onLogout(); }} className="logout-button">
            <FaSignOutAlt /> Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidePanelMenu;