import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddChecklistModal from '../components/AddChecklistModal';
import { FaTrash } from 'react-icons/fa';
import { FaBrain, FaClock } from 'react-icons/fa6';


function ChecklistsList({ checklists, addChecklist, deleteChecklist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleDelete = (e, checklistId, checklistTitle) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Tem certeza que deseja excluir o checklist "${checklistTitle}"?`)) {
      deleteChecklist(checklistId);
    }
  };

  const filteredChecklists = checklists.filter(checklist => {
    if (activeFilter === 'all') {
      return true;
    }
    return checklist.status === activeFilter;
  });

  return (
    <>
      <title>Safely | Checklists</title> {/* Adiciona o título da página */}
      <AddChecklistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addChecklist}
      />
      {/* --- CLASSE ADICIONADA AQUI --- */}
      <div className="page-container checklist-list-page">
        <div className="page-header">
          <h1>Checklists de Segurança</h1>
        </div>

        <div className="page-controls">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Todos
            </button>
            <button
              className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pending')}
            >
              Pendentes
            </button>
            <button
              className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              Concluídos
            </button>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">＋ Novo Checklist</button>
        </div>

        {/* O container ainda existe, mas será estilizado para ser invisível */}
        <div className="list-container">
        {filteredChecklists.map((item) => (
          <Link to={`/checklists/${item.id}`} key={item.id} className="list-item-link">
             <div className="list-item checklist-item-with-icon"> {/* Adiciona nova classe */}
                {/* 2. Adiciona o ícone aqui */}
                <FaBrain className="item-prefix-icon" /> 
                <div className="list-item-content">
                  <h3>{item.title}<span className={`status-badge ${item.status}`}>{item.status === 'pending' ? 'Pendente' : 'Concluído'}</span></h3>
                  <p className="due-date-text">
                    <FaClock className="due-date-icon" /> <strong>Vencimento:</strong> {item.dueDate}
                  </p>
                </div>
                <button
                  className="btn-delete"
                  onClick={(e) => handleDelete(e, item.id, item.title)}
                >
                  <FaTrash />
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