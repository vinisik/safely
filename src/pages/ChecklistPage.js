import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaClock, FaCheck, FaTimes, FaCamera } from 'react-icons/fa';

// Importa o novo CSS
import './Pages.css';

function ChecklistPage({ user, checklists, updateChecklistStatus, addPoints }) {
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
      if (checklistData.status !== 'completed') {
        addPoints(50); 
      }
      updateChecklistStatus(checklistData.id, 'completed');
      setIsSubmitted(true);
  }

  if (!checklistData) {
    return (
        <div className="checklistPageModern" style={{textAlign: 'center', marginTop: '50px'}}>
            <h2>Checklist não encontrado.</h2>
            <Link to="/checklists" className="btnNewChecklist" style={{display: 'inline-block', marginTop: '20px'}}>Voltar</Link>
        </div>
    );
  }
  
  if (isSubmitted) {
      return (
        <div className="checklistPageModern">
            <div className="successCard">
                <div style={{fontSize: '4rem', color: '#2e7d32', marginBottom: '1rem'}}>
                    <FaCheck />
                </div>
                <h2>Checklist Enviado! <span className="pointsGained">+50 pts</span></h2>
                <p style={{color: '#666', margin: '1rem 0 2rem 0'}}>
                    Obrigado, {user.name}. Suas respostas foram registradas com segurança.
                </p>
                <Link to="/checklists" className="btnNewChecklist" style={{justifyContent: 'center'}}>
                    Voltar ao Início
                </Link>
            </div>
        </div>
      );
  }

  return (
    <div className="checklistPageModern">
      {/* Header com Gradiente */}
      <div className="checklistHeaderCard">
        <h1>{checklistData.title}</h1>
        <div className="headerMetaGrid">
          <div className="metaItem"><FaUser /> {user.name}</div>
          <div className="metaItem"><FaCalendarAlt /> {new Date().toLocaleDateString()}</div>
          <div className="metaItem"><FaClock /> Vence em: {checklistData.dueDate}</div>
        </div>
      </div>

      <div className="checklistItemsContainer">
        {checklistData.items.map((item, index) => (
          <div key={item.id} className="questionCard">
            <div className="questionText">
                <span style={{color: '#005A9C', fontWeight: 'bold', marginRight: '10px'}}>
                    #{index + 1}
                </span> 
                {item.text}
            </div>
            
            <div className="actionButtons">
              <button
                className={`btnCheckAction ok ${answers[item.id]?.status === 'ok' ? 'active' : ''}`}
                onClick={() => handleStatusChange(item.id, 'ok')}
              >
                <FaCheck /> Conforme
              </button>
              <button
                className={`btnCheckAction nok ${answers[item.id]?.status === 'nok' ? 'active' : ''}`}
                onClick={() => handleStatusChange(item.id, 'nok')}
              >
                <FaTimes /> Não Conforme
              </button>
            </div>
            
            {answers[item.id]?.status === 'nok' && (
              <div className="nokArea">
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>
                    Detalhes da Não Conformidade:
                </label>
                <textarea 
                    placeholder="Descreva o problema encontrado..."
                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                />
                <button className="btnCheckAction" style={{width: 'auto', fontSize: '0.9rem'}}>
                    <FaCamera /> Anexar Foto
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="submitButtonContainer">
        <button className="btnSubmitHuge" onClick={handleSubmit}>
          Finalizar e Enviar
        </button>
      </div>
    </div>
  );
}

export default ChecklistPage;