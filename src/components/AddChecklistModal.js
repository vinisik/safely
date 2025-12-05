import React, { useState } from 'react';
import { FaTimes, FaHeading, FaCalendarAlt, FaListUl, FaPlus, FaTrash, FaSave, FaCode } from 'react-icons/fa';

// Importa o CSS
import './Components.css';

function AddChecklistModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([{ id: 1, text: '' }]);
  const [dueDate, setDueDate] = useState('');
  const [showJson, setShowJson] = useState(false);
  const [outputJson, setOutputJson] = useState('');

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), text: '' }]);
  };

  const handleItemTextChange = (id, newText) => {
    setItems(items.map(item => item.id === id ? { ...item, text: newText } : item));
  };

  const handleRemoveItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const generateJson = () => {
    const newChecklist = {
      id: Date.now(),
      title: title,
      status: 'pending',
      dueDate: dueDate ? new Date(dueDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : "Sem data",
      items: items.filter(item => item.text.trim() !== ''),
    };
    const jsonString = JSON.stringify(newChecklist, null, 2);
    setOutputJson(jsonString);
    setShowJson(true);
  };
  
  const handleSave = () => {
    if (title.trim() === '' || dueDate === '') {
        alert('Por favor, adicione um título e uma data de validade.');
        return;
    }
    const newChecklist = {
      id: Date.now(),
      title: title,
      status: 'pending',
      dueDate: new Date(dueDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
      items: items.filter(item => item.text.trim() !== ''),
    };
    onAdd(newChecklist);
    handleClose();
  }

  const handleClose = () => {
    setTitle('');
    setItems([{ id: 1, text: '' }]);
    setDueDate('');
    setShowJson(false);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modalBackdropGlass">
      <div className="modalCardGlass">
        
        {/* Header do Modal */}
        <div className="modalHeaderModern">
          <h2>{showJson ? 'JSON Gerado' : 'Novo Checklist'}</h2>
          <button onClick={handleClose} className="btnCloseModal">
            <FaTimes />
          </button>
        </div>
        
        {!showJson ? (
          <>
            {/* Input: Título */}
            <div className="inputGroupModal">
              <label>Título do Checklist</label>
              <div className="inputWrapper">
                 <FaHeading className="inputIcon" />
                 <input 
                    type="text" 
                    className="inputModern"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Inspeção de Extintores"
                 />
              </div>
            </div>

            {/* Input: Data */}
            <div className="inputGroupModal">
              <label>Data de Validade</label>
              <div className="inputWrapper">
                 <FaCalendarAlt className="inputIcon" />
                 <input 
                    type="date" 
                    className="inputModern"
                    value={dueDate} 
                    onChange={(e) => setDueDate(e.target.value)}
                 />
              </div>
            </div>
            
            {/* Lista de Itens */}
            <div className="inputGroupModal">
              <label style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                 <FaListUl /> Etapas do Processo
              </label>
              
              <div style={{background: '#f8f9fa', padding: '1rem', borderRadius: '20px', border: '1px solid #eee'}}>
                  {items.map((item, index) => (
                    <div className="itemBuilderRow" key={item.id}>
                      <span style={{fontWeight: 'bold', color: '#005A9C', width: '20px'}}>{index + 1}.</span>
                      <input
                        type="text"
                        className="inputModern"
                        style={{padding: '0.6rem 1rem', fontSize: '0.9rem'}} // Ajuste fino
                        value={item.text}
                        onChange={(e) => handleItemTextChange(item.id, e.target.value)}
                        placeholder={`Descreva a etapa ${index + 1}`}
                      />
                      <button onClick={() => handleRemoveItem(item.id)} className="btnIconDelete" title="Remover item">
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  
                  <button onClick={handleAddItem} className="btnAddStep">
                    <FaPlus /> Adicionar Nova Etapa
                  </button>
              </div>
            </div>

            {/* Ações */}
            <div className="modalActionsModern">
              <button onClick={generateJson} className="btnGhost" title="Ver JSON para desenvolvedores">
                 <FaCode /> JSON
              </button>
              <button onClick={handleClose} className="btnGhost">
                 Cancelar
              </button>
              <button onClick={handleSave} className="btnNewChecklist">
                 <FaSave /> Salvar Checklist
              </button>
            </div>
          </>
        ) : (
            // Visualização do JSON
            <>
                <pre className="jsonPreviewBox">{outputJson}</pre>
                <div className="modalActionsModern">
                    <button onClick={() => setShowJson(false)} className="btnGhost">
                       <FaTimes /> Fechar Visualização
                    </button>
                </div>
            </>
        )}
      </div>
    </div>
  );
}

export default AddChecklistModal;