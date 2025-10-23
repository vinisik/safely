import React from 'react';
import ContentCard from '../components/ContentCard';
import { videos, quizzes, securityAlerts } from '../data/mockData'; // Certifique-se que 'videos' está aqui se precisar
import { Link } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';

function Dashboard({checklists}) {

  // Filtra a lista para pegar apenas os checklists pendentes
  const pendingChecklists = checklists.filter(c => c.status === 'pending');
  // Pega a quantidade de itens na lista filtrada
  const pendingCount = pendingChecklists.length;

  return (
    <>
      <title>Safely | Início</title> {/* Usando Helmet corretamente */}
      
      <div className="hero-banner">
        <h2>Operador de Produção <br></br>Michelin - Itatiaia </h2>
      </div>

      {/* Linha 1: Checklists e Quizzes */}
      <div className="dashboard-row">
        <div className="main-column">
          <div className="dashboard-section">
            <div className="section-title-with-counter">
              {/* Agrupa Título e Contador */}
              <div className="title-and-counter">
                <h2>Checklists Pendentes</h2>
                <span className={`pending-counter ${pendingCount === 0 ? 'zero' : ''}`}>{pendingCount}</span>
              </div>
              {/* Botão Ver Todos (condicional) */}
              {pendingCount > 0 && (
                <Link to="/checklists" className="view-all-link">Ver Todos</Link>
              )}
            </div>

            {pendingCount === 0 ? (
              // Se não houver checklists pendentes, mostra este card:
              <div className="all-completed-card card">
                <h3>Parabéns! 🎉</h3>
                <p>Você não possui nenhum checklist pendente.</p>
              </div>
            ) : (
              // Caso contrário, mostra a lista de pendentes:
              <div className="list-container">
                {pendingChecklists.slice(0, 3).map(item => (
                  <Link to={`/checklists/${item.id}`} key={item.id} className="list-item-link">
                    <div className="list-item">
                      <div className="list-item-content">
                        <h3>{item.title}</h3>
                        <p className="due-date-text">
                          <FaClock className="due-date-icon" /> {item.dueDate}
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
                <div key={alert.id} className={`alert-card card priority-${alert.priority}`}>
                  <h3>{alert.title}</h3>
                  <p>{alert.message}</p>
                  <span className="alert-time">{alert.timeAgo}</span>
                </div>
              ))}
              {/* Você pode adicionar um link "Ver todos os alertas" aqui se quiser uma página de alertas */}
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
                  title={video.title}
                  description={<p className="due-date-text">
                          <FaClock className="due-date-icon" /> {video.dueDate}
                        </p>}
                  progress={Math.floor(Math.random() * 100)}
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
              <Link to="/videos" className="view-all-link">Ver Todos</Link>
            </div>
            <div className="list-container">
              {quizzes.slice(0, 3).map(quiz => (
                // 2. Cada item agora é um Link envolvendo um list-item
                <Link to={`/quizzes/${quiz.id}`} key={quiz.id} className="list-item-link">
                  <div className="list-item quiz-item"> {/* Adicionamos classe 'quiz-item' */}
                    <div className="list-item-content">
                      <h3>{quiz.title}</h3>
                      <p className="due-date-text">
                          <FaClock className="due-date-icon" /> {quiz.dueDate}
                        </p>
                    </div>
                    {/* 3. Botão "Iniciar Quiz" estilizado como link */}
                    <span className="list-item-action">Iniciar Quiz</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Removi a coluna duplicada de Quizzes aqui, ajuste se necessário */}
        {/* <div className="sidebar-column"> ... </div> */}
      </div>

      {/* Seção extra que você tinha (pode remover se não precisar) */}
      <div className='dashboard-section'>
        <div className='new-section' style={{padding: '1rem', textAlign: 'center'}}>
          <p>Nova seção em breve!</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;