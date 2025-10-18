import React from 'react';
import ContentCard from '../components/ContentCard';
import { videos } from '../data/mockData';

// Simula uma lista maior para o placeholder
const allVideos = [...videos, ...videos, ...videos];

function VideosList() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Treinamentos em Vídeo</h1>
        <input type="text" placeholder="🔍 Buscar treinamento..." className="search-bar" />
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