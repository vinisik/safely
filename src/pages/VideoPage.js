import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { videos } from '../data/mockData';
import { FaCheckCircle, FaPlayCircle, FaArrowLeft } from 'react-icons/fa';
import './Pages.css';

function VideoPage({ markVideoAsCompleted, completedVideoIds }) {
  const { id } = useParams();
  const videoId = parseInt(id);
  const video = videos.find(v => v.id === videoId);

  if (!video) return <div className="checklistPageModern">Vídeo não encontrado.</div>;

  const isCompleted = completedVideoIds.has(videoId);

  const handleCompleteVideo = () => {
    markVideoAsCompleted(videoId); 
  }

  return (
    <div className="checklistPageModern">
      <title>Safely | {video.title}</title>
      
      {/* Botão de voltar sutil */}
      <Link to="/videos" style={{display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1rem', color: '#666', textDecoration: 'none', fontWeight: '500'}}>
        <FaArrowLeft /> Voltar aos vídeos
      </Link>

      {/* Header Estilo Card Gradiente */}
      <div className="checklistHeaderCard">
        <h1>{video.title}</h1>
        <div className="headerMetaGrid">
          <div className="metaItem"><FaPlayCircle /> Vídeo Treinamento</div>
          {isCompleted && <div className="metaItem" style={{background: 'rgba(255,255,255,0.3)'}}><FaCheckCircle /> Concluído</div>}
        </div>
      </div>

      {/* Player com Moldura de Vidro */}
      <div className="videoWrapperGlass">
        <video className="videoPlayerModern" controls poster={video.thumbnail}>
          <source src={video.videoUrl} type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
      </div>
      
      {/* Descrição em Card Branco */}
      <div className="videoDescriptionCard">
        <h3>Sobre este treinamento</h3>
        <p>{video.description}</p>
      </div>
      
      {/* Área de Ação */}
      <div className="submitButtonContainer">
        {isCompleted ? (
          <div className="successCard" style={{margin: '0 auto', padding: '2rem'}}>
            <h2 style={{color: '#2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
              <FaCheckCircle /> Treinamento concluído!
            </h2>
            {video.relatedQuizId && (
              <Link to={`/quizzes/${video.relatedQuizId}`} className="btnNewChecklist" style={{display: 'inline-flex', marginTop: '1rem'}}>
                Ir para o Quiz Relacionado
              </Link>
            )}
          </div>
        ) : (
          <button className="btnSubmitHuge" onClick={handleCompleteVideo}>
            Marcar como Concluído (+75 Pontos)
          </button>
        )}
      </div>

    </div>
  );
}

export default VideoPage;