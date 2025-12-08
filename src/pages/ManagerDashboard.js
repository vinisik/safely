import React, { useState } from 'react';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, 
  ArcElement, PointElement, LineElement, RadialLinearScale, Filler 
} from 'chart.js';
import { 
  FaHeartbeat, FaUsers, FaClock, FaCheckCircle, FaExclamationTriangle, FaCertificate, 
  FaArrowUp, FaArrowDown, FaFilePdf, FaFileExport, FaChartBar, FaChartPie,
  FaShieldAlt, FaGraduationCap, FaBolt, FaTools, FaChartLine, FaNetworkWired, FaMapMarkedAlt,
  FaMoneyBillWave, FaClipboardCheck, FaUserTie, FaBrain, FaSearch, FaEllipsisV, 
  FaBell, FaUserInjured, FaHardHat, FaPen, FaCalendarAlt, FaSun, FaBatteryFull, FaBatteryQuarter, FaBatteryHalf, 
  FaHandHoldingUsd, FaRecycle, FaLeaf, FaTint, FaUserMd, FaNotesMedical, FaIndustry, FaTruckLoading
} from 'react-icons/fa';
import { topPerformers, recentIncidents } from '../data/mockData';
import './Pages.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale, Filler);
ChartJS.defaults.color = '#94a3b8'; 
ChartJS.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('indicators'); // Começa na aba cheia
  const [searchTerm, setSearchTerm] = useState('');

  // ==========================================
  // DADOS: INDICADORES GLOBAIS (Aba 1)
  // ==========================================
  const kpiData = {
    // Segurança
    daysWithoutAccidents: 365, nearMisses: 15, severityIndex: 0.12, accidentCost: 12500,
    // Operacional
    avgResponseTime: 2.3, auditsCompleted: 47, nonConformities: 8, closedActionsRate: 92,
    // Pessoas
    activeCertifications: 142, participationRate: 96, trainingHours: 1250, totalEmployees: 320,
    knowledgeRetention: 88, maintenanceRate: 98,
    // Financeiro
    roiSafety: 320, savedCost: 45000,
    // Sustentabilidade (NOVO)
    wasteRecycled: 850, waterSaved: 12000, carbonFootprint: 4.2,
    // Saúde (NOVO)
    absenteeism: 1.8, ergoComplaints: 2
  };

  const heatmapPoints = [
    { x: 20, y: 30, value: 'high', label: 'Extrusão' }, { x: 50, y: 50, value: 'medium', label: 'Montagem' }, 
    { x: 80, y: 20, value: 'low', label: 'Expedição' }, { x: 30, y: 70, value: 'high', label: 'Caldeira' }
  ];

  // 1. Gráfico Misto: Inspeções vs Incidentes
  const mixedChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      { type: 'bar', label: 'Inspeções', data: [40, 45, 50, 65, 70, 80], backgroundColor: 'rgba(56, 189, 248, 0.5)', borderRadius: 4, yAxisID: 'y' },
      { type: 'line', label: 'Incidentes', data: [5, 4, 3, 2, 1, 0], borderColor: '#ef4444', borderWidth: 2, tension: 0.4, yAxisID: 'y1' }
    ]
  };
  const mixedChartOptions = {
    responsive: true, maintainAspectRatio: false,
    scales: {
      y: { type: 'linear', display: true, position: 'left', title: {display: true, text: 'Qtd'} },
      y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false } },
    }
  };

  // 2. Gráfico de Resíduos (Área) - NOVO
  const wasteData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      { label: 'Reciclado (kg)', data: [500, 600, 750, 800, 850, 900], borderColor: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.2)', fill: true, tension: 0.4 },
      { label: 'Descarte (kg)', data: [400, 350, 300, 250, 200, 150], borderColor: '#94a3b8', backgroundColor: 'rgba(148, 163, 184, 0.2)', fill: true, tension: 0.4 }
    ]
  };

  // 3. Incidentes por Turno (Barra Empilhada) - NOVO
  const shiftData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [
      { label: 'Turno A', data: [1, 0, 1, 0], backgroundColor: '#38bdf8' },
      { label: 'Turno B', data: [2, 1, 0, 0], backgroundColor: '#818cf8' },
      { label: 'Turno C', data: [0, 1, 0, 0], backgroundColor: '#c084fc' }
    ]
  };
  const stackedOptions = { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } };

  // 4. Treinamento por Departamento (Horizontal Bar) - NOVO
  const trainingByDeptData = {
    labels: ['Manutenção', 'Produção', 'Logística', 'Qualidade', 'Adm'],
    datasets: [{ label: '% Concluído', data: [98, 85, 70, 95, 60], backgroundColor: ['#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#94a3b8'], borderRadius: 4 }]
  };
  const horizontalOptions = { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };

  const safetyCultureData = {
    labels: ['Liderança', 'Procedimentos', 'EPIs', 'Comunicação', 'Relatos', 'Treino'],
    datasets: [{ label: 'Atual', data: [85, 90, 95, 75, 80, 88], backgroundColor: 'rgba(56, 189, 248, 0.2)', borderColor: '#38bdf8', borderWidth: 2 }]
  };

  const nonConformanceData = {
    labels: ['EPIs', 'Vazamentos', 'Obstrução', 'Elétrica', 'Outros'],
    datasets: [{ data: [12, 19, 3, 5, 2], backgroundColor: ['#ef5350', '#ffa726', '#ff7043', '#7e57c2', '#bdbdbd'], borderWidth: 0 }]
  };

  // ==========================================
  // DADOS: EQUIPE (Aba 2)
  // ==========================================
  const teamMembers = [
    { id: 1, name: 'Carlos Silva', role: 'Operador Líder', status: 'ok', pendingTasks: 0, safetyScore: 98, lastActivity: 'Checklist Extrusora (10min)', avatarColor: '#005A9C', trainingProgress: 100, stressLevel: 'low', skills: ['NR-35', 'CIPA'] },
    { id: 2, name: 'Ana Souza', role: 'Soldadora', status: 'warning', pendingTasks: 2, safetyScore: 75, lastActivity: 'Treinamento Altura', avatarColor: '#E91E63', trainingProgress: 60, stressLevel: 'medium', skills: ['NR-10'] },
    { id: 3, name: 'Roberto Firmino', role: 'Logística', status: 'danger', pendingTasks: 4, safetyScore: 45, lastActivity: 'Ausente (Atestado)', avatarColor: '#FF9800', trainingProgress: 30, stressLevel: 'high', skills: [] },
    { id: 4, name: 'Julia Roberts', role: 'Qualidade', status: 'ok', pendingTasks: 0, safetyScore: 100, lastActivity: 'Auditoria Setor B', avatarColor: '#4CAF50', trainingProgress: 95, stressLevel: 'low', skills: ['Auditora', 'Brigada'] },
    { id: 5, name: 'Marcos Paulo', role: 'Manutenção', status: 'ok', pendingTasks: 1, safetyScore: 92, lastActivity: 'Ordem de Serviço #992', avatarColor: '#9C27B0', trainingProgress: 80, stressLevel: 'low', skills: ['Elétrica'] },
    { id: 6, name: 'Pedro Santos', role: 'Aprendiz', status: 'ok', pendingTasks: 0, safetyScore: 88, lastActivity: 'Quiz Segurança', avatarColor: '#607d8b', trainingProgress: 40, stressLevel: 'medium', skills: [] },
  ];

  const recentAlerts = [
    { id: 1, type: 'incident', message: 'Relato de quase acidente na Área B', time: '10 min atrás', severity: 'high' },
    { id: 2, type: 'task', message: '3 Checklists de Pré-uso atrasados', time: '1 hora atrás', severity: 'medium' },
  ];

  // --- FUNÇÕES AUXILIARES ---
  const handleExportJSON = () => { /* ... lógica de exportação ... */ };
  const getInitials = (n) => n.split(' ').map((p,i,a)=> i===0||i===a.length-1?p[0]:'').join('').toUpperCase();
  const getStatusColor = (s) => (s==='ok'?'#22c55e':s==='warning'?'#f59e0b':'#ef4444');
  const getStressIcon = (level) => {
      if(level === 'low') return <span title="Disposição Alta" style={{color:'#22c55e'}}><FaBatteryFull/></span>;
      if(level === 'medium') return <span title="Cansaço Moderado" style={{color:'#f59e0b'}}><FaBatteryHalf/></span>;
      return <span title="Fadiga Alta - Atenção!" style={{color:'#ef4444'}}><FaBatteryQuarter/></span>;
  };

  // --- RENDERIZAÇÃO: INDICADORES GLOBAIS (Massiva) ---
  const renderIndicatorsView = () => (
    <>
      <h3 style={{margin:'2rem 0 1rem 0', color:'var(--text-color)', fontSize:'1.2rem'}}>KPIs Estratégicos</h3>
      
      {/* GRID DE KPIs SUPER DENSO (5 Colunas) */}
      <div className="kpiGridModern" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
        
        {/* Segurança */}
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(74, 222, 128, 0.2)', color:'#4ade80'}}><FaShieldAlt/></div><span className="trendPill positive"><FaArrowUp/> Dia 365</span></div><span className="kpiValue">{kpiData.daysWithoutAccidents}</span><span className="kpiLabel">Dias Sem Acidentes</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(251, 146, 60, 0.2)', color:'#fb923c'}}><FaBolt/></div><span className="trendPill positive">+5</span></div><span className="kpiValue">{kpiData.nearMisses}</span><span className="kpiLabel">Quase Acidentes</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(248, 113, 113, 0.2)', color:'#f87171'}}><FaHeartbeat/></div><span className="trendPill positive">-0.02</span></div><span className="kpiValue">{kpiData.severityIndex}</span><span className="kpiLabel">Índice Gravidade</span></div>
        
        {/* Financeiro */}
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(56, 189, 248, 0.2)', color:'#38bdf8'}}><FaHandHoldingUsd/></div><span className="trendPill positive">+15%</span></div><span className="kpiValue">{kpiData.roiSafety}%</span><span className="kpiLabel">ROI em Segurança</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(34, 197, 94, 0.2)', color:'#22c55e'}}><FaMoneyBillWave/></div><span className="trendPill positive">R$ 45k</span></div><span className="kpiValue">Custo Evitado</span><span className="kpiLabel">Prevenção</span></div>
        
        {/* Operacional */}
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass iconAlert"><FaExclamationTriangle/></div><span className="trendPill positive">-5</span></div><span className="kpiValue">{kpiData.nonConformities}</span><span className="kpiLabel">Não Conformidades</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass iconAudit"><FaCheckCircle/></div><span className="trendPill positive">+12</span></div><span className="kpiValue">{kpiData.auditsCompleted}</span><span className="kpiLabel">Auditorias</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass iconTime"><FaClock/></div><span className="trendPill positive">-0.8h</span></div><span className="kpiValue">{kpiData.avgResponseTime}h</span><span className="kpiLabel">Tempo Resposta</span></div>
        
        {/* Sustentabilidade (NOVO) */}
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(16, 185, 129, 0.2)', color:'#10b981'}}><FaRecycle/></div><span className="trendPill positive">+120kg</span></div><span className="kpiValue">{kpiData.wasteRecycled}</span><span className="kpiLabel">Kg Reciclados</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(59, 130, 246, 0.2)', color:'#3b82f6'}}><FaTint/></div><span className="trendPill positive">-5%</span></div><span className="kpiValue">{kpiData.waterSaved}</span><span className="kpiLabel">Litros Água Econ.</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(107, 114, 128, 0.2)', color:'#6b7280'}}><FaIndustry/></div><span className="trendPill positive">-2%</span></div><span className="kpiValue">{kpiData.carbonFootprint}</span><span className="kpiLabel">Pegada Carbono (t)</span></div>
        
        {/* Saúde e Pessoas (NOVO) */}
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(236, 72, 153, 0.2)', color:'#ec4899'}}><FaUserMd/></div><span className="trendPill negative">+0.2%</span></div><span className="kpiValue">{kpiData.absenteeism}%</span><span className="kpiLabel">Absenteísmo</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(139, 92, 246, 0.2)', color:'#8b5cf6'}}><FaUserTie/></div></div><span className="kpiValue">{kpiData.totalEmployees}</span><span className="kpiLabel">Total Colaboradores</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(255, 255, 255, 0.1)', color:'var(--primary-color)'}}><FaGraduationCap/></div><span className="trendPill positive">+120h</span></div><span className="kpiValue">{kpiData.trainingHours}</span><span className="kpiLabel">Horas Treino</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(251, 191, 36, 0.2)', color:'#fbbf24'}}><FaTools/></div><span className="trendPill positive">98%</span></div><span className="kpiValue">{kpiData.maintenanceRate}%</span><span className="kpiLabel">Manutenção Prev.</span></div>
      </div>

      <h3 style={{margin:'2rem 0 1rem 0', color:'var(--text-color)', fontSize:'1.2rem'}}>Análise Gráfica</h3>

      {/* GRID DE GRÁFICOS (4 Colunas no Desktop) */}
      <div className="chartsGridModern" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'}}>
        
        {/* Correlação Inspeção x Incidente */}
        <div className="chartSectionGlass" style={{gridColumn: '1 / -1'}}>
            <div className="sectionTitleGlass"><FaChartLine/> Correlação: Esforço Preventivo vs. Sinistralidade</div>
            <div style={{height:'300px'}}><Bar data={mixedChartData} options={mixedChartOptions} /></div>
        </div>

        {/* Gestão de Resíduos (Área) */}
        <div className="chartSectionGlass">
            <div className="sectionTitleGlass"><FaLeaf/> Gestão de Resíduos (kg)</div>
            <div style={{height:'250px'}}><Line data={wasteData} options={{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:true}}}} /></div>
        </div>

        {/* Ocorrências por Turno (Stacked) */}
        <div className="chartSectionGlass">
            <div className="sectionTitleGlass"><FaTruckLoading/> Ocorrências por Turno</div>
            <div style={{height:'250px'}}><Bar data={shiftData} options={stackedOptions} /></div>
        </div>

        {/* Treinamento por Depto (Horizontal) */}
        <div className="chartSectionGlass">
            <div className="sectionTitleGlass"><FaGraduationCap/> Capacitação por Setor</div>
            <div style={{height:'250px'}}><Bar data={trainingByDeptData} options={horizontalOptions} /></div>
        </div>

        {/* Radar Cultura */}
        <div className="chartSectionGlass"><div className="sectionTitleGlass"><FaNetworkWired/> Cultura de Segurança</div><div style={{height:'250px'}}><Radar options={{responsive:true,maintainAspectRatio:false,scales:{r:{ticks:{backdropColor:'transparent'}}}}} data={safetyCultureData}/></div></div>
        
        {/* Tipos Ocorrência */}
        <div className="chartSectionGlass"><div className="sectionTitleGlass"><FaChartPie/> Tipos de Ocorrência</div><div style={{height:'250px', display:'flex', justifyContent:'center'}}><Doughnut options={{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right'}}}} data={nonConformanceData}/></div></div>
        
        {/* Mapa de Calor */}
        <div className="chartSectionGlass" style={{gridColumn: '1 / -1'}}>
            <div className="sectionTitleGlass"><FaMapMarkedAlt/> Mapeamento de Áreas Críticas</div>
            <div style={{position:'relative', width:'100%', height:'350px', background:'#334155', borderRadius:'16px', overflow:'hidden'}}>
                <div style={{width:'100%', height:'100%', opacity: 0.15, background:'repeating-linear-gradient(45deg, #000, #000 10px, #222 10px, #222 20px)'}}></div>
                {heatmapPoints.map((p,i)=>(<div key={i} style={{position:'absolute', left:`${p.x}%`, top:`${p.y}%`, width:'40px', height:'40px', borderRadius:'50%', background: p.value==='high'?'rgba(239, 68, 68, 0.8)':'rgba(234, 179, 8, 0.8)', boxShadow:'0 0 15px 5px rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold', cursor:'pointer', transform:'translate(-50%,-50%)'}}>!</div>))}
                <div style={{position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.6)', color:'white', padding:'5px 10px', borderRadius:'8px', fontSize:'0.7rem'}}>Plantas Industriais: Unidade 1 & 2</div>
            </div>
        </div>
      </div>
    </>
  );

  // 2. VISÃO DA EQUIPE (Renderização)
  const renderTeamView = () => (
    <div className="dashboardGridModern" style={{gridTemplateColumns: '2.5fr 1fr'}}>
        
        {/* COLUNA ESQUERDA */}
        <div className="mainColumn">
            <div className="controlsContainer" style={{marginBottom: '1rem'}}>
                <div className="searchBarGlass">
                    <FaSearch className="searchIconModern" />
                    <input 
                        type="text" 
                        placeholder="Buscar por nome, função ou skill..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem'}}>
                {teamMembers.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase())).map(member => (
                    <div key={member.id} className="summaryCardGlass" style={{
                        flexDirection: 'column', alignItems: 'stretch', padding: '1.2rem', gap: '1rem',
                        borderLeft: `4px solid ${getStatusColor(member.status)}`, position: 'relative'
                    }}>
                        {/* Header do Card */}
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                <div className="avatarInitials" style={{backgroundColor: member.avatarColor, width: '50px', height: '50px', fontSize:'1.1rem'}}>
                                    {getInitials(member.name)}
                                </div>
                                <div>
                                    <h3 style={{fontSize: '1.1rem', margin: 0}}>{member.name}</h3>
                                    <span style={{fontSize: '0.8rem', opacity: 0.7}}>{member.role}</span>
                                    <div style={{display:'flex', gap:'4px', marginTop:'4px'}}>
                                        {member.skills.map(skill => (
                                            <span key={skill} style={{fontSize:'0.65rem', background:'var(--glass-border)', padding:'2px 6px', borderRadius:'4px', color:'var(--text-secondary)'}}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="btnGhost" style={{padding: '5px', borderRadius: '50%'}}><FaEllipsisV /></button>
                        </div>

                        {/* Barra de Progresso + Última Atividade */}
                        <div style={{background: 'var(--input-bg)', padding: '0.8rem', borderRadius: '12px', fontSize: '0.8rem'}}>
                            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'5px', color:'var(--text-secondary)'}}>
                                <span>Última Atividade:</span>
                                <strong>{member.lastActivity}</strong>
                            </div>
                            
                            <div style={{marginTop: '10px'}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px', opacity: 0.8}}>
                                    <span>Trilha de Capacitação</span>
                                    <span>{member.trainingProgress}%</span>
                                </div>
                                <div style={{width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden'}}>
                                    <div style={{width: `${member.trainingProgress}%`, height: '100%', background: member.trainingProgress < 50 ? '#f59e0b' : '#38bdf8'}}></div>
                                </div>
                            </div>
                        </div>

                        {/* Footer: KPIs Individuais */}
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '10px'}}>
                            <div style={{textAlign: 'center'}}>
                                <span style={{fontSize: '0.7rem', display: 'block', opacity: 0.6}}>Score</span>
                                <strong style={{color: member.safetyScore < 80 ? '#ef4444' : '#22c55e', fontSize:'1.1rem'}}>{member.safetyScore}</strong>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <span style={{fontSize: '0.7rem', display: 'block', opacity: 0.6}}>Pendências</span>
                                <strong style={{color: member.pendingTasks > 0 ? '#f59e0b' : 'inherit', fontSize:'1.1rem'}}>{member.pendingTasks}</strong>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                <span style={{fontSize: '0.7rem', display: 'block', opacity: 0.6}}>Fadiga</span>
                                <div style={{fontSize:'1.2rem', marginTop:'2px'}}>{getStressIcon(member.stressLevel)}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* COLUNA DIREITA */}
        <div className="sidebarColumn">
            <div className="dashboardSectionGlass">
                <div className="sectionHeader"><h2><FaPen style={{marginRight:'8px', color: 'var(--primary-color)'}}/> Diário de Turno</h2></div>
                <textarea className="inputModern" placeholder="Registrar ocorrência..." style={{minHeight: '120px', borderRadius: '15px', padding: '10px', fontSize: '0.9rem', resize:'none'}}></textarea>
                <button className="btnNewChecklist" style={{marginTop: '10px', width: '100%', justifyContent: 'center', fontSize: '0.9rem'}}>Salvar Registro</button>
            </div>

            <div className="dashboardSectionGlass">
                <div className="sectionHeader">
                    <h2><FaBell style={{color: '#f59e0b', marginRight: '8px'}}/> Prioridades</h2>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
                    {recentAlerts.map(alert => (
                        <div key={alert.id} className={`alertCardGlass priority-${alert.severity}`} style={{margin: 0}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '4px'}}>
                                <strong style={{fontSize: '0.75rem', textTransform:'uppercase', opacity:0.8}}>{alert.type}</strong>
                                <span style={{fontSize: '0.7rem', opacity: 0.6}}>{alert.time}</span>
                            </div>
                            <p style={{fontSize: '0.85rem', margin: 0, lineHeight: 1.3}}>{alert.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );

  // --- RENDERIZAÇÃO PRINCIPAL ---
  return (
    <div className="checklistPageModern">
      <title>Safely | Painel do Gestor</title>
      
      {/* Estilos de Impressão */}
      <style>{`@media print { .btnNewChecklist, .headerModern, .bottom-nav, .filterPills { display: none !important; } .checklistPageModern { padding: 0; } }`}</style>

      {/* --- BRIEFING DO TURNO (CENTRAL DE COMANDO) --- */}
      <div className="welcomeBannerGlass" style={{padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
          <div>
              <h1 style={{fontSize: '1.8rem', margin: 0}}>Central de Comando EHS</h1>
              <p style={{opacity: 0.9, margin: 0}}>Gestor: <strong>Ricardo Oliveira</strong> • Turno A (06:00 - 14:00)</p>
          </div>
          <div style={{display: 'flex', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '16px', backdropFilter: 'blur(5px)'}}>
              <div style={{textAlign: 'center'}}>
                  <FaSun style={{fontSize: '1.5rem', color: '#fbbf24', marginBottom: '5px'}}/>
                  <span style={{display: 'block', fontSize: '0.8rem', fontWeight: '600'}}>28°C / Ensolarado</span>
              </div>
              <div style={{width: '1px', height: '30px', background: 'rgba(255,255,255,0.3)'}}></div>
              <div style={{textAlign: 'center'}}>
                  <strong style={{fontSize: '1.2rem', display: 'block', lineHeight: 1}}>32/32</strong>
                  <span style={{fontSize: '0.7rem', opacity: 0.8}}>Presentes</span>
              </div>
              <div style={{textAlign: 'center'}}>
                  <strong style={{fontSize: '1.2rem', display: 'block', lineHeight: 1, color: '#f87171'}}>2</strong>
                  <span style={{fontSize: '0.7rem', opacity: 0.8}}>Alertas</span>
              </div>
          </div>
      </div>

      {/* Navegação e Ações */}
      <div className="pageHeaderModern" style={{alignItems: 'center', marginTop: '-1rem'}}>
        <div className="filterPills" style={{background: 'var(--glass-border)', padding: '5px', borderRadius: '50px'}}>
            <button 
                className={`filterBtnPill ${activeTab === 'team' ? 'active' : ''}`} 
                onClick={() => setActiveTab('team')}
                style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.5rem'}}
            >
                <FaUsers /> Monitoramento de Equipe
            </button>
            <button 
                className={`filterBtnPill ${activeTab === 'indicators' ? 'active' : ''}`} 
                onClick={() => setActiveTab('indicators')}
                style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.5rem'}}
            >
                <FaChartPie /> Indicadores Globais
            </button>
        </div>

        <div style={{display: 'flex', gap: '10px'}}>
          <button onClick={handleExportJSON} className="btnNewChecklist" style={{background:'transparent', color:'var(--primary-color)', border:'1px solid var(--primary-color)'}}>
            <FaFileExport/> JSON
          </button>
          <button onClick={() => window.print()} className="btnNewChecklist">
            <FaFilePdf/> PDF
          </button>
        </div>
      </div>

      {/* Conteúdo Dinâmico */}
      {activeTab === 'indicators' ? renderIndicatorsView() : renderTeamView()}

    </div>
  );
}

export default ManagerDashboard;