import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddChecklistModal from '../components/AddChecklistModal';
import { FaClipboardCheck, FaListUl, FaCheck, FaClock, FaSearch, FaCalendarAlt, FaPlus } from 'react-icons/fa';

// Importa o novo CSS
import './Pages.css';

function ChecklistsList({ checklists, addChecklist, deleteChecklist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // --- CÁLCULO DAS CONTAGENS ---
  const totalCount = checklists.length;
  const pendingCount = checklists.filter(c => c.status === 'pending').length;
  const completedCount = checklists.filter(c => c.status === 'completed').length;

  const filteredChecklists = checklists.filter(checklist => {
    const statusMatch = activeFilter === 'all' || checklist.status === activeFilter;
    const searchMatch = checklist.title.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <>
      <title>Safely | Checklists</title>
      <AddChecklistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addChecklist}
      />
      
      {/* Container Principal Moderno */}
      <div className="checklistPageModern">
        
        {/* Header da Página */}
        <div className="pageHeaderModern">
          <h1>Checklists de Segurança</h1>
          <button onClick={() => setIsModalOpen(true)} className="btnNewChecklist">
            <FaPlus /> Novo Checklist
          </button>
        </div>

        {/* Grid de Resumo (Glassmorphism) */}
        <div className="summaryGridModern">
          <div className="summaryCardGlass">
            <div className="summaryContent">
              <h3>{totalCount}</h3>
              <span>Total</span>
            </div>
            <div className="summaryIconBox iconTotal">
              <FaListUl />
            </div>
          </div>
          
          <div className="summaryCardGlass">
            <div className="summaryContent">
              <h3>{pendingCount}</h3>
              <span>Pendentes</span>
            </div>
            <div className="summaryIconBox iconPending">
              <FaClock />
            </div>
          </div>
          
          <div className="summaryCardGlass">
            <div className="summaryContent">
              <h3>{completedCount}</h3>
              <span>Concluídos</span>
            </div>
            <div className="summaryIconBox iconCompleted">
               <FaCheck />
            </div>
          </div>
        </div>

        {/* Controles: Busca e Filtros */}
        <div className="controlsContainer">
          <div className="searchBarGlass">
            <FaSearch className="searchIconModern" />
            <input 
              type="text" 
              placeholder="Buscar checklist por título..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filterPills">
            <button
              className={`filterBtnPill ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Todos
            </button>
            <button
              className={`filterBtnPill ${activeFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pending')}
            >
              Pendentes
            </button>
            <button
              className={`filterBtnPill ${activeFilter === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('completed')}
            >
              Concluídos
            </button>
          </div>
        </div>

        {/* Lista de Checklists (Cards) */}
        <div className="checklistListModern">
          {filteredChecklists.map((item) => (
            <Link 
              to={`/checklists/${item.id}`} 
              key={item.id} 
              className={`checklistItemGlass status-${item.status}`}
            >
               <div className="itemMainInfo">
                  {/* Ícone Redondo */}
                  <div className="itemIconCircle">
                    <FaClipboardCheck />
                  </div>
                  
                  <div className="itemTexts">
                    <h3>{item.title}</h3>
                    <div className="itemMeta">
                      <span><FaCalendarAlt size={12}/> {item.category}</span>
                      <span><FaClock size={12}/> {item.dueDate}</span>
                    </div>
                  </div>
               </div>

               <span className={`statusBadgePill ${item.status}`}>
                 {item.status === 'pending' ? 'Pendente' : 'Concluído'}
               </span>
            </Link>
          ))}
          
          {filteredChecklists.length === 0 && (
            <div style={{textAlign: 'center', padding: '2rem', color: '#888'}}>
              Nenhum checklist encontrado para este filtro.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChecklistsList;