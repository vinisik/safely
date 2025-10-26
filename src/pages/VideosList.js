import React from 'react';
import ContentCard from '../components/ContentCard';
import { videos } from '../data/mockData';
import { FaSearch, FaClock, FaCheckCircle, FaPlay } from 'react-icons/fa';

// Simula uma lista maior para o placeholder
const allVideos = [...videos];

function VideosList({ completedVideosCount, totalVideosCount }) {
  const pendingVideosCount = totalVideosCount - completedVideosCount
  return (
    <div className="page-container">
      <title>Safely | Treinamento</title>
      <div className="page-header">
        <h1>Treinamentos em Vídeo</h1>
      </div>
      <div className='page-container' >
        <div className="summary-cards-grid checklist-summary-grid"> {/* Adiciona classe específica */}
                  {/* Card Total */}
                  <div className="summary-card">
                    <div className="summary-content">
                      <span className="summary-value">{totalVideosCount}</span>
                      <span className="summary-label">Total Disponível</span>
                    </div>
                    <div className="summary-icon icon-total"> {/* Classe específica para cor */}
                      <FaPlay size={20}/>
                    </div>
                  </div>
                  {/* Card Pendentes */}
                  <div className="summary-card">
                    <div className="summary-content">
                      <span className="summary-value">{pendingVideosCount}</span>
                      <span className="summary-label">Treinamentos Pendentes</span>
                    </div>
                    <div className="summary-icon icon-pending"> {/* Classe específica para cor */}
                      <FaClock size={20}/>
                    </div>
                  </div>
                  {/* Card Concluídos */}
                  <div className="summary-card">
                    <div className="summary-content">
                      <span className="summary-value">{completedVideosCount}</span>
                      <span className="summary-label">Concluídos</span>
                    </div>
                    <div className="summary-icon icon-completed"> {/* Classe específica para cor */}
                       <FaCheckCircle size={20}/>
                    </div>
                  </div>
                </div>
        <div className="search-bar-container">
          <FaSearch className="search-icon" /> 
          <input 
            type="text" 
            placeholder="Buscar treinamento..." 
            className="search-bar" 
          />
        </div>
        <div className="filter-buttons" style={{marginBottom: '20px'}}>
          <button className="filter-btn active">Todos ({totalVideosCount})</button>
          <button className="filter-btn">Pendentes ({pendingVideosCount})</button>
          <button className="filter-btn">Concluídos ({completedVideosCount})</button>
        </div>
        <div className="card-grid">
          {allVideos.map((video, index) => (
            <ContentCard
              key={`${video.id}-${index}`}
              to={`/videos/${video.id}`}
              thumbnail={video.thumbnail}
              title={video.title}
              description={<p><FaClock/> {video.dueDate}</p>}
              progress={50}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideosList;