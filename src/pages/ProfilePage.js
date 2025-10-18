import React from 'react';
import { checklists } from '../data/mockData';
import { Link } from 'react-router-dom';
import logoEmpresa from '../assets/michelin.png';

function ProfilePage({ user }) {
  // Dados simulados, como em outras páginas
  const totalPoints = 1250;
  const companyName = 'Michelin - Operador de Produção';
  const pendingTasks = checklists.filter(c => c.status === 'pending').length;

  return (
    <div className="page-container profile-page">
      <div className="profile-header">
        <img src={user.profilePictureUrl} alt="Avatar do Usuário" className="profile-avatar" />
        <img src={logoEmpresa} alt="Logo da Empresa" className="profile-avatar" />
        <h1>{user.name}</h1>
        <p>{companyName}</p>
      </div>

      <div className="profile-info-grid">
        <div className="info-card card">
          <h3>ID de Colaborador</h3>
          <p>{user.idColaborador}</p>
        </div>
        <div className="info-card card">
          <h3>Pontuação Total</h3>
          <p>{totalPoints}</p>
        </div>
        <div className="info-card card">
          <h3>Tarefas Pendentes</h3>
          <p>{pendingTasks}</p>
        </div>
      </div>
      
      <div className="profile-actions">
          <Link to="/recompensas" className="btn">Ver Recompensas</Link>
          <Link to="/checklists" className="btn">Ver Tarefas</Link>
      </div>
    </div>
  );
}

export default ProfilePage;