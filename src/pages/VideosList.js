import React from 'react';
import ContentCard from '../components/ContentCard';
import { videos } from '../data/mockData';
import { FaSearch, FaClock } from 'react-icons/fa';

// Simula uma lista maior para o placeholder
const allVideos = [...videos];

function VideosList() {
  return (
    <div className="page-container">
      <title>Safely | Treinamento</title>
      <div className="page-header">
        <h1>Treinamentos em Vídeo</h1>
        
      </div>
      <div className='page-container' >
        <div className="search-bar-container">
          <FaSearch className="search-icon" /> 
          <input 
            type="text" 
            placeholder="Buscar treinamento..." 
            className="search-bar" 
          />
        </div>
        <div className="filter-buttons" style={{marginBottom: '20px'}}>
          <button className="filter-btn active">Todos</button>
          <button className="filter-btn">Pendentes</button>
          <button className="filter-btn">Concluídos</button>
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