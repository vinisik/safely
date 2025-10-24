import React from 'react';
import { Link } from 'react-router-dom';
import logoEmpresa from '../assets/michelin.png';

function ProfilePage({ user, checklists, totalPoints }) {
  // Dados simulados, como em outras páginas
  const companyName = 'Michelin - Operador de Produção';
  const pendingTasks = checklists.filter(c => c.status === 'pending').length;

  return (
    <div className="page-container profile-page">
      <title>Safely | Perfil</title>
      <div className="profile-header">
        <img src={user.profilePictureUrl} alt="Avatar do Usuário" className="profile-avatar" />
        <img src={logoEmpresa} alt="Logo da Empresa" className="profile-avatar" />
        <h1>{user.name}</h1>
        <h2 className='id-user'>ID: {user.idColaborador}</h2>
        <h3>{companyName}</h3>
      </div>

      <div className="profile-info-grid">
        <div className="info-card">
          <h3>Tarefas Pendentes</h3>
          <p>{pendingTasks}</p>
        </div>
        <div className="info-card">
          <h3>Pontuação Total</h3>
          <p>{totalPoints}</p>
        </div>
      </div>
      
      <div className="profile-actions">
          <Link to="/checklists" className="btn">Ver Tarefas</Link>
          <Link to="/recompensas" className="btn">Ver Recompensas</Link>
      </div>
    </div>
  );
}

export default ProfilePage;