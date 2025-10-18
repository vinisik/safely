import React from 'react';
import { checklists } from '../data/mockData';

// Simula uma lista maior
const allChecklists = [...checklists, ...checklists.slice(0,3).map(c => ({...c, status: 'completed'}))];

function ChecklistsList() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Checklists de Segurança</h1>
        <button className="btn btn-primary">＋ Novo Checklist</button>
      </div>
      <div className="list-container">
        {allChecklists.map((item, index) => (
          <div key={`${item.id}-${index}`} className="list-item">
            <div className="list-item-content">
              <h3>{item.title}</h3>
              <p>Status: {item.status === 'pending' ? 'Pendente' : 'Concluído'}</p>
            </div>
            <span className={`status-badge ${item.status}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChecklistsList;