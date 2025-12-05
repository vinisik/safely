import React from 'react';
import { Link } from 'react-router-dom';
import logoEmpresa from '../assets/michelin.png';
import { FaIdBadge, FaBuilding, FaClipboardList, FaMedal } from 'react-icons/fa';
import './Pages.css';

function ProfilePage({ user, checklists, totalPoints }) {
  // Dados simulados originais
  let subtitle = 'Operador de Produção';
  if (user.role === 'gestor') {
    subtitle = 'Supervisor de Produção'; 
  }
  const pendingTasks = checklists.filter(c => c.status === 'pending').length;

  return (
    <div className="checklistPageModern">
      <title>Safely | Perfil</title>
      
      {/* Header do Perfil Estilo Glass */}
      <div className="profileHeaderGlass">
        {/* Avatar com Logo Sobreposto */}
        <div className="profileAvatarContainer">
           <img src={user.profilePictureUrl} alt="Avatar" className="mainProfileImg" />
           <img src={logoEmpresa} alt="Michelin" className="companyBadgeImg" />
        </div>
        
        <h1 style={{color: '#333', marginBottom: '0.5rem'}}>{user.name}</h1>
        
        <div className="profileMetaBadges">
           <div className="metaBadgePill">
              <FaBuilding /> Michelin - Itatiaia
           </div>
           <div className="metaBadgePill">
              <FaIdBadge /> {subtitle}
           </div>
           <div className="metaBadgePill" style={{background: '#fff3e0', color: '#ef6c00'}}>
              ID: {user.idColaborador}
           </div>
        </div>
      </div>

      {/* Grid de Estatísticas */}
      <div className="profileStatsGrid">
        <div className="statCardGlass">
          <div style={{color: '#ffc107', fontSize: '2rem', marginBottom: '0.5rem'}}>
             <FaClipboardList />
          </div>
          <h3>Tarefas Pendentes</h3>
          <p>{pendingTasks}</p>
        </div>
        
        <div className="statCardGlass">
          <div style={{color: '#005A9C', fontSize: '2rem', marginBottom: '0.5rem'}}>
             <FaMedal />
          </div>
          <h3>Pontuação Total</h3>
          <p>{totalPoints}</p>
        </div>
      </div>
      
      {/* Ações */}
      <div className="profileActionsGrid">
          <Link to="/checklists" className="btnNewChecklist">
             Ver Minhas Tarefas
          </Link>
          <Link to="/recompensas" className="btnNewChecklist" style={{background: 'white', color: '#005A9C', border: '1px solid #005A9C'}}>
             Ir para Loja
          </Link>
      </div>
    </div>
  );
}

export default ProfilePage;