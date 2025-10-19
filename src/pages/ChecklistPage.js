import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// A importação estática de 'checklists' foi removida daqui

function ChecklistPage({ user, checklists }) { // Recebe 'checklists' como propriedade
  const { id } = useParams();
  
  // A busca agora é feita na lista atualizada que vem das props
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
      console.log("Checklist Enviado:", answers);
      setIsSubmitted(true);
  }

  if (!checklistData) {
    return (
        <div className="page-container" style={{textAlign: 'center'}}>
            <h2>Checklist não encontrado.</h2>
            <p>Este item pode ter sido removido ou o link é inválido.</p>
            <Link to="/checklists" className="btn">Voltar para a Lista</Link>
        </div>
    );
  }
  
  if (isSubmitted) {
      return (
        <div className="page-container submission-success">
            <h2>✅ Checklist Enviado com Sucesso!</h2>
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
          <span>Vencimento: <strong>{checklistData.dueDate}</strong></span>
        </div>
      </div>

      <div className="checklist-items-container">
        {checklistData.items.map((item, index) => (
          <div key={item.id} className="checklist-item card">
            <p className="item-text">{index + 1}. {item.text}</p>
            <div className="item-actions">
              <button
                className={`btn-status ok ${answers[item.id]?.status === 'ok' ? 'active' : ''}`}
                onClick={() => handleStatusChange(item.id, 'ok')}
              >
                Conforme
              </button>
              <button
                className={`btn-status nok ${answers[item.id]?.status === 'nok' ? 'active' : ''}`}
                onClick={() => handleStatusChange(item.id, 'nok')}
              >
                Não Conforme
              </button>
            </div>
            
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