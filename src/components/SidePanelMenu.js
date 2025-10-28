import React from 'react';
import { NavLink } from 'react-router-dom';
// Importe os ícones que desejar para o menu lateral
import { FaUser, FaCog, FaSignOutAlt, FaPlus, FaChartBar } from 'react-icons/fa'; 

// Recebe props para controlar visibilidade, fechar, dados do usuário e logout
function SidePanelMenu({ isOpen, onClose, user, onLogout }) {
  const companyInfo = 'Michelin - Itatiaia';

  // Impede que o clique dentro do painel feche o painel
  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Overlay escuro que cobre a tela
    <div className={`side-panel-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      {/* O painel lateral em si */}
      <div className={`side-panel ${isOpen ? 'open' : ''}`} onClick={handlePanelClick}>
        <div className="side-panel-header">
          <img src={user.profilePictureUrl} alt="Avatar" className="side-panel-avatar"/>
          <div className="side-panel-user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-subtitle">{companyInfo}</span>
          </div>
          {/* Botão placeholder '+' como no X */}
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
            <FaSignOutAlt /> Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default SidePanelMenu;