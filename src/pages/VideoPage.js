import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { videos } from '../data/mockData';

function VideoPage() {
  const { id } = useParams();
  const video = videos.find(v => v.id === parseInt(id));

  if (!video) {
    return <div>Vídeo não encontrado.</div>;
  }

  return (
    <div className="video-page">
      <h2>{video.title}</h2>
      <video className="video-player" controls>
        <source src={video.videoUrl} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
      <p>{video.description}</p>
      
      {video.relatedQuizId && (
        <Link to={`/quiz/${video.relatedQuizId}`} className="btn">
          Responder ao Quiz
        </Link>
      )}
    </div>
  );
}

export default VideoPage;