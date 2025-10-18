import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { checklists } from '../data/mockData';
import { FaCheck, FaTimes } from 'react-icons/fa';

function ChecklistPage({ user }) {
  const { id } = useParams();
  const checklistData = checklists.find(c => c.id === parseInt(id));

  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStatusChange = (itemId, status) => {
    setAnswers(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], status }
    }));
  };

  const handleCommentChange = (itemId, comment) => {
    setAnswers(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], comment }
    }));
  };
  
  const handleSubmit = () => {
      // Em uma aplicação real, aqui você enviaria o objeto 'answers' para o backend
      console.log("Checklist Enviado:", answers);
      setIsSubmitted(true);
  }

  if (!checklistData) {
    return <div>Checklist não encontrado.</div>;
  }
  
  if (isSubmitted) {
      return (
        <div className="page-container submission-success">
            <h2>{FaCheck} Checklist Enviado com Sucesso!</h2>
            <p>Obrigado, {user.name}. Suas respostas foram registradas.</p>
            <p>Qualquer não conformidade reportada já foi notificada ao seu supervisor.</p>
            <Link to="/" className="btn">Voltar ao Início</Link>
        </div>
      );
  }

  return (
    <div className="page-container checklist-page">
      <div className="checklist-header">
        <h1>{checklistData.title}</h1>
        <div className="checklist-meta">
          <span>Operador: <strong>{user.name}</strong></span>
          <span>Data: <strong>{new Date().toLocaleDateString()}</strong></span>
        </div>
      </div>

      <div className="checklist-items-container">
        {checklistData.items.map((item) => (
          <div key={item.id} className="checklist-item card">
            <p className="item-text">{item.id}. {item.text}</p>
            <div className="item-actions">
              <button
                className={`btn-status ok ${answers[item.id]?.status === 'ok' ? 'active' : ''}`}
                onClick={() => handleStatusChange(item.id, 'ok')}
              >
                <FaCheck size={22}/>
              </button>
              <button
                className={`btn-status nok ${answers[item.id]?.status === 'nok' ? 'active' : ''}`}
                onClick={() => handleStatusChange(item.id, 'nok')}
              >
                <FaTimes size={22}/>
              </button>
            </div>
            
            {/* Seção que aparece condicionalmente */}
            {answers[item.id]?.status === 'nok' && (
              <div className="non-conformance-section">
                <label>Descreva o problema:</label>
                <textarea 
                    placeholder="Ex: Vazamento na mangueira inferior..."
                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                />
                <button className="btn-attach-photo">📷 Anexar Foto</button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button className="btn btn-submit-checklist" onClick={handleSubmit}>
        Enviar Checklist
      </button>
    </div>
  );
}

export default ChecklistPage;