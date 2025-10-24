import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddChecklistModal from '../components/AddChecklistModal';
import { FaClipboard, FaClipboardList,  FaCheckCircle, FaClock, FaSearch, FaCalendar} from 'react-icons/fa';

function ChecklistsList({ checklists, addChecklist, deleteChecklist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // const handleDelete = (e, checklistId, checklistTitle) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (window.confirm(`Tem certeza que deseja excluir o checklist "${checklistTitle}"?`)) {
  //     deleteChecklist(checklistId);
  //   }
  // };

  // --- CÁLCULO DAS CONTAGENS ---
  const totalCount = checklists.length;
  const pendingCount = checklists.filter(c => c.status === 'pending').length;
  const completedCount = checklists.filter(c => c.status === 'completed').length;

  const filteredChecklists = checklists.filter(checklist => {
    // Filtro de Status
    const statusMatch = activeFilter === 'all' || checklist.status === activeFilter;
    
    // Filtro de Busca (ignora maiúsculas/minúsculas)
    const searchMatch = checklist.title.toLowerCase().includes(searchTerm.toLowerCase());

    // Retorna true apenas se ambos os filtros corresponderem
    return statusMatch && searchMatch;
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
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">＋ Novo Checklist</button>
        </div>

        <div className="summary-cards-grid checklist-summary-grid"> {/* Adiciona classe específica */}
          {/* Card Total */}
          <div className="summary-card">
            <div className="summary-content">
              <span className="summary-value">{totalCount}</span>
              <span className="summary-label">Total</span>
            </div>
            <div className="summary-icon icon-total"> {/* Classe específica para cor */}
              <FaClipboardList size={20}/>
            </div>
          </div>
          {/* Card Pendentes */}
          <div className="summary-card">
            <div className="summary-content">
              <span className="summary-value">{pendingCount}</span>
              <span className="summary-label">Pendentes</span>
            </div>
            <div className="summary-icon icon-pending"> {/* Classe específica para cor */}
              <FaClock size={20}/>
            </div>
          </div>
          {/* Card Concluídos */}
          <div className="summary-card">
            <div className="summary-content">
              <span className="summary-value">{completedCount}</span>
              <span className="summary-label">Concluídos</span>
            </div>
            <div className="summary-icon icon-completed"> {/* Classe específica para cor */}
               <FaCheckCircle size={20}/>
            </div>
          </div>
        </div>

        <div className="search-bar-container">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar checklist..." 
              className="search-bar" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado da busca
            />
          </div>

        <div className="page-controls">
          <div className="filter-buttons" style={{marginBottom: '0px'}}>
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Todos ({totalCount})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pending')}
            >
              Pendentes ({pendingCount})
            </button>
            <button
              className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              Concluídos ({completedCount})
            </button>
          </div>
        </div>

        {/* O container ainda existe, mas será estilizado para ser invisível */}
        <div className="list-container">
        {filteredChecklists.map((item) => (
          <Link to={`/checklists/${item.id}`} key={item.id} className="list-item-link">
             <div className="list-item checklist-item-with-icon"> {/* Adiciona nova classe */}
                {/* 2. Adiciona o ícone aqui */}
                <FaClipboard className="item-prefix-icon" /> 
                <div className="list-item-content">
                  <h3>{item.title}</h3>
                  <span className='checklist-category'><FaCalendar/> {item.category}</span>
                  <p className="due-date-text">
                    <FaClock className="due-date-icon" /> {item.dueDate}
                  </p>
                </div>
                <span className={`status-badge ${item.status}`}>{item.status === 'pending' ? 'Pendente' : 'Concluído'}</span>
              </div>
          </Link>
        ))}
      </div>
      </div>
    </>
  );
}

export default ChecklistsList;