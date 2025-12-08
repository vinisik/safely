import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaUser, FaCog, FaSignOutAlt, FaPlus, FaChartBar, 
  FaMoon, FaSun, FaHeadset, FaBookOpen 
} from 'react-icons/fa'; 
import './Components.css';

function SidePanelMenu({ isOpen, onClose, user, onLogout, onOpenChat }) {
  const companyInfo = 'Michelin - Itatiaia';
  const [darkMode, setDarkMode] = useState(false);

  // Sincroniza o estado do tema ao abrir o menu
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
        
        {/* Cabeçalho do Menu */}
        <div className="side-panel-header">
          <img src={user.profilePictureUrl} alt="Avatar" className="side-panel-avatar"/>
          <div className="side-panel-user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-subtitle">{companyInfo}</span>
          </div>
          <button className="add-account-btn"><FaPlus /></button>
        </div>
        
        {/* Lista de Navegação */}
        <nav className="side-panel-nav">
          <ul>
            <li>
                <NavLink to="/perfil" onClick={onClose}>
                    <FaUser /> Perfil
                </NavLink>
            </li>
            
            {/* Opção exclusiva para Gestores */}
            {user.role === 'gestor' && (
              <li>
                  <NavLink to="/gestao" onClick={onClose}>
                      <FaChartBar /> Gestão
                  </NavLink>
              </li>
            )}
            
            {/* Acesso ao Chat de Suporte */}
            <li>
                <a href="#" onClick={(e) => { 
                    e.preventDefault(); 
                    onOpenChat(); 
                    onClose(); 
                }}>
                    <FaHeadset /> Suporte Online
                </a>
            </li>

            {/* Link para o Tutorial (Como Usar) */}
            <li>
                <NavLink to="/tutorial" onClick={onClose}>
                    <FaBookOpen /> Como Usar
                </NavLink>
            </li>

            <li>
                <NavLink to="/configuracoes" onClick={onClose}>
                    <FaCog /> Configurações
                </NavLink>
            </li>
            
            {/* Toggle de Tema */}
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

        {/* Rodapé (Logout) */}
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