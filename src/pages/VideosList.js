import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { videos } from '../data/mockData';
import { FaSearch, FaClock, FaCheckCircle, FaPlay, FaFilm } from 'react-icons/fa';
import './Pages.css'; 

// Simula uma lista maior
const allVideos = [...videos];

function VideosList({ completedVideosCount, totalVideosCount }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const pendingVideosCount = totalVideosCount - completedVideosCount;

  // Filtros (opcional: implementar lógica real se os dados tiverem status)
  const filteredVideos = allVideos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="checklistPageModern">
      <title>Safely | Treinamento</title>
      
      {/* Header Moderno */}
      <div className="pageHeaderModern">
        <h1>Treinamentos em Vídeo</h1>
      </div>
      
      {/* Cards de Resumo Glass */}
      <div className="summaryGridModern">
        <div className="summaryCardGlass">
          <div className="summaryContent">
            <h3>{totalVideosCount}</h3>
            <span>Disponíveis</span>
          </div>
          <div className="summaryIconBox iconTotal">
            <FaFilm />
          </div>
        </div>

        <div className="summaryCardGlass">
          <div className="summaryContent">
            <h3>{pendingVideosCount}</h3>
            <span>Pendentes</span>
          </div>
          <div className="summaryIconBox iconPending">
            <FaClock />
          </div>
        </div>

        <div className="summaryCardGlass">
          <div className="summaryContent">
            <h3>{completedVideosCount}</h3>
            <span>Concluídos</span>
          </div>
          <div className="summaryIconBox iconCompleted">
              <FaCheckCircle />
          </div>
        </div>
      </div>

      {/* Controles de Busca e Filtro */}
      <div className="controlsContainer">
        <div className="searchBarGlass">
          <FaSearch className="searchIconModern" /> 
          <input 
            type="text" 
            placeholder="Buscar treinamento..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filterPills">
          <button 
            className={`filterBtnPill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filterBtnPill ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pendentes
          </button>
          <button 
            className={`filterBtnPill ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Concluídos
          </button>
        </div>
      </div>

      {/* Grid de Vídeos Moderno */}
      <div className="mediaGridModern">
        {filteredVideos.map((video, index) => (
          <Link 
            key={`${video.id}-${index}`}
            to={`/videos/${video.id}`}
            className="mediaCardGlass"
          >
            <div className="mediaThumbnailContainer">
              <img src={video.thumbnail} alt={video.title} className="mediaThumbnail" />
              <div className="mediaOverlayIcon">
                <FaPlay />
              </div>
            </div>
            
            <div className="mediaContent">
              <h3>{video.title}</h3>
              <div className="mediaMeta">
                <FaClock /> <span>{video.dueDate || '30 min'}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VideosList;