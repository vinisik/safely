import React from 'react';
import ContentCard from '../components/ContentCard';
import { videos, quizzes } from '../data/mockData';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import bannerSegurancaImg from '../assets/banner-seguranca.jpg';

function Dashboard({checklists}) {
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
              to={`/video/${video.id}`}
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
            <h2>Checklists Pendentes</h2>
            <div className="list-container">
              {checklists.filter(c => c.status === 'pending').slice(0, 2).map(item => (
                <Link to={`/checklist/${item.id}`} key={item.id} className="list-item-link">
                  <div className="list-item">
                    <div className="list-item-content">
                      <h3>{item.title}</h3>
                      <p>Status: {item.status === 'pending' ? 'Pendente' : 'Concluído'}</p>
                    </div>
                    <span className={`status-badge ${item.status}`}>
                      {item.status}
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