import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaTimes, FaPrint, FaCheckCircle, FaExclamationTriangle, FaClipboardList, FaLock } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { checklists as checklistsData } from '../data/mockData';
import './Pages.css'; 

// Registra componentes do gráfico
ChartJS.register(ArcElement, Tooltip, Legend);

function ChecklistPage({ addPoints, updateChecklistStatus, checklists }) { 
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [checklist, setChecklist] = useState(null);
  const [answers, setAnswers] = useState({}); 
  const [observations, setObservations] = useState({}); 
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Estado do Relatório
  const [showReport, setShowReport] = useState(false);
  const [reportStats, setReportStats] = useState({ ok: 0, nok: 0, total: 0, score: 0 });

  useEffect(() => {
    // Usa a prop checklists para garantir o estado mais atual
    const sourceData = (checklists && checklists.length > 0) ? checklists : checklistsData;
    
    const found = sourceData.find(c => c.id === parseInt(id));
    
    if (found) {
      setChecklist(found);
      
      if (found.results || found.status === 'completed') {
          setIsCompleted(true);
          // Carrega respostas salvas se existirem
          if (found.results) {
            setAnswers(found.results.answers || {});
            setObservations(found.results.observations || {});
            // Calcula os stats para o relatório abrir instantaneamente
            calculateStats(found.results.answers, found.items.length);
          }
      }
    }
  }, [id, checklists]);

  // Função auxiliar para calcular estatísticas
  const calculateStats = (currentAnswers, total) => {
    const okCount = Object.values(currentAnswers || {}).filter(a => a === 'ok').length;
    const nokCount = Object.values(currentAnswers || {}).filter(a => a === 'nok').length;
    // Score baseado no total de itens
    const score = total > 0 ? Math.round((okCount / total) * 100) : 0;
    
    setReportStats({ ok: okCount, nok: nokCount, total: total, score: score });
  };

  if (!checklist) return <div className="checklistPageModern">Carregando...</div>;

  const chartData = {
    labels: ['Conforme', 'Não Conforme'],
    datasets: [{
        data: [reportStats.ok, reportStats.nok],
        backgroundColor: ['#22c55e', '#ef4444'],
        hoverBackgroundColor: ['#16a34a', '#dc2626'],
        borderWidth: 0,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: {family: 'Inter'} } },
      tooltip: { enabled: true }
    },
    cutout: '70%',
  };

  // --- HANDLERS ---
  const handleAnswer = (itemId, status) => {
    if (isCompleted) return; // Bloqueia edição
    setAnswers(prev => ({ ...prev, [itemId]: status }));
  };

  const handleObservation = (itemId, text) => {
    if (isCompleted) return; // Bloqueia edição
    setObservations(prev => ({ ...prev, [itemId]: text }));
  };

  // Abre o relatório (Finalizando ou apenas visualizando)
  const handleOpenReport = (isFinishing = false) => {
    const totalItems = checklist.items ? checklist.items.length : 0;
    
    // Calcula stats frescos baseados nas respostas atuais
    calculateStats(answers, totalItems);

    if (isFinishing) {
        // Se está finalizando agora, computa pontos
        const okCount = Object.values(answers).filter(a => a === 'ok').length;
        if (addPoints) addPoints(50 + (okCount * 5));
    }
    
    setShowReport(true);
  };

  const handlePrint = () => {
    window.print();
  };

  // Fecha relatório e salva/sai
  const handleCloseReport = () => {
    // Se não estava concluído, salva agora no estado global
    if (!isCompleted && updateChecklistStatus) {
        updateChecklistStatus(checklist.id, 'completed', {
            answers: answers,
            observations: observations,
            date: new Date().toISOString()
        });
    }
    
    setShowReport(false);
    navigate('/checklists'); 
  };

  return (
    <div className="checklistPageModern">
      <title>Safely | {isCompleted ? 'Relatório' : 'Preencher Checklist'}</title>

      <div className="pageHeaderModern" style={{
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          gap: '12px',
          marginBottom: '2.5rem'
      }}>
        
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px'}}>
            <h1 style={{fontSize: '1.8rem', lineHeight: '1.2', margin: 0}}>
                {checklist.title}
            </h1>
            {isCompleted && (
                <span className="statusBadgePill completed">Inspeção Concluída</span>
            )}
        </div>

        <button 
            onClick={() => navigate(-1)} 
            className="btnGhost" 
            style={{
                border:'none', 
                paddingLeft:0, 
                color: 'var(--text-secondary)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: '0.9rem'
            }}
        >
           <FaArrowLeft /> Voltar para lista
        </button>
      </div>

      <div className="checklistQuestions">
        {checklist.items && checklist.items.map((item, index) => (
          <div key={item.id} className="questionCard" style={{opacity: isCompleted ? 0.9 : 1}}>
            <div className="questionText">
              <span style={{color:'var(--primary-color)', marginRight:'10px'}}>#{index + 1}</span>
              {item.text}
            </div>

            <div className="actionButtons">
              <button 
                disabled={isCompleted}
                className={`btnCheckAction ok ${answers[item.id] === 'ok' ? 'active' : ''}`}
                onClick={() => handleAnswer(item.id, 'ok')}
                style={{cursor: isCompleted ? 'default' : 'pointer'}}
              >
                <FaCheck /> Conforme
              </button>
              <button 
                disabled={isCompleted}
                className={`btnCheckAction nok ${answers[item.id] === 'nok' ? 'active' : ''}`}
                onClick={() => handleAnswer(item.id, 'nok')}
                style={{cursor: isCompleted ? 'default' : 'pointer'}}
              >
                <FaTimes /> Não Conforme
              </button>
            </div>

            {(answers[item.id] === 'nok' || observations[item.id]) && (
              <div className="nokArea">
                <label>Evidência / Observação Técnica:</label>
                <textarea 
                  disabled={isCompleted}
                  placeholder="Descreva a falha técnica encontrada..."
                  value={observations[item.id] || ''}
                  onChange={(e) => handleObservation(item.id, e.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="submitButtonContainer">
        {isCompleted ? (
            <button className="btnSubmitHuge" onClick={() => handleOpenReport(false)} style={{background: 'var(--text-secondary)'}}>
               <FaClipboardList style={{marginRight: '8px'}}/> Visualizar Laudo Técnico
            </button>
        ) : (
            <button className="btnSubmitHuge" onClick={() => handleOpenReport(true)}>
               <FaLock style={{marginRight: '8px'}}/> Finalizar e Gerar Laudo
            </button>
        )}
      </div>

      {/* --- MODAL DE RELATÓRIO TÉCNICO --- */}
      {showReport && (
        <div className="modalBackdropGlass">
          <div className="modalCardGlass" style={{maxWidth: '700px'}}>
            
            <div className="modalHeaderModern">
              <h2>Laudo de Inspeção</h2>
              <button onClick={() => setShowReport(false)} className="btnCloseModal"><FaTimes /></button>
            </div>

            {/* Cabeçalho do Relatório */}
            <div className="reportHeaderInfo">
               <div>
                   <h3>{checklist.title}</h3>
                   <p>Data: {checklist.results?.date ? new Date(checklist.results.date).toLocaleDateString() : new Date().toLocaleDateString()}</p>
                   <p>Status: {isCompleted ? 'Finalizado' : 'Em Andamento'}</p>
               </div>
               <div className="reportScoreBig">
                   {reportStats.score}%
                   <span>Aprovação</span>
               </div>
            </div>

            {/* Grid Visual: Gráfico + KPIs */}
            <div className="reportVisualGrid">
                <div className="chartWrapper">
                    <Doughnut data={chartData} options={chartOptions} />
                    <div className="chartCenterText">
                        <strong>{reportStats.total}</strong>
                        <small>Itens</small>
                    </div>
                </div>
                
                <div className="kpiWrapper">
                    <div className="reportKpiItem">
                        <span className="kpiLabel">Inspecionados</span>
                        <span className="kpiVal">{reportStats.total}</span>
                    </div>
                    <div className="reportKpiItem" style={{color: '#22c55e'}}>
                        <span className="kpiLabel">Conformes</span>
                        <span className="kpiVal"><FaCheckCircle/> {reportStats.ok}</span>
                    </div>
                    <div className="reportKpiItem" style={{color: '#ef4444'}}>
                        <span className="kpiLabel">Pendentes</span>
                        <span className="kpiVal"><FaExclamationTriangle/> {reportStats.nok}</span>
                    </div>
                </div>
            </div>

            <hr style={{borderColor: 'var(--glass-border)', margin: '1.5rem 0'}}/>

            {/* Tabela de Pendências */}
            <h4 className="reportSectionTitle">Detalhamento de Não Conformidades</h4>
            
            {reportStats.nok > 0 ? (
              <div className="tableResponsive">
                  <table className="technicalTable">
                      <thead>
                          <tr>
                              <th>Item #</th>
                              <th>Descrição da Falha</th>
                              <th>Observação Técnica</th>
                              <th>Criticidade</th>
                          </tr>
                      </thead>
                      <tbody>
                         {checklist.items.filter(item => answers[item.id] === 'nok').map(item => (
                           <tr key={item.id}>
                              <td><strong>#{item.id}</strong></td>
                              <td>{item.text}</td>
                              <td>{observations[item.id] || "—"}</td>
                              <td><span className="badgeCritic">Alta</span></td>
                           </tr>
                         ))}
                      </tbody>
                  </table>
              </div>
            ) : (
              <div className="emptyStateCard" style={{padding: '1.5rem', borderColor: '#22c55e'}}>
                 <FaClipboardList size={24} style={{marginBottom: '10px', color: '#22c55e'}}/>
                 <p style={{color: '#22c55e'}}>Nenhuma anomalia detectada. Equipamento aprovado.</p>
              </div>
            )}

            {/* Ações do Modal */}
            <div className="modalActionsModern" style={{marginTop:'2rem'}}>
               <button onClick={handlePrint} className="btnNewChecklist" style={{background: 'var(--text-secondary)'}}>
                  <FaPrint /> Exportar PDF
               </button>
               
               {isCompleted ? (
                   <button onClick={() => setShowReport(false)} className="btnNewChecklist">
                      Fechar
                   </button>
               ) : (
                   <button onClick={handleCloseReport} className="btnNewChecklist">
                      Confirmar Finalização
                   </button>
               )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default ChecklistPage;