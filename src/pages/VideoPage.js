import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { videos } from '../data/mockData';
import { FaCheckCircle } from 'react-icons/fa';

function VideoPage({ markVideoAsCompleted, completedVideoIds }) {
  const { id } = useParams();
  const videoId = parseInt(id); // Converte o ID para número
  const video = videos.find(v => v.id === videoId);

  if (!video) {
    return <div>Vídeo não encontrado.</div>;
  }

  // Verifica se este vídeo já foi concluído
  const isCompleted = completedVideoIds.has(videoId);

  const handleCompleteVideo = () => {
    // Chama a função do App.js para marcar como concluído e dar os pontos
    markVideoAsCompleted(videoId); 
  }

  return (
    <div className="page-container video-page">
    <title>Safely | {video.title}</title>
      <h2>{video.title}</h2>
      <video className="video-player" controls poster={video.thumbnail}>
        <source src={video.videoUrl} type="video/mp4" />
        Seu navegador não suporta a tag de vídeo.
      </video>
      <p>{video.description}</p>
      
      <div className="video-actions">
        {isCompleted ? (
          // Se o vídeo já foi concluído, mostra a mensagem de sucesso
          <div className="completion-message">
            <p><FaCheckCircle/> Treinamento concluído!</p>
            {video.relatedQuizId && (
              <Link to={`/quizzes/${video.relatedQuizId}`} className="btn btn-secondary">
                Ir para o Quiz Relacionado
              </Link>
            )}
          </div>
        ) : (
          // Se ainda não foi concluído, mostra o botão
          <button className="btn btn-primary" onClick={handleCompleteVideo}>
            Marcar como Concluído (+75 Pontos)
          </button>
        )}
      </div>

    </div>
  );
}

export default VideoPage;