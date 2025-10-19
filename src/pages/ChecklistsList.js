import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddChecklistModal from '../components/AddChecklistModal';
import { FaTrash } from 'react-icons/fa';

// Recebe 'checklists' e 'addChecklist' como props do App.js
function ChecklistsList({ checklists, addChecklist, deleteChecklist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (e, checklistId, checklistTitle) => {
    // Impede que o clique no botão também ative o link da linha
    e.preventDefault(); 
    e.stopPropagation();

    // Adiciona uma confirmação para segurança
    if (window.confirm(`Tem certeza que deseja excluir o checklist "${checklistTitle}"?`)) {
      deleteChecklist(checklistId);
    }
  };

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
                  <div>
                    <h3>{item.title}<span className={`status-badge ${item.status}`}>{item.status === 'pending' ? 'Pendente' : 'Concluído'}</span></h3>
                  </div>
                </div>
                <button 
                  className="btn-delete" 
                  onClick={(e) => handleDelete(e, item.id, item.title)}
                >
                  <FaTrash /> {/* Ícone */}
                </button>
                
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ChecklistsList;