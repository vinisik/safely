import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { videos, quizzes, allSecurityAlerts } from '../data/mockData'; 
import { FaClock, FaBrain, FaClipboardList, FaCalendarAlt, FaMedal, FaChalkboardTeacher, FaChevronUp, FaChevronDown, FaBell, FaPlayCircle, FaQrcode, FaBullhorn } from 'react-icons/fa'; 
import useIsMobile from '../hooks/useIsMobile';
import QRScannerModal from '../components/QRScannerModal'; 
import './Pages.css';

function Dashboard({user, checklists, totalPoints, 
    completedVideosCount, totalVideosCount, 
    completedQuizzesCount, totalQuizzesCount, currentRankName}) {
  
  const [isSummaryDropdownOpen, setIsSummaryDropdownOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Filtros de Checklist
  const pendingChecklists = checklists.filter(c => c.status === 'pending');
  const pendingCount = pendingChecklists.length;
  const completedChecklistsCount = checklists.filter(c => c.status === 'completed').length;
  const totalChecklistsCount = checklists.length; 

  // Alertas Aleatórios
  const [currentAlerts, setCurrentAlerts] = useState([]);
  
  // Feed de Segurança Simulado
  const feedItems = [
    { id: 1, user: 'Carlos Silva', action: 'conquistou', detail: 'Mestre da Segurança', time: '2h atrás', icon: '🏆' },
    { id: 2, user: 'Gestão EHS', action: 'alerta:', detail: 'Uso obrigatório de óculos', time: '4h atrás', icon: '📢' },
    { id: 3, user: 'Ana Souza', action: 'completou', detail: 'Treinamento de Altura', time: '5h atrás', icon: '🎓' },
  ];

  useEffect(() => {
    const shuffledAlerts = [...allSecurityAlerts].sort(() => 0.5 - Math.random());
    const selectedAlerts = shuffledAlerts.slice(0, 3);
    setCurrentAlerts(selectedAlerts);
  }, []);

  const daysWithoutAccidents = 127;
  
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) return "Bom dia";
    else if (currentHour >= 12 && currentHour < 18) return "Boa tarde";
    else return "Boa noite";
  };

  return (
    <div className="checklistPageModern">
      <title>Safely | Início</title> 
      <QRScannerModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />

      {/* FAB - Botão Flutuante de Scan (APENAS MOBILE) */}
      {/* Usa a classe .mobile-fab definida no Components.css */}
      {isMobile && (
        <button 
            className="mobile-fab"
            onClick={() => setIsQRModalOpen(true)}
            title="Scan QR Code"
        >
            <FaQrcode />
        </button>
      )}

      {/* Banner de Boas-vindas */}
      <div className="welcomeBannerGlass">
        <h1>{getCurrentGreeting()}, {user.name}!</h1>
        <p>Mantenha o foco. Sua segurança é nossa prioridade.</p>
      </div>

      {/* Dropdown Mobile para Resumo */}
      {isMobile && (
        <button className="mobileSummaryToggle" onClick={() => setIsSummaryDropdownOpen(!isSummaryDropdownOpen)}>
            <span>Ver Resumo de Dados</span>
            {isSummaryDropdownOpen ? <FaChevronUp /> : <FaChevronDown />} 
        </button>
      )}

      {/* Grid de Resumo (Cards Glass) */}
      {(!isMobile || isSummaryDropdownOpen) && (
        <div className="summaryGridModern">
          <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{daysWithoutAccidents}</h3><span>Dias Sem Acidentes</span></div>
            <div className="summaryIconBox" style={{background: 'rgba(0, 105, 92, 0.15)', color: '#00695c'}}><FaCalendarAlt /></div>
          </div>
          <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{completedChecklistsCount}/{totalChecklistsCount}</h3><span>Checklists</span></div>
            <div className="summaryIconBox iconTotal"><FaClipboardList /></div>
          </div>
          <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{completedVideosCount}</h3><span>Vídeos Vistos</span></div>
            <div className="summaryIconBox iconPending"><FaChalkboardTeacher /></div>
          </div>
          <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{completedQuizzesCount}</h3><span>Quizzes</span></div>
            <div className="summaryIconBox iconCompleted"><FaBrain /></div>
          </div>
           <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{totalPoints}</h3><span>{currentRankName}</span></div>
            <div className="summaryIconBox" style={{background: 'rgba(255, 143, 0, 0.15)', color: '#ff8f00'}}><FaMedal /></div>
          </div>
        </div>
      )}

      <div className="dashboardGridModern">
        {/* Coluna Principal (Esquerda) */}
        <div className="mainColumn">
          
          {/* Seção: Checklists Pendentes */}
          <div className="dashboardSectionGlass">
            <div className="sectionHeader">
              <h2>
                Checklists Pendentes 
                {pendingCount > 0 && <span className="counterBadge" style={{marginLeft: '10px'}}>{pendingCount}</span>}
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

          {/* Seção: Feed de Segurança */}
          <div className="dashboardSectionGlass">
              <div className="sectionHeader">
                  <h2><FaBullhorn style={{marginRight:'10px', color: '#E91E63'}}/> Feed da Comunidade</h2>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  {feedItems.map(item => (
                      <div key={item.id} className="compactListItem" style={{marginBottom: 0}}>
                          <div className="compactIconBox" style={{background: 'white', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', fontSize: '1.2rem'}}>
                              {item.icon}
                          </div>
                          <div className="compactContent">
                              <p style={{margin: 0, fontSize: '0.9rem'}}>
                                  <strong className="nameText">{item.user}</strong> <span className="roleText">{item.action}</span> <strong className="nameText">{item.detail}</strong>
                              </p>
                              <span style={{fontSize: '0.75rem'}} className="roleText">{item.time}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Seção: Treinamentos (Videos) */}
          <div className="dashboardSectionGlass">
            <div className="sectionHeader">
              <h2>Continuar Assistindo</h2>
              <Link to="/videos" className="linkViewAll">Galeria</Link>
            </div>
            
            <div className="mediaGridModern" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', paddingBottom: 0}}>
              {videos.slice(0, 3).map(video => (
                <Link to={`/videos/${video.id}`} key={video.id} className="mediaCardGlass" style={{marginBottom: 0}}>
                   <div className="mediaThumbnailContainer" style={{height: '130px'}}>
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