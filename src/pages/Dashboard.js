import React from 'react';
import ContentCard from '../components/ContentCard';
import { videos, quizzes, securityAlerts } from '../data/mockData'; 
import { Link } from 'react-router-dom';
import { FaClock, FaBrain, FaClipboard, FaCalendarAlt, FaCheckSquare, FaMedal, FaChalkboardTeacher } from 'react-icons/fa'; 
function Dashboard({user, checklists, totalPoints}) {

  // Filtra a lista para pegar apenas os checklists pendentes
  const pendingChecklists = checklists.filter(c => c.status === 'pending');
  // Pega a quantidade de itens na lista filtrada
  const pendingCount = pendingChecklists.length;
  // Calcula o número de checklists concluídos
  const completedChecklistsCount = checklists.filter(c => c.status === 'completed').length;
  const totalChecklistsCount = checklists.length; // Ou use um valor fixo se preferir

  // Cálculo de porcentagem de checklists completas
  const completionPercentage = totalChecklistsCount > 0 
    ? Math.round((completedChecklistsCount / totalChecklistsCount) * 100) 
    : 0;

  // Placeholder para Dias sem Acidentes
  const daysWithoutAccidents = 127;
  const completedTraining = 0;

  // Saudação dinâmica
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Bom dia";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  };

   const greeting = getCurrentGreeting();

  return (
    <>
      <title>Safely | Início</title> 
      
      {/* <div className="hero-banner">
        <h2>Operador de Produção <br></br>Michelin - Itatiaia </h2>
      </div> */}
      <div className="welcome-section">
        <h1>{greeting}, {user.name}!</h1>
      </div>

      <div className="summary-cards-grid">
        {/* Card: Dias sem Acidentes */}
        <div className="summary-card">
          <div className="summary-content">
            <span className="summary-label">Dias sem Acidentes</span>
            <span className="summary-value">{daysWithoutAccidents}</span>
            <span className="summary-subtext">+5 dias</span> {/* Texto extra */}
          </div>
          <div className="summary-icon icon-calendar">
            <FaCalendarAlt size={20}/>
          </div>
        </div>

        {/* Card: Checklists Completos */}
        <div className="summary-card">
          <div className="summary-content">
            <span className="summary-label">Checklists Completos</span>
            <span className="summary-value">{completedChecklistsCount}/{totalChecklistsCount}</span>
            <span className="summary-subtext">{completionPercentage}% concluído</span>
          </div>
          <div className="summary-icon icon-check">
             <FaCheckSquare size={20}/>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-content">
            <span className="summary-label">Treinamentos Completos</span>
            <span className="summary-value">{completedTraining}</span>
            <span className="summary-subtext">4 disponíveis</span> {/* Texto extra */}
          </div>
          <div className="summary-icon icon-chalkboard">
            <FaChalkboardTeacher size={20}/>
          </div>
        </div>

        {/* Card: Pontos de Segurança */}
        <div className="summary-card">
          <div className="summary-content">
            <span className="summary-label">Pontos</span>
            <span className="summary-value">{totalPoints}</span>
          </div>
          <div className="summary-icon icon-medal">
             <FaMedal size={20}/>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="main-column">
          <div className="dashboard-section">
            <div className="section-title-with-counter">
              <div className="title-and-counter">
                <h2>Checklists Pendentes</h2>
                <span className={`pending-counter ${pendingCount === 0 ? 'zero' : ''}`}>{pendingCount}</span>
              </div>
              {pendingCount > 0 && (
                <Link to="/checklists" className="view-all-link">Ver Todos</Link>
              )}
            </div>

            {pendingCount === 0 ? (
              <div className="all-completed-card card">
                <h3>Parabéns! 🎉</h3>
                <p>Você não possui nenhum checklist pendente.</p>
              </div>
            ) : (
              <div className="list-container">
                {pendingChecklists.slice(0, 3).map(item => (
                  <Link to={`/checklists/${item.id}`} key={item.id} className="list-item-link">
                    <div className="list-item checklist-item-with-icon"> 
                      <FaClipboard className="item-prefix-icon" /> 
                      <div className="list-item-content">
                        <h3>{item.title}</h3>
                        <p className="due-date-text">
                          <FaClock className="due-date-icon" />{item.dueDate}
                        </p>
                      </div>
                      <span className={`status-badge ${item.status}`}>
                      {item.status === 'pending' ? '!' : 'Concluído'}
                    </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="sidebar-column">
          <div className="dashboard-section">
            <h2>Alertas de Segurança</h2>
            <div className="alerts-container">
              {securityAlerts.slice(0, 2).map(alert => ( // Mostra apenas o primeiro alerta
                <div key={alert.id} className={`alert-card priority-${alert.priority}`}>
                  <h3>{alert.title}</h3>
                  <p>{alert.message}</p>
                  <span className="alert-time">{alert.timeAgo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="main-column">
          <div className="dashboard-section">
            <div className="section-title-with-counter"> 
              <div className="title-and-counter"> 
                <h2>Assistir</h2>
              </div>
              <Link to="/videos" className="view-all-link">Ver Todos</Link>
            </div>
            <div className="card-grid">
              {videos.slice(0, 3).map(video => (
                <ContentCard
                  key={video.id}
                  to={`/videos/${video.id}`}
                  thumbnail={video.thumbnail}
                  progress={Math.floor(Math.random() * 100)}
                  title={video.title}
                  description={<p className="due-date-text">
                          <FaClock className="due-date-icon" /> {video.dueDate}
                        </p>}
                  
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-column">
          <div className="dashboard-section">
            <div className="section-title-with-counter">
              <div className="title-and-counter">
                <h2>Quizzes Recomendados</h2>
              </div>
              <Link to="/quizzes" className="view-all-link">Ver Todos</Link>
            </div>
            <div className="list-container">
              {quizzes.slice(0, 3).map(quiz => (
                <Link to={`/quizzes/${quiz.id}`} key={quiz.id} className="list-item-link">
                  {/* --- ALTERAÇÃO APLICADA AQUI: Ícone FaClipboard --- */}
                  <div className="list-item quiz-item quiz-item-with-icon"> {/* Adiciona nova classe para estilo */}
                    <FaBrain className="item-prefix-icon quiz-prefix-icon" /> {/* Usa FaClipboard */}
                    <div className="list-item-content">
                      <h3>{quiz.title}</h3>
                      <p className="due-date-text">
                        <FaClock className="due-date-icon" /> {quiz.dueDate}
                      </p>
                    </div>
                    <span className="list-item-action">Iniciar Quiz</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>

    </>
  );
}

export default Dashboard;