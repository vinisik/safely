import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, FaBuilding, FaIdBadge, FaEdit, 
  FaMedal, FaCertificate, FaHistory, FaCheckCircle, FaStar, 
  FaUsers, FaChartLine, FaClipboardList, FaDownload
} from 'react-icons/fa';

import safelyLogo from '../assets/michelin.png'; 
import '../pages/Pages.css'; 

function ProfilePage({ user, checklists, totalPoints }) {
  const navigate = useNavigate();
  const isManager = user?.role === 'gestor';

  // --- DADOS MOCKADOS ---
  const myCertificates = [
    { id: 1, title: 'NR-35 Trabalho em Altura', date: '10/08/2025', validUntil: '10/08/2027', status: 'valid' },
    { id: 2, title: 'Bloqueio e Etiquetagem (LOTO)', date: '15/09/2025', validUntil: '15/09/2026', status: 'valid' },
    { id: 3, title: 'Segurança em Eletricidade (NR-10)', date: '01/02/2024', validUntil: '01/02/2026', status: 'expiring' },
  ];

  const recentActivity = [
    { id: 1, action: 'Checklist Prensa Hidráulica', type: 'checklist', points: '+50', date: 'Hoje, 09:30' },
    { id: 2, action: 'Quiz: Prevenção de Incêndios', type: 'quiz', points: '+100', date: 'Ontem, 14:00' },
    { id: 3, action: 'Reporte de Risco (Óleo no chão)', type: 'alert', points: '+150', date: '12/10/2025' },
  ];

  const myTeamSummary = [
    { id: 1, name: 'Carlos Silva', role: 'Operador', status: 'ok', avatar: '#005A9C' },
    { id: 2, name: 'Ana Souza', role: 'Soldadora', status: 'warning', avatar: '#E91E63' },
    { id: 3, name: 'Roberto Firmino', role: 'Logística', status: 'danger', avatar: '#FF9800' },
    { id: 4, name: 'Julia Roberts', role: 'Qualidade', status: 'ok', avatar: '#4CAF50' },
  ];

  const getInitials = (n) => n.split(' ').map((p,i,a)=> i===0||i===a.length-1?p[0]:'').join('').toUpperCase();

  // --- VIEWS ---
  const renderCollaboratorView = () => (
    <>
      <div className="profileStatsGrid">
        <div className="statCardGlass">
           <div style={{color:'#FFC107', fontSize:'1.5rem', marginBottom:'10px'}}><FaMedal/></div>
           <div>
             <p>{totalPoints}</p>
             <span style={{color:'var(--text-secondary)', fontSize:'0.85rem'}}>Pontos Totais</span>
           </div>
        </div>
        <div className="statCardGlass">
           <div style={{color:'#22c55e', fontSize:'1.5rem', marginBottom:'10px'}}><FaCheckCircle/></div>
           <div>
             <p>{checklists.filter(c => c.status === 'completed').length}</p>
             <span style={{color:'var(--text-secondary)', fontSize:'0.85rem'}}>Checklists</span>
           </div>
        </div>
        <div className="statCardGlass">
           <div style={{color:'#38bdf8', fontSize:'1.5rem', marginBottom:'10px'}}><FaCertificate/></div>
           <div>
             <p>{myCertificates.length}</p>
             <span style={{color:'var(--text-secondary)', fontSize:'0.85rem'}}>Certificados</span>
           </div>
        </div>
      </div>

      <div className="dashboardGridModern" style={{gridTemplateColumns: '1.5fr 1fr'}}>
          <div className="mainColumn">
              <div className="dashboardSectionGlass">
                  <div className="sectionHeader">
                      <h2><FaCertificate style={{color: '#38bdf8', marginRight:'10px'}}/> Meus Certificados</h2>
                      <a className="linkViewAll">Histórico</a>
                  </div>
                  <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                      {myCertificates.map(cert => (
                          <div key={cert.id} className="modernListItem" style={{background: 'var(--input-bg)', border:'1px solid var(--glass-border)', padding:'1rem', borderRadius:'12px'}}>
                              <div style={{flex:1}}>
                                  <h4 style={{margin:'0 0 5px 0', color:'var(--text-color)', fontSize:'0.95rem'}}>{cert.title}</h4>
                                  <div style={{fontSize:'0.8rem', color:'var(--text-secondary)', display:'flex', gap:'15px', flexWrap:'wrap'}}>
                                      <span>Emitido: {cert.date}</span>
                                      <span style={{color: cert.status === 'expiring' ? '#f59e0b' : '#22c55e'}}>
                                          Vence: {cert.validUntil} {cert.status === 'expiring' && '(Atenção)'}
                                      </span>
                                  </div>
                              </div>
                              <button className="btnGhost" title="Baixar PDF"><FaDownload/></button>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="dashboardSectionGlass">
                  <div className="sectionHeader"><h2><FaStar style={{color: '#FFC107', marginRight:'10px'}}/> Badges</h2></div>
                  <div style={{display:'flex', gap:'1rem', flexWrap:'wrap'}}>
                      <div className="badgeCardGlass" style={{width:'110px', padding:'1rem 0.5rem'}}>
                          <div className="badgeIconCircle" style={{width:'45px', height:'45px', fontSize:'1.2rem', background:'#FFC107'}}><FaMedal/></div>
                          <span style={{fontSize:'0.8rem', fontWeight:'bold'}}>Iniciante</span>
                      </div>
                      <div className="badgeCardGlass" style={{width:'110px', padding:'1rem 0.5rem'}}>
                          <div className="badgeIconCircle" style={{width:'45px', height:'45px', fontSize:'1.2rem', background:'#4CAF50'}}><FaCheckCircle/></div>
                          <span style={{fontSize:'0.8rem', fontWeight:'bold'}}>Seguro</span>
                      </div>
                  </div>
              </div>
          </div>

          <div className="sidebarColumn">
              <div className="dashboardSectionGlass">
                  <div className="sectionHeader"><h2><FaHistory style={{marginRight:'10px'}}/> Atividade</h2></div>
                  <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                      {recentActivity.map(act => (
                          <div key={act.id} style={{display:'flex', gap:'10px', alignItems:'center', borderBottom:'1px solid var(--glass-border)', paddingBottom:'0.8rem'}}>
                              <div style={{
                                  width:'35px', height:'35px', borderRadius:'50%', 
                                  background: act.type === 'checklist' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                                  color: act.type === 'checklist' ? '#38bdf8' : '#FFC107',
                                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', flexShrink: 0
                              }}>
                                  {act.type === 'checklist' ? <FaClipboardList/> : <FaStar/>}
                              </div>
                              <div style={{flex:1, minWidth:0}}>
                                  <span style={{display:'block', fontSize:'0.85rem', fontWeight:'600', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{act.action}</span>
                                  <span style={{fontSize:'0.75rem', color:'var(--text-secondary)'}}>{act.date}</span>
                              </div>
                              <span style={{fontSize:'0.8rem', fontWeight:'bold', color:'#22c55e'}}>{act.points}</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </>
  );

  const renderManagerView = () => (
    <>
      <div className="profileStatsGrid">
        <div className="statCardGlass">
           <div style={{color:'#38bdf8', fontSize:'1.5rem', marginBottom:'10px'}}><FaUsers/></div>
           <div><p>12</p><span style={{color:'var(--text-secondary)', fontSize:'0.85rem'}}>Colaboradores</span></div>
        </div>
        <div className="statCardGlass">
           <div style={{color:'#22c55e', fontSize:'1.5rem', marginBottom:'10px'}}><FaChartLine/></div>
           <div><p>94%</p><span style={{color:'var(--text-secondary)', fontSize:'0.85rem'}}>Conformidade</span></div>
        </div>
        <div className="statCardGlass">
           <div style={{color:'#f59e0b', fontSize:'1.5rem', marginBottom:'10px'}}><FaClipboardList/></div>
           <div><p>5</p><span style={{color:'var(--text-secondary)', fontSize:'0.85rem'}}>Aprovações</span></div>
        </div>
      </div>

      <div className="dashboardGridModern" style={{gridTemplateColumns: '1.5fr 1fr'}}>
          <div className="mainColumn">
              <div className="dashboardSectionGlass">
                  <div className="sectionHeader">
                      <h2><FaUsers style={{color: '#8b5cf6', marginRight:'10px'}}/> Minha Equipe</h2>
                      <a className="linkViewAll" onClick={() => navigate('/gestao')}>Gerenciar</a>
                  </div>
                  <div className="modernList">
                      {myTeamSummary.map(member => (
                          <div key={member.id} className="modernListItem" style={{cursor:'pointer'}} onClick={() => navigate('/gestao')}>
                              <div className="performerInfo">
                                  <div className="avatarInitials" style={{backgroundColor: member.avatar, width:'40px', height:'40px', fontSize:'0.9rem'}}>
                                      {getInitials(member.name)}
                                  </div>
                                  <div className="infoText">
                                      <span className="nameText">{member.name}</span>
                                      <span className="roleText">{member.role}</span>
                                  </div>
                              </div>
                              <span className={`statusBadgePill ${member.status === 'ok' ? 'completed' : 'pending'}`} 
                                    style={{background: member.status === 'danger' ? 'rgba(239, 68, 68, 0.1)' : ''}}>
                                  {member.status === 'ok' ? 'Regular' : member.status === 'warning' ? 'Atenção' : 'Crítico'}
                              </span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>

          <div className="sidebarColumn">
              <div className="dashboardSectionGlass">
                  <div className="sectionHeader"><h2><FaBuilding style={{marginRight:'10px'}}/> Meu Setor</h2></div>
                  <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                      <div className="modernListItem" style={{border:'none', padding:'0.5rem 0'}}>
                          <span style={{color:'var(--text-secondary)'}}>Departamento</span>
                          <strong style={{float:'right'}}>Produção</strong>
                      </div>
                      <div className="modernListItem" style={{border:'none', padding:'0.5rem 0'}}>
                          <span style={{color:'var(--text-secondary)'}}>Turno</span>
                          <strong style={{float:'right'}}>Turno A</strong>
                      </div>
                  </div>
                  <button className="btnNewChecklist" style={{marginTop:'1.5rem', width:'100%', justifyContent:'center'}}>
                      <FaEdit /> Editar Dados
                  </button>
              </div>
          </div>
      </div>
    </>
  );

  return (
    <div className="checklistPageModern">
      <title>Safely | Meu Perfil</title>

      {/* HEADER DO PERFIL (Sem as listras de fundo) */}
      <div className="profileHeaderGlass">
          
          {/* REMOVIDA A DIV DE DECORAÇÃO COM GRADIENTE QUE ESTAVA AQUI */}

          <div style={{position:'relative', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center'}}>
              <div className="profileAvatarContainer">
                  <img src={user.profilePictureUrl} alt={user.name} className="mainProfileImg" />
                  
                  <div className="companyBadgeImg">
                      <img src={safelyLogo} alt="Logo" style={{width:'100%', height:'100%', objectFit:'contain'}}/>
                  </div>
              </div>
              
              <h1 style={{fontSize:'1.8rem', margin:'0 0 5px 0', color: 'var(--text-color)'}}>{user.name}</h1>
              <p style={{fontSize:'1rem', color:'var(--text-secondary)', margin:0, opacity: 0.9}}>{user.role === 'gestor' ? 'Supervisor de Produção' : 'Operador de Produção'}</p>
              
              <div className="profileMetaBadges">
                  <div className="metaBadgePill">
                      <FaBuilding /> Michelin - Itatiaia
                  </div>
                  <div className="metaBadgePill">
                      <FaIdBadge /> ID: {user.role === 'gestor' ? 'SUP-882' : 'OP-4029'}
                  </div>
                  <div className="metaBadgePill">
                      <FaEnvelope /> {user.email || 'usuario@safely.com'}
                  </div>
              </div>

              <button className="btnGhost" style={{marginTop:'1.5rem', borderColor:'var(--glass-border)', color: 'var(--text-secondary)'}}>
                  <FaEdit style={{marginRight:'8px'}}/> Editar Perfil
              </button>
          </div>
      </div>

      {isManager ? renderManagerView() : renderCollaboratorView()}

    </div>
  );
}

export default ProfilePage;