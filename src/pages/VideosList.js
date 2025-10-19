import React from 'react';
import ContentCard from '../components/ContentCard';
import { videos } from '../data/mockData';
import { FaSearch } from 'react-icons/fa';

// Simula uma lista maior para o placeholder
const allVideos = [...videos];

function VideosList() {
  return (
    <div className="page-container">
      <title>Safely | Treinamento</title>
      <div className="page-header">
        <h1>Treinamentos em Vídeo</h1>
        
        <div className="search-bar-container">
          <FaSearch className="search-icon" /> 
          <input 
            type="text" 
            placeholder="Buscar treinamento..." 
            className="search-bar" 
          />
        </div>
      </div>
      <div className="card-grid">
        {allVideos.map((video, index) => (
          <ContentCard
            key={`${video.id}-${index}`}
            to={`/videos/${video.id}`}
            thumbnail={video.thumbnail}
            title={video.title}
            description={`Vence em: ${video.dueDate}`}
            progress={50}
          />
        ))}
      </div>
    </div>
  );
}

export default VideosList;