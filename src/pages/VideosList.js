import React from 'react';
import ContentCard from '../components/ContentCard';
import { videos } from '../data/mockData';

// 1. Importe o ícone de pesquisa (Search) do Font Awesome (Fa)
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
            to={`/video/${video.id}`}
            thumbnail={video.thumbnail}
            title={video.title}
            progress={Math.floor(Math.random() * 100)}
          />
        ))}
      </div>
    </div>
  );
}

export default VideosList;