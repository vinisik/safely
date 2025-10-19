import React, { useState } from 'react';

function AddChecklistModal({ isOpen, onClose, onAdd }) {
  const [jsonText, setJsonText] = useState('');

  const handleAdd = () => {
    try {
      const newChecklist = JSON.parse(jsonText);
      // Validação simples para garantir que o JSON tem as propriedades mínimas
      if (!newChecklist.id || !newChecklist.title || !newChecklist.items) {
        throw new Error("O JSON precisa ter as chaves 'id', 'title' e 'items'.");
      }
      onAdd(newChecklist); // Chama a função do App.js para adicionar
      onClose(); // Fecha o modal
    } catch (error) {
      alert(`Erro no formato JSON: ${error.message}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Adicionar Novo Checklist (via JSON)</h2>
        <p>Cole o código JSON do novo checklist abaixo.</p>
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder='Ex: { "id": 204, "title": "Inspeção de Veículo", ... }'
        />
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">Cancelar</button>
          <button onClick={handleAdd} className="btn-add">Adicionar</button>
        </div>
      </div>
    </div>
  );
}

export default AddChecklistModal;