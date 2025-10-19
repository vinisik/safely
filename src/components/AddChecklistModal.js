import React, { useState } from 'react';

function AddChecklistModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([{ id: 1, text: '' }]);
  const [showJson, setShowJson] = useState(false);
  const [outputJson, setOutputJson] = useState('');

  const handleAddItem = () => {
    // Adiciona uma nova etapa com um ID único
    setItems([...items, { id: Date.now(), text: '' }]);
  };

  const handleItemTextChange = (id, newText) => {
    setItems(items.map(item => item.id === id ? { ...item, text: newText } : item));
  };

  const handleRemoveItem = (id) => {
    // Remove uma etapa, mas garante que sempre haja pelo menos uma
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const generateJson = () => {
    const newChecklist = {
      id: Date.now(),
      title: title,
      status: 'pending',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'), // Vence em 7 dias
      items: items.filter(item => item.text.trim() !== ''), // Salva apenas itens preenchidos
    };
    const jsonString = JSON.stringify(newChecklist, null, 2); // O 2 é para formatação bonita
    setOutputJson(jsonString);
    setShowJson(true);
  };
  
  const handleSave = () => {
    if (title.trim() === '') {
        alert('Por favor, adicione um título ao checklist.');
        return;
    }
    const newChecklist = {
      id: Date.now(),
      title: title,
      status: 'pending',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      items: items.filter(item => item.text.trim() !== ''),
    };
    onAdd(newChecklist);
    onClose();
    // Limpa o formulário para a próxima vez
    setTitle('');
    setItems([{ id: 1, text: '' }]);
    setShowJson(false);
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
                placeholder="Ex: Verificação Pré-Uso - Empilhadeira"
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
              <button onClick={onClose} className="btn-cancel">Cancelar</button>
              <button onClick={generateJson} className="btn-secondary">Ver JSON</button>
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