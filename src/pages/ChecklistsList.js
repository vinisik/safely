import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddChecklistModal from '../components/AddChecklistModal';

// Recebe 'checklists' e 'addChecklist' como props do App.js
function ChecklistsList({ checklists, addChecklist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* O componente do Modal é renderizado aqui */}
      <AddChecklistModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addChecklist}
      />

      <div className="page-container">
        <div className="page-header">
          <h1>Checklists de Segurança</h1>
          {/* O botão agora abre o modal */}
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">＋ Novo Checklist</button>
        </div>
        <div className="list-container">
          {/* A lista agora vem das props, garantindo que ela seja atualizada */}
          {checklists.map((item) => (
            <Link to={`/checklist/${item.id}`} key={item.id} className="list-item-link">
              <div className="list-item">
                <div className="list-item-content">
                  <h3>{item.title}</h3>
                  <p>Status: {item.status}</p>
                </div>
                <span className={`status-badge ${item.status}`}>
                  {item.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChecklistsList;