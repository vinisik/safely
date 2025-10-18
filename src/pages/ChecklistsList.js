import React from 'react';
import { checklists } from '../data/mockData';
import { Link } from 'react-router-dom';

// Simula uma lista maior
const allChecklists = [...checklists, ...checklists.slice(0,2).map(c => ({...c, status: 'completed', id: c.id + 100}))];


function ChecklistsList() {
  return (
    <div className="page-container">
      <title>Safely | Checklists</title>
      <div className="page-header">
        <h1>Checklists de Segurança</h1>
        <button className="btn btn-primary">＋ Novo Checklist</button>
      </div>
      <div className="list-container">
        {allChecklists.map((item, index) => (
          // CADA ITEM AGORA É UM LINK PARA A PÁGINA ESPECÍFICA DO CHECKLIST
          <Link to={`/checklist/${item.id}`} key={`${item.id}-${index}`} className="list-item-link">
            <div className="list-item">
              <div className="list-item-content">
                <h3>{item.title}</h3>
                <p>Status: {item.status === 'pending' ? 'Pendente' : 'Concluído'}</p>
              </div>
              <span className={`status-badge ${item.status}`}>
                {item.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChecklistsList;