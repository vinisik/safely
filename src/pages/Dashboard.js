import React from 'react';
import ContentCard from '../components/ContentCard';
import { videos, quizzes, checklists } from '../data/mockData';

function Dashboard() {
  return (
    <>
      <div className="hero-banner">
        <h2>FIQUE SEGURO, FIQUE ATUALIZADO.</h2>
        <img src="https://placehold.co/300x200/007bff/white?text=Banner+Segurança" alt="Banner de Segurança" />
      </div>

      <div className="dashboard-section">
        <h2>Continuar Assistindo</h2>
        <div className="card-grid">
          {videos.slice(0, 3).map(video => (
            <ContentCard
              key={video.id}
              to={`/video/${video.id}`}
              thumbnail={video.thumbnail}
              title={video.title}
              description="Vence: 15/10"
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
              {quizzes.slice(0, 3).map(quiz => ( // Mostrando 3 quizzes 
                <ContentCard
                  key={quiz.id}
                  to={`/quiz/${quiz.id}`}
                  thumbnail={`https://placehold.co/600x400/4CAF50/white?text=Quiz`}
                  title={quiz.title}
                  description="Vence: 15/10"
                  buttonText="Iniciar Quiz"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Coluna dos Checklists  */}
        <div className="sidebar-column">
          <div className="dashboard-section">
            <h2>Checklists Pendentes</h2>
            <div className="list-container">
              {checklists.filter(c => c.status === 'pending').slice(0, 3).map(item => ( // Mostrando 2 checklists
                <div key={item.id} className="list-item">
                  <div className="list-item-content">
                    <h3>{item.title}</h3>
                    <p>Status: {item.status === 'pending' ? 'Pendente' : 'Concluído'}</p>
                  </div>
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </div>
                
              ))}
            </div>
          </div>
        </div>
        
      </div> {/*.dashboard-row */}
    </>
  );
}

export default Dashboard;