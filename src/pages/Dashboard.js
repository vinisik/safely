import React from 'react';
import ContentCard from '../components/ContentCard';
import { videos, quizzes } from '../data/mockData';
import { Link } from 'react-router-dom';

function Dashboard({checklists}) {

  // Filtra a lista para pegar apenas os checklists pendentes
  const pendingChecklists = checklists.filter(c => c.status === 'pending');
  // Pega a quantidade de itens na lista filtrada
  const pendingCount = pendingChecklists.length;

  return (
    <>
    <title>Safely | Início</title>
      <div className="hero-banner">
        <h1>Michelin - Itatiaia <br></br>Operador de Produção </h1>
      </div>

      <div className="dashboard-section">
        <h2>Continuar Assistindo</h2>
        <div className="card-grid">
          {videos.slice(0, 3).map(video => (
            <ContentCard
              key={video.id}
              to={`/videos/${video.id}`}
              thumbnail={video.thumbnail}
              title={video.title}
              description={`Vence em: ${video.dueDate}`}
              progress={Math.floor(Math.random() * 100)}
            />
          ))}
        </div>
      </div>
      
      <div className="dashboard-row">
        <div className="main-column">
          <div className="dashboard-section">
            <h2>Próximos Quizzes</h2>
            <div className="card-grid">
              {quizzes.slice(0, 3).map(quiz => (
                <ContentCard
                  key={quiz.id}
                  to={`/quiz/${quiz.id}`}
                  title={quiz.title}
                  description={`Vence em: ${quiz.dueDate}`}
                  buttonText="Iniciar Quiz"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-column">
          <div className="dashboard-section">
            <div className="section-title-with-counter">
              <h2>Checklists Pendentes</h2>
              {pendingCount > 0 && <span className="pending-counter">{pendingCount}</span>}
            </div>
            <div className="list-container">
              {pendingChecklists.slice(0, 10).map(item => ( 
                <Link to={`/checklists/${item.id}`} key={item.id} className="list-item-link">
                  <div className="list-item">
                    <div className="list-item-content">
                      <h3>{item.title}</h3>
                      <p>Vence em: {item.dueDate}</p>
                    </div>
                    <span className={`status-badge ${item.status}`}>
                      {item.status === 'pending' ? '!' : 'Concluído'}
                    </span>
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