import React, { useState } from 'react';

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
      // Adiciona 1 dia e usa UTC para evitar problemas de fuso horário
      dueDate: new Date(dueDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'}),
      items: items.filter(item => item.text.trim() !== ''),
    };
    onAdd(newChecklist);
    
    // Limpa o formulário e fecha o modal
    setTitle('');
    setItems([{ id: 1, text: '' }]);
    setDueDate('');
    setShowJson(false);
    onClose();
  }

  // Função para fechar e resetar o modal
  const handleClose = () => {
    setTitle('');
    setItems([{ id: 1, text: '' }]);
    setDueDate('');
    setShowJson(false);
    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Criar Novo Checklist</h2>
        
        {!showJson ? (
          <>
            <div className="form-group">
              <label>Título do Checklist</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Data de Validade</label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Etapas do Checklist</label>
              {items.map((item, index) => (
                <div className="checklist-item-builder" key={item.id}>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleItemTextChange(item.id, e.target.value)}
                    placeholder={`Etapa ${index + 1}`}
                  />
                  <button onClick={() => handleRemoveItem(item.id)} className="btn-remove-item">－</button>
                </div>
              ))}
              <button onClick={handleAddItem} className="btn-add-item">＋ Adicionar Etapa</button>
            </div>

            <div className="modal-actions">
              <button onClick={handleClose} className="btn-cancel">Cancelar</button>
              {/* <button onClick={generateJson} className="btn-secondary">Ver JSON</button> */}
              <button onClick={handleSave} className="btn-add">Salvar Checklist</button>
            </div>
          </>
        ) : (
            <>
                <h3>JSON Gerado</h3>
                <pre className="json-output">{outputJson}</pre>
                <div className="modal-actions">
                    <button onClick={() => setShowJson(false)} className="btn-cancel">Voltar ao Editor</button>
                </div>
            </>
        )}
      </div>
    </div>
  );
}

export default AddChecklistModal;