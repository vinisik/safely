import React from 'react';

const ChecklistCard = ({ title, status }) => (
  <div className="card checklist-card">
    <div className="card-content">
      <h3>{title}</h3>
      <p>Status: {status === 'pending' ? 'Pendente' : 'Concluído'}</p>
    </div>
    {status === 'pending' && <span className="icon-warning">⚠️</span>}
    <span className="status-indicator"></span>
  </div>
);

export default ChecklistCard;