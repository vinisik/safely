import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { videos, quizzes, allSecurityAlerts } from '../data/mockData'; 
import { FaClock, FaBrain, FaClipboardList, FaCalendarAlt, FaMedal, FaChalkboardTeacher, FaChevronUp, FaChevronDown, FaBell, FaPlayCircle } from 'react-icons/fa'; 
import useIsMobile from '../hooks/useIsMobile';

// Importa o CSS Unificado
import './Pages.css';

function Dashboard({user, checklists, totalPoints, 
    completedVideosCount, totalVideosCount, 
    completedQuizzesCount, totalQuizzesCount, currentRankName}) {
  
  const [isSummaryDropdownOpen, setIsSummaryDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Filtros
  const pendingChecklists = checklists.filter(c => c.status === 'pending');
  const pendingCount = pendingChecklists.length;
  const completedChecklistsCount = checklists.filter(c => c.status === 'completed').length;
  const totalChecklistsCount = checklists.length; 

  // Porcentagem (opcional, se quiser usar uma barra de progresso depois)
  const completionPercentage = totalChecklistsCount > 0 
    ? Math.round((completedChecklistsCount / totalChecklistsCount) * 100) 
    : 0;

  // Alertas Aleatórios
  const [currentAlerts, setCurrentAlerts] = useState([]);
  useEffect(() => {
    const shuffledAlerts = [...allSecurityAlerts].sort(() => 0.5 - Math.random());
    const selectedAlerts = shuffledAlerts.slice(0, 3); // Mostra 3 alertas
    setCurrentAlerts(selectedAlerts);
  }, []);

  // Dados Mockados
  const daysWithoutAccidents = 127;
  
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) return "Bom dia";
    else if (currentHour >= 12 && currentHour < 18) return "Boa tarde";
    else return "Boa noite";
  };

  const greeting = getCurrentGreeting();

  return (
    <div className="checklistPageModern">
      <title>Safely | Início</title> 
      
      {/* Banner de Boas-vindas */}
      <div className="welcomeBannerGlass">
        <h1>{greeting}, {user.name}!</h1>
        <p>Aqui está o resumo da sua segurança hoje. Mantenha o foco e continue seguro.</p>
      </div>

      {/* Controle Mobile (Dropdown) */}
      {isMobile && (
        <>
          <button 
            className="mobileSummaryToggle" 
            onClick={() => setIsSummaryDropdownOpen(!isSummaryDropdownOpen)}
          >
            <span>Ver Resumo de Dados</span>
            {isSummaryDropdownOpen ? <FaChevronUp /> : <FaChevronDown />} 
          </button>

          {isSummaryDropdownOpen && (
            <div className="summaryGridModern" style={{marginBottom: '2rem'}}>
               {/* Réplica dos cards para mobile dentro do dropdown se necessário, 
                   ou apenas deixe o grid fluir normalmente no mobile.
                   Aqui optei por mostrar o grid normal abaixo quando aberto. */}
            </div>
          )}
        </>
      )}

      {/* Grid de Resumo (Cards Glass) - Esconde no mobile se dropdown fechado */}
      {(!isMobile || isSummaryDropdownOpen) && (
        <div className="summaryGridModern">
          {/* Dias sem Acidentes */}
          <div className="summaryCardGlass">
            <div className="summaryContent">
              <h3>{daysWithoutAccidents}</h3>
              <span>Dias Sem Acidentes</span>
            </div>
            <div className="summaryIconBox" style={{background: '#e0f2f1', color: '#00695c'}}>
              <FaCalendarAlt />
            </div>
          </div>

          {/* Checklists */}
          <div className="summaryCardGlass">
            <div className="summaryContent">
              <h3>{completedChecklistsCount}/{totalChecklistsCount}</h3>
              <span>Checklists</span>
            </div>
            <div className="summaryIconBox iconTotal">
               <FaClipboardList />
            </div>
          </div>

          {/* Treinamentos */}
          <div className="summaryCardGlass">
            <div className="summaryContent">
              <h3>{completedVideosCount}</h3>
              <span>Vídeos Vistos</span>
            </div>
            <div className="summaryIconBox iconPending">
              <FaChalkboardTeacher />
            </div>
          </div>

          {/* Quizzes */}
          <div className="summaryCardGlass">
            <div className="summaryContent">
              <h3>{completedQuizzesCount}</h3>
              <span>Quizzes</span>
            </div>
            <div className="summaryIconBox iconCompleted">
               <FaBrain />
            </div>
          </div>

           {/* Pontos */}
           <div className="summaryCardGlass">
            <div className="summaryContent">
              <h3>{totalPoints}</h3>
              <span>{currentRankName}</span>
            </div>
            <div className="summaryIconBox" style={{background: '#fff8e1', color: '#ff8f00'}}>
               <FaMedal />
            </div>
          </div>
        </div>
      )}

      {/* Grid Principal Assimétrico */}
      <div className="dashboardGridModern">
        
        {/* Coluna Principal (Esquerda) */}
        <div className="mainColumn">
          
          {/* Seção: Checklists Pendentes */}
          <div className="dashboardSectionGlass">
            <div className="sectionHeader">
              <h2>
                Checklists Pendentes
                {pendingCount > 0 && <span className="counterBadge">{pendingCount}</span>}
              </h2>
              <Link to="/checklists" className="linkViewAll">Ver Todos</Link>
            </div>

            {pendingCount === 0 ? (
              <div className="emptyStateCard">
                <h3>Tudo Limpo!</h3>
                <p>Você não tem checklists pendentes no momento.</p>
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {pendingChecklists.slice(0, 3).map(item => (
                  <Link to={`/checklists/${item.id}`} key={item.id} className="compactListItem">
                    <div className="compactIconBox"> 
                      <FaClipboardList /> 
                    </div>
                    <div className="compactContent">
                      <h3>{item.title}</h3>
                      <div className="compactMeta">
                        <FaClock size={10} /> Vence em: {item.dueDate}
                      </div>
                    </div>
                    <div className={`statusBadgePill pending`}>Pendente</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Seção: Treinamentos (Videos) */}
          <div className="dashboardSectionGlass">
            <div className="sectionHeader">
              <h2>Continuar Assistindo</h2>
              <Link to="/videos" className="linkViewAll">Galeria de Vídeos</Link>
            </div>
            
            {/* Grid de Vídeos Inline */}
            <div className="mediaGridModern" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', paddingBottom: 0}}>
              {videos.slice(0, 3).map(video => (
                <Link to={`/videos/${video.id}`} key={video.id} className="mediaCardGlass" style={{marginBottom: 0}}>
                   <div className="mediaThumbnailContainer" style={{height: '140px'}}>
                      <img src={video.thumbnail} alt={video.title} className="mediaThumbnail" />
                      <div className="mediaOverlayIcon"><FaPlayCircle /></div>
                   </div>
                   <div className="mediaContent" style={{padding: '1rem'}}>
                      <h3 style={{fontSize: '0.95rem'}}>{video.title}</h3>
                      <div className="mediaMeta">
                        <FaClock /> {video.dueDate || '15 min'}
                      </div>
                   </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
        
        {/* Coluna Lateral (Direita) */}
        <div className="sidebarColumn">
          
          {/* Alertas */}
          <div className="dashboardSectionGlass">
            <div className="sectionHeader">
               <h2><FaBell style={{marginRight: '8px', color: '#ef5350'}}/> Avisos</h2>
            </div>
            <div>
              {currentAlerts.map(alert => (
                <div key={alert.id} className={`alertCardGlass priority-${alert.priority}`}>
                  <h3>{alert.title}</h3>
                  <p>{alert.message}</p>
                  <span className="alertTime">{alert.timeAgo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quizzes Recomendados */}
          <div className="dashboardSectionGlass">
             <div className="sectionHeader">
               <h2>Quizzes</h2>
               <Link to="/quizzes" className="linkViewAll">Ver</Link>
             </div>
             <div>
              {quizzes.slice(0, 3).map(quiz => (
                <Link to={`/quizzes/${quiz.id}`} key={quiz.id} className="compactListItem">
                  <div className="compactIconBox quizIcon"> 
                    <FaBrain /> 
                  </div>
                  <div className="compactContent">
                    <h3>{quiz.title}</h3>
                    <div className="compactMeta">
                      <FaMedal size={10} /> +10 pts
                    </div>
                  </div>
                </Link>
              ))}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;