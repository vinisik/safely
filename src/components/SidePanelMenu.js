import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt, FaPlus, FaChartBar } from 'react-icons/fa'; 

// Importa o novo CSS
import './Components.css';

function SidePanelMenu({ isOpen, onClose, user, onLogout }) {
  const companyInfo = 'Michelin - Itatiaia';

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`side-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className={`side-panel ${isOpen ? 'open' : ''}`} onClick={handlePanelClick}>
        
        {/* Header Moderno */}
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
            <li><NavLink to="/configuracoes" onClick={onClose}><FaCog /> Configurações</NavLink></li>
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