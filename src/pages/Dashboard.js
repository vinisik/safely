import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { videos, quizzes, allSecurityAlerts } from '../data/mockData'; 
import { 
  FaClock, FaBrain, FaClipboardList, FaCalendarAlt, FaMedal, FaChalkboardTeacher, 
  FaChevronUp, FaChevronDown, FaBell, FaPlayCircle, FaQrcode, FaBullhorn,
  FaUsers, FaChartLine, FaExclamationTriangle, FaFileSignature, FaCheckDouble, FaUserShield
} from 'react-icons/fa'; 
import useIsMobile from '../hooks/useIsMobile';
import QRScannerModal from '../components/QRScannerModal'; 

// Importa o CSS Unificado
import './Pages.css';

function Dashboard({user, checklists, totalPoints, 
    completedVideosCount, totalVideosCount, 
    completedQuizzesCount, totalQuizzesCount, currentRankName}) {
  
  const [isSummaryDropdownOpen, setIsSummaryDropdownOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const [currentAlerts, setCurrentAlerts] = useState([]);

  // Filtros de Checklist (Para Operador)
  const pendingChecklists = checklists.filter(c => c.status === 'pending');
  const pendingCount = pendingChecklists.length;
  const completedChecklistsCount = checklists.filter(c => c.status === 'completed').length;
  const totalChecklistsCount = checklists.length; 

  // --- DADOS MOCKADOS PARA O GESTOR ---
  const managerStats = {
    teamCompliance: 94,
    openIncidents: 2,
    pendingApprovals: 5,
    teamPresent: '12/12'
  };

  const pendingApprovals = [
    { id: 101, title: 'Permissão de Trabalho em Altura - Setor B', author: 'Carlos Silva', time: '10 min atrás' },
    { id: 102, title: 'Manutenção Preventiva - Prensa 04', author: 'Marcos Paulo', time: '45 min atrás' },
    { id: 103, title: 'Checklist Diário - Empilhadeira 02', author: 'Ana Souza', time: '1h atrás' },
  ];

  const criticalIssues = [
    { id: 1, area: 'Extrusão', issue: 'Temperatura acima do limite', status: 'Crítico' },
    { id: 2, area: 'Expedição', issue: 'Bloqueio de saída de emergência', status: 'Alto' }
  ];

  // Feed Comum
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

  // ==========================================
  // RENDERIZAÇÃO: PERFIL GESTOR (Visão Macro)
  // ==========================================
  const renderManagerDashboard = () => (
    <>
      {/* Grid de Resumo GESTOR (Foco em Equipe e Risco) */}
      <div className="summaryGridModern">
          <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{managerStats.teamCompliance}%</h3><span>Conformidade da Equipe</span></div>
            <div className="summaryIconBox" style={{background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e'}}><FaChartLine /></div>
          </div>
          <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{managerStats.openIncidents}</h3><span>Incidentes Abertos</span></div>
            <div className="summaryIconBox" style={{background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444'}}><FaExclamationTriangle /></div>
          </div>
          <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{managerStats.pendingApprovals}</h3><span>Aprovações Pendentes</span></div>
            <div className="summaryIconBox" style={{background: 'rgba(234, 179, 8, 0.15)', color: '#eab308'}}><FaFileSignature /></div>
          </div>
          <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{managerStats.teamPresent}</h3><span>Equipe Presente</span></div>
            <div className="summaryIconBox" style={{background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8'}}><FaUsers /></div>
          </div>
      </div>

      <div className="dashboardGridModern">
        {/* Coluna Principal Gestor */}
        <div className="mainColumn">
            
            {/* Seção: Atenção Necessária */}
            <div className="dashboardSectionGlass" style={{borderLeft: '4px solid #ef4444'}}>
                <div className="sectionHeader">
                    <h2><FaBell style={{color: '#ef4444', marginRight:'10px'}}/> Atenção Imediata</h2>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    {criticalIssues.map(issue => (
                        <div key={issue.id} className="alertCardGlass priority-high" style={{margin:0, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <div>
                                <h3 style={{fontSize:'0.95rem', margin:0}}>{issue.issue}</h3>
                                <span style={{fontSize:'0.8rem', opacity:0.7}}>Área: {issue.area}</span>
                            </div>
                            <button className="btnNewChecklist" style={{padding:'0.4rem 0.8rem', fontSize:'0.8rem', background:'#ef4444', border:'none'}}>Resolver</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Seção: Aprovações Recentes */}
            <div className="dashboardSectionGlass">
                <div className="sectionHeader">
                    <h2><FaCheckDouble style={{color: 'var(--primary-color)', marginRight:'10px'}}/> Validação de Checklists</h2>
                    <Link to="/checklists" className="linkViewAll">Ver Todos</Link>
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {pendingApprovals.map(item => (
                        <div key={item.id} className="compactListItem">
                            <div className="compactIconBox" style={{background:'rgba(56, 189, 248, 0.1)', color:'var(--primary-color)'}}>
                                <FaClipboardList />
                            </div>
                            <div className="compactContent">
                                <h3>{item.title}</h3>
                                <div className="compactMeta">
                                    <FaUserShield size={10} /> Feito por: {item.author} • {item.time}
                                </div>
                            </div>
                            <div className="statusBadgePill pending">Aguardando</div>
                        </div>
                    ))}
                </div>
            </div>

             {/* Feed da Equipe (Visão Gestor) */}
             <div className="dashboardSectionGlass">
                <div className="sectionHeader">
                    <h2><FaUsers style={{marginRight:'10px', color: '#8b5cf6'}}/> Atividade da Equipe</h2>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    {feedItems.map(item => (
                        <div key={item.id} className="compactListItem" style={{marginBottom: 0}}>
                            <div className="compactIconBox" style={{background: 'var(--card-bg)', borderRadius: '50%', fontSize: '1.2rem'}}>
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
        </div>

        {/* Sidebar Gestor */}
        <div className="sidebarColumn">
            <div className="dashboardSectionGlass">
                <div className="sectionHeader"><h2><FaChartLine style={{marginRight: '8px', color: '#22c55e'}}/> Status do Turno</h2></div>
                <div style={{textAlign:'center', padding:'1rem 0'}}>
                    <div style={{fontSize:'3rem', fontWeight:'700', color:'#22c55e', lineHeight:1}}>100%</div>
                    <span style={{fontSize:'0.9rem', color:'var(--text-secondary)'}}>Operacional</span>
                    <hr style={{borderColor:'var(--glass-border)', margin:'1rem 0'}}/>
                    <div style={{display:'flex', justifyContent:'space-around'}}>
                        <div>
                            <strong style={{display:'block', fontSize:'1.2rem'}}>0</strong>
                            <span style={{fontSize:'0.7rem', opacity:0.7}}>Acidentes</span>
                        </div>
                        <div>
                            <strong style={{display:'block', fontSize:'1.2rem'}}>28</strong>
                            <span style={{fontSize:'0.7rem', opacity:0.7}}>Checklists</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboardSectionGlass">
                <div className="sectionHeader"><h2>Acesso Rápido</h2></div>
                <div style={{display:'flex', flexDirection:'column', gap:'0.8rem'}}>
                    <Link to="/gestao" className="btnGhost" style={{textAlign:'center', width:'100%', display:'block', textDecoration:'none'}}>
                        Painel Completo de Gestão
                    </Link>
                    <button className="btnNewChecklist" style={{width:'100%', justifyContent:'center'}}>
                        <FaBullhorn /> Emitir Comunicado
                    </button>
                </div>
            </div>
        </div>
      </div>
    </>
  );

  // ==========================================
  // RENDERIZAÇÃO: PERFIL OPERADOR (Visão Pessoal)
  // ==========================================
  const renderEmployeeDashboard = () => (
    <>
      {/* Grid de Resumo OPERADOR (Foco Pessoal) */}
      {(!isMobile || isSummaryDropdownOpen) && (
        <div className="summaryGridModern">
          <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{daysWithoutAccidents}</h3><span>Dias Sem Acidentes</span></div>
            <div className="summaryIconBox" style={{background: 'rgba(0, 105, 92, 0.15)', color: '#00695c'}}><FaCalendarAlt /></div>
          </div>
          <div className="summaryCardGlass">
            <div className="summaryContent"><h3>{completedChecklistsCount}/{totalChecklistsCount}</h3><span>Meus Checklists</span></div>
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
        {/* Coluna Principal Operador */}
        <div className="mainColumn">
          
          <div className="dashboardSectionGlass">
            <div className="sectionHeader">
              <h2>Checklists Pendentes {pendingCount > 0 && <span className="counterBadge" style={{marginLeft: '10px'}}>{pendingCount}</span>}</h2>
              <Link to="/checklists" className="linkViewAll">Ver Todos</Link>
            </div>
            {pendingCount === 0 ? (
              <div className="emptyStateCard"><h3>Tudo Limpo!</h3><p>Você não tem checklists pendentes.</p></div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column'}}>
                {pendingChecklists.slice(0, 3).map(item => (
                  <Link to={`/checklists/${item.id}`} key={item.id} className="compactListItem">
                    <div className="compactIconBox"><FaClipboardList /></div>
                    <div className="compactContent">
                      <h3>{item.title}</h3>
                      <div className="compactMeta"><FaClock size={10} /> Vence em: {item.dueDate}</div>
                    </div>
                    <div className={`statusBadgePill pending`}>Pendente</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="dashboardSectionGlass">
              <div className="sectionHeader"><h2><FaBullhorn style={{marginRight:'10px', color: '#E91E63'}}/> Feed da Comunidade</h2></div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  {feedItems.map(item => (
                      <div key={item.id} className="compactListItem" style={{marginBottom: 0}}>
                          <div className="compactIconBox" style={{background: 'var(--card-bg)', borderRadius: '50%', fontSize: '1.2rem'}}>
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

          <div className="dashboardSectionGlass">
            <div className="sectionHeader"><h2>Continuar Assistindo</h2><Link to="/videos" className="linkViewAll">Galeria</Link></div>
            <div className="mediaGridModern" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', paddingBottom: 0}}>
              {videos.slice(0, 3).map(video => (
                <Link to={`/videos/${video.id}`} key={video.id} className="mediaCardGlass" style={{marginBottom: 0}}>
                   <div className="mediaThumbnailContainer" style={{height: '130px'}}>
                      <img src={video.thumbnail} alt={video.title} className="mediaThumbnail" />
                      <div className="mediaOverlayIcon"><FaPlayCircle /></div>
                   </div>
                   <div className="mediaContent" style={{padding: '1rem'}}>
                      <h3 style={{fontSize: '0.95rem'}}>{video.title}</h3>
                      <div className="mediaMeta"><FaClock /> {video.dueDate || '15 min'}</div>
                   </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Coluna Lateral Operador */}
        <div className="sidebarColumn">
          <div className="dashboardSectionGlass">
            <div className="sectionHeader"><h2><FaBell style={{marginRight: '8px', color: '#ef5350'}}/> Avisos</h2></div>
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
          <div className="dashboardSectionGlass">
             <div className="sectionHeader"><h2>Quizzes</h2><Link to="/quizzes" className="linkViewAll">Ver</Link></div>
             <div>
              {quizzes.slice(0, 3).map(quiz => (
                <Link to={`/quizzes/${quiz.id}`} key={quiz.id} className="compactListItem">
                  <div className="compactIconBox quizIcon"><FaBrain /></div>
                  <div className="compactContent">
                    <h3>{quiz.title}</h3>
                    <div className="compactMeta"><FaMedal size={10} /> +10 pts</div>
                  </div>
                </Link>
              ))}
             </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="checklistPageModern">
      <title>Safely | Início</title> 
      <QRScannerModal isOpen={isQRModalOpen} onClose={() => setIsQRModalOpen(false)} />

      {/* FAB - Botão Flutuante de Scan (APENAS MOBILE) */}
      {isMobile && (
        <button 
            className="mobile-fab"
            onClick={() => setIsQRModalOpen(true)}
            title="Scan QR Code"
        >
            <FaQrcode />
        </button>
      )}

      {/* Banner de Boas-vindas (Comum a ambos) */}
      <div className="welcomeBannerGlass">
        <h1>{getCurrentGreeting()}, {user.name}!</h1>
        <p>
            {user.role === 'gestor' 
             ? 'Visão geral da segurança e operação do seu turno.' 
             : 'Mantenha o foco. Sua segurança é nossa prioridade.'}
        </p>
      </div>

      {/* Dropdown Mobile para Resumo */}
      {isMobile && (
        <button className="mobileSummaryToggle" onClick={() => setIsSummaryDropdownOpen(!isSummaryDropdownOpen)}>
            <span>Ver Resumo de Dados</span>
            {isSummaryDropdownOpen ? <FaChevronUp /> : <FaChevronDown />} 
        </button>
      )}

      {/* Renderização Condicional Baseada no Papel */}
      {user.role === 'gestor' ? renderManagerDashboard() : renderEmployeeDashboard()}

    </div>
  );
}

export default Dashboard;