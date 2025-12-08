import React, { useState } from 'react';
import { Bar, Doughnut, Line, Radar, PolarArea } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, 
  ArcElement, PointElement, LineElement, RadialLinearScale, Filler 
} from 'chart.js';
import { 
  FaUsers, FaClock, FaCheckCircle, FaExclamationTriangle, 
  FaArrowUp, FaArrowDown, FaFilePdf, FaFileExport, FaChartBar, FaChartPie,
  FaShieldAlt, FaGraduationCap, FaBolt, FaTools, FaChartLine, FaNetworkWired, FaMapMarkedAlt,
  FaMoneyBillWave, FaClipboardCheck, FaUserTie, FaBrain, FaSearch, FaEllipsisV, 
  FaBell, FaPen, FaCalendarAlt, FaSun, FaBatteryFull, FaBatteryQuarter, FaBatteryHalf, 
  FaHandHoldingUsd, FaRecycle, FaLeaf, FaTint, FaUserMd, FaIndustry, FaTruckLoading,
  FaGavel, FaMicrochip, FaTruck, FaFilter, FaSmile, FaBalanceScale, FaGasPump, FaFireExtinguisher,
  FaUserClock, FaUserInjured, FaIdCard
} from 'react-icons/fa';
import { topPerformers, recentIncidents } from '../data/mockData';
import './Pages.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale, Filler);
ChartJS.defaults.color = '#94a3b8'; 
ChartJS.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('indicators');
  const [searchTerm, setSearchTerm] = useState('');
  
  // ESTADOS DE FILTRO
  const [kpiFilter, setKpiFilter] = useState('all');
  const [chartFilter, setChartFilter] = useState('all');

  // ==========================================
  // 1. DADOS: LISTA MESTRA DE INDICADORES (KPIs)
  // ==========================================
  const allKpis = [
    // SEGURANÇA
    { id: 1, category: 'safety', label: 'Dias Sem Acidentes', value: '365', icon: <FaShieldAlt/>, color: '#4ade80', bg: 'rgba(74, 222, 128, 0.2)', trend: 'Recorde', isPositive: true },
    { id: 2, category: 'safety', label: 'Quase Acidentes', value: '15', icon: <FaBolt/>, color: '#fb923c', bg: 'rgba(251, 146, 60, 0.2)', trend: '+5', isPositive: true },
    { id: 3, category: 'safety', label: 'Índice Gravidade', value: '0.12', icon: <FaUserMd/>, color: '#f87171', bg: 'rgba(248, 113, 113, 0.2)', trend: '-0.02', isPositive: true },
    { id: 21, category: 'safety', label: 'Extintores Vencidos', value: '0', icon: <FaFireExtinguisher/>, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.2)', trend: 'Ok', isPositive: true },

    // FINANCEIRO
    { id: 4, category: 'finance', label: 'ROI em Segurança', value: '320%', icon: <FaHandHoldingUsd/>, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.2)', trend: '+15%', isPositive: true },
    { id: 5, category: 'finance', label: 'Custo Evitado', value: 'R$ 45k', icon: <FaMoneyBillWave/>, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.2)', trend: 'Est.', isPositive: true },
    
    // OPERACIONAL
    { id: 6, category: 'ops', label: 'Não Conformidades', value: '8', icon: <FaExclamationTriangle/>, color: '#f87171', bg: 'rgba(248, 113, 113, 0.2)', trend: '-5', isPositive: true },
    { id: 7, category: 'ops', label: 'Auditorias', value: '47', icon: <FaCheckCircle/>, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.2)', trend: '+12', isPositive: true },
    { id: 8, category: 'ops', label: 'Tempo Resposta', value: '2.3h', icon: <FaClock/>, color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.2)', trend: '-0.8h', isPositive: true },
    { id: 9, category: 'ops', label: 'Ações Fechadas', value: '92%', icon: <FaClipboardCheck/>, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.2)', trend: 'Alta', isPositive: true },
    { id: 17, category: 'ops', label: 'Manutenção Prev.', value: '98%', icon: <FaTools/>, color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.2)', trend: 'Meta', isPositive: true },
    { id: 19, category: 'ops', label: 'Sensores IoT Ativos', value: '54/55', icon: <FaMicrochip/>, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.2)', trend: 'Online', isPositive: true },

    // PESSOAS
    { id: 10, category: 'people', label: 'Absenteísmo', value: '1.8%', icon: <FaUserTie/>, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.2)', trend: '+0.2%', isPositive: false },
    { id: 11, category: 'people', label: 'Total Colaboradores', value: '320', icon: <FaUsers/>, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.2)', trend: 'Estável', isPositive: true },
    { id: 12, category: 'people', label: 'Horas Treino', value: '1250h', icon: <FaGraduationCap/>, color: '#22c55e', bg: 'rgba(255, 255, 255, 0.1)', trend: '+120h', isPositive: true },
    { id: 13, category: 'people', label: 'Retenção Conhec.', value: '88%', icon: <FaBrain/>, color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.2)', trend: '+5%', isPositive: true },
    { id: 22, category: 'people', label: 'Satisfação Interna', value: '4.8/5', icon: <FaSmile/>, color: '#f472b6', bg: 'rgba(244, 114, 182, 0.2)', trend: 'eNPS', isPositive: true },

    // SUSTENTABILIDADE
    { id: 14, category: 'eco', label: 'Resíduos Reciclados', value: '850kg', icon: <FaRecycle/>, color: '#10b981', bg: 'rgba(16, 185, 129, 0.2)', trend: '+120kg', isPositive: true },
    { id: 15, category: 'eco', label: 'Água Economizada', value: '12k L', icon: <FaTint/>, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.2)', trend: '-5%', isPositive: true },
    { id: 16, category: 'eco', label: 'Pegada Carbono', value: '4.2t', icon: <FaIndustry/>, color: '#6b7280', bg: 'rgba(107, 114, 128, 0.2)', trend: '-2%', isPositive: true },

    // LEGAL & TERCEIROS
    { id: 18, category: 'legal', label: 'Conformidade NR-12', value: '99%', icon: <FaGavel/>, color: '#eab308', bg: 'rgba(234, 179, 8, 0.2)', trend: 'Auditado', isPositive: true },
    { id: 20, category: 'legal', label: 'Terceiros Treinados', value: '150', icon: <FaTruck/>, color: '#f97316', bg: 'rgba(249, 115, 22, 0.2)', trend: 'Hoje', isPositive: true },
    { id: 23, category: 'legal', label: 'Multas Trabalhistas', value: '0', icon: <FaBalanceScale/>, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.2)', trend: 'Ano', isPositive: true },
    { id: 24, category: 'ops', label: 'Consumo Frota', value: '2.5k L', icon: <FaGasPump/>, color: '#64748b', bg: 'rgba(100, 116, 139, 0.2)', trend: '-10%', isPositive: true },
  ];

  const filterCategories = [
    { id: 'all', label: 'Todos' }, { id: 'safety', label: 'Segurança' }, { id: 'people', label: 'Pessoas' },
    { id: 'ops', label: 'Operacional' }, { id: 'finance', label: 'Financeiro' }, { id: 'eco', label: 'Sustentabilidade' },
    { id: 'legal', label: 'Legal/Compliance' },
  ];

  const filteredKpis = kpiFilter === 'all' ? allKpis : allKpis.filter(k => k.category === kpiFilter);

  // ==========================================
  // 2. GRÁFICOS (Dados e Opções)
  // ==========================================
  const mixedChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      { type: 'bar', label: 'Inspeções', data: [40, 45, 50, 65, 70, 80], backgroundColor: 'rgba(56, 189, 248, 0.5)', borderRadius: 4, yAxisID: 'y' },
      { type: 'line', label: 'Incidentes', data: [5, 4, 3, 2, 1, 0], borderColor: '#ef4444', borderWidth: 2, tension: 0.4, yAxisID: 'y1' }
    ]
  };
  const mixedChartOptions = { responsive: true, maintainAspectRatio: false, scales: { y: { type: 'linear', display: true, position: 'left' }, y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false } } } };

  const wasteData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{ label: 'Reciclado (kg)', data: [500, 600, 750, 800, 850, 900], borderColor: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.2)', fill: true }, { label: 'Descarte (kg)', data: [400, 350, 300, 250, 200, 150], borderColor: '#94a3b8', backgroundColor: 'rgba(148, 163, 184, 0.2)', fill: true }]
  };

  const bodyPartData = {
    labels: ['Mãos/Dedos', 'Olhos', 'Pés', 'Costas', 'Cabeça'],
    datasets: [{ label: 'Ocorrências', data: [12, 5, 3, 8, 1], backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'], borderWidth: 1 }]
  };

  const trainingEvolutionData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{ label: 'Realizados', data: [10, 15, 25, 40, 45, 60], borderColor: '#38bdf8', tension: 0.4 }, { label: 'Agendados', data: [12, 20, 30, 45, 50, 70], borderColor: '#94a3b8', borderDash: [5, 5], tension: 0.4 }]
  };

  const shiftData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [{ label: 'Turno A', data: [1, 0, 1, 0], backgroundColor: '#38bdf8' }, { label: 'Turno B', data: [2, 1, 0, 0], backgroundColor: '#818cf8' }, { label: 'Turno C', data: [0, 1, 0, 0], backgroundColor: '#c084fc' }]
  };
  
  const trainingByDeptData = {
    labels: ['Manutenção', 'Produção', 'Logística', 'Qualidade', 'Adm'],
    datasets: [{ label: '% Concluído', data: [98, 85, 70, 95, 60], backgroundColor: ['#a78bfa', '#f472b6', '#fbbf24', '#34d399', '#94a3b8'], borderRadius: 4 }]
  };

  const safetyCultureData = {
    labels: ['Liderança', 'Procedimentos', 'EPIs', 'Comunicação', 'Relatos', 'Treino'],
    datasets: [{ label: 'Atual', data: [85, 90, 95, 75, 80, 88], backgroundColor: 'rgba(56, 189, 248, 0.2)', borderColor: '#38bdf8', borderWidth: 2 }]
  };

  const nonConformanceData = {
    labels: ['EPIs', 'Vazamentos', 'Obstrução', 'Elétrica', 'Outros'],
    datasets: [{ data: [12, 19, 3, 5, 2], backgroundColor: ['#ef5350', '#ffa726', '#ff7043', '#7e57c2', '#bdbdbd'], borderWidth: 0 }]
  };

  const heatmapPoints = [{ x: 20, y: 30, value: 'high' }, { x: 50, y: 50, value: 'medium' }, { x: 80, y: 20, value: 'low' }, { x: 30, y: 70, value: 'high' }];

  const allCharts = [
    { id: 'mixed', category: 'safety', title: 'Correlação: Inspeções x Incidentes', component: <Bar data={mixedChartData} options={{...mixedChartOptions, maintainAspectRatio: false}} />, colSpan: true },
    { id: 'waste', category: 'eco', title: 'Gestão de Resíduos (kg)', component: <Line data={wasteData} options={{responsive:true, maintainAspectRatio:false}} /> },
    { id: 'body', category: 'safety', title: 'Lesões por Parte do Corpo', component: <PolarArea data={bodyPartData} options={{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'right'}}}} /> },
    { id: 'trainEvo', category: 'people', title: 'Evolução de Treinamentos', component: <Line data={trainingEvolutionData} options={{responsive:true, maintainAspectRatio:false}} /> },
    { id: 'shift', category: 'ops', title: 'Ocorrências por Turno', component: <Bar data={shiftData} options={{responsive:true, maintainAspectRatio:false, scales:{x:{stacked:true},y:{stacked:true}}}} /> },
    { id: 'dept', category: 'people', title: 'Capacitação por Setor', component: <Bar data={trainingByDeptData} options={{indexAxis:'y', responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}}} /> },
    { id: 'culture', category: 'people', title: 'Cultura de Segurança', component: <Radar options={{responsive:true, maintainAspectRatio:false, scales:{r:{ticks:{backdropColor:'transparent'}}}}} data={safetyCultureData} /> },
    { id: 'types', category: 'safety', title: 'Tipos de Ocorrência', component: <Doughnut options={{responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'right'}}}} data={nonConformanceData} /> },
  ];

  const filteredCharts = chartFilter === 'all' ? allCharts : allCharts.filter(c => c.category === chartFilter || (chartFilter === 'ops' && c.category === 'tech'));

  // ==========================================
  // 3. DADOS EQUIPE (EXPANDIDO)
  // ==========================================
  const teamMembers = [
    { id: 1, name: 'Carlos Silva', role: 'Operador Líder', status: 'ok', pendingTasks: 0, safetyScore: 98, lastActivity: 'Checklist Extrusora (10min)', avatarColor: '#005A9C', trainingProgress: 100, stressLevel: 'low', skills: ['NR-35', 'CIPA'] },
    { id: 2, name: 'Ana Souza', role: 'Soldadora', status: 'warning', pendingTasks: 2, safetyScore: 75, lastActivity: 'Treinamento Altura', avatarColor: '#E91E63', trainingProgress: 60, stressLevel: 'medium', skills: ['NR-10'] },
    { id: 3, name: 'Roberto Firmino', role: 'Logística', status: 'danger', pendingTasks: 4, safetyScore: 45, lastActivity: 'Ausente (Atestado)', avatarColor: '#FF9800', trainingProgress: 30, stressLevel: 'high', skills: [] },
    { id: 4, name: 'Julia Roberts', role: 'Qualidade', status: 'ok', pendingTasks: 0, safetyScore: 100, lastActivity: 'Auditoria Setor B', avatarColor: '#4CAF50', trainingProgress: 95, stressLevel: 'low', skills: ['Auditora'] },
    { id: 5, name: 'Marcos Paulo', role: 'Manutenção', status: 'ok', pendingTasks: 1, safetyScore: 92, lastActivity: 'OS #992', avatarColor: '#9C27B0', trainingProgress: 80, stressLevel: 'low', skills: ['Elétrica'] },
    { id: 6, name: 'Pedro Santos', role: 'Aprendiz', status: 'ok', pendingTasks: 0, safetyScore: 88, lastActivity: 'Quiz Segurança', avatarColor: '#607d8b', trainingProgress: 40, stressLevel: 'medium', skills: [] },
    { id: 7, name: 'Mariana Costa', role: 'Eng. Segurança', status: 'ok', pendingTasks: 0, safetyScore: 100, lastActivity: 'Análise de Risco', avatarColor: '#2e7d32', trainingProgress: 100, stressLevel: 'high', skills: ['SESMT'] },
    { id: 8, name: 'Lucas Pereira', role: 'Operador', status: 'warning', pendingTasks: 1, safetyScore: 78, lastActivity: 'Entrada Turno', avatarColor: '#795548', trainingProgress: 70, stressLevel: 'medium', skills: ['Empilhadeira'] },
    { id: 9, name: 'Fernanda Lima', role: 'Analista', status: 'ok', pendingTasks: 0, safetyScore: 96, lastActivity: 'Relatório Mensal', avatarColor: '#f06292', trainingProgress: 90, stressLevel: 'low', skills: [] },
    { id: 10, name: 'Bruno Alves', role: 'Eletricista', status: 'danger', pendingTasks: 3, safetyScore: 60, lastActivity: 'Checklist Painel', avatarColor: '#673ab7', trainingProgress: 50, stressLevel: 'low', skills: ['NR-10'] },
    { id: 11, name: 'Camila Rocha', role: 'Logística', status: 'ok', pendingTasks: 0, safetyScore: 94, lastActivity: 'Conferência Carga', avatarColor: '#00bcd4', trainingProgress: 85, stressLevel: 'medium', skills: ['Movimentação'] },
    { id: 12, name: 'Ricardo Gomes', role: 'Supervisor', status: 'ok', pendingTasks: 0, safetyScore: 100, lastActivity: 'Reunião Diária', avatarColor: '#3f51b5', trainingProgress: 100, stressLevel: 'high', skills: ['Liderança'] },
  ];

  const recentAlerts = [
    { id: 1, type: 'incident', message: 'Relato de quase acidente na Área B', time: '10 min atrás', severity: 'high' },
    { id: 2, type: 'task', message: '3 Checklists de Pré-uso atrasados', time: '1 hora atrás', severity: 'medium' },
  ];

  const expiringCerts = [
    { id: 1, name: 'Bruno Alves', cert: 'NR-10', days: 2 },
    { id: 2, name: 'Lucas Pereira', cert: 'Operador Empilhadeira', days: 5 },
    { id: 3, name: 'Roberto Firmino', cert: 'NR-35', days: 10 },
  ];

  // --- FUNÇÕES ---
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allKpis));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "relatorio_gestao_ehs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  const getInitials = (n) => n.split(' ').map((p,i,a)=> i===0||i===a.length-1?p[0]:'').join('').toUpperCase();
  const getStatusColor = (s) => (s==='ok'?'#22c55e':s==='warning'?'#f59e0b':'#ef4444');
  const getStressIcon = (level) => {
      if(level === 'low') return <span title="Disposição Alta" style={{color:'#22c55e'}}><FaBatteryFull/></span>;
      if(level === 'medium') return <span title="Cansaço Moderado" style={{color:'#f59e0b'}}><FaBatteryHalf/></span>;
      return <span title="Fadiga Alta - Atenção!" style={{color:'#ef4444'}}><FaBatteryQuarter/></span>;
  };

  // --- RENDERIZAÇÃO: INDICADORES GLOBAIS ---
  const renderIndicatorsView = () => (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0 1rem 0', flexWrap: 'wrap', gap: '1rem'}}>
          <h3 style={{margin:0, color:'var(--text-color)', fontSize:'1.2rem', display:'flex', alignItems:'center', gap:'8px'}}>
              <FaChartBar /> KPIs Estratégicos
          </h3>
          <div className="filterPills" style={{background: 'var(--glass-border)', overflowX: 'auto', maxWidth: '100%'}}>
              {filterCategories.map(cat => (
                  <button key={cat.id} className={`filterBtnPill ${kpiFilter === cat.id ? 'active' : ''}`} onClick={() => setKpiFilter(cat.id)} style={{whiteSpace: 'nowrap'}}>
                    {cat.label}
                  </button>
              ))}
          </div>
      </div>
      
      <div className="kpiGridModern" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'}}>
        {filteredKpis.map(kpi => (
            <div key={kpi.id} className="kpiCardGlass" style={{animation: 'fadeIn 0.3s ease'}}>
                <div className="kpiHeader">
                    <div className="kpiIconGlass" style={{background: kpi.bg, color: kpi.color}}>{kpi.icon}</div>
                    <span className={`trendPill ${kpi.isPositive ? 'positive' : 'negative'}`}>{kpi.isPositive ? <FaArrowUp/> : <FaArrowDown/>} {kpi.trend}</span>
                </div>
                <span className="kpiValue">{kpi.value}</span>
                <span className="kpiLabel">{kpi.label}</span>
            </div>
        ))}
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '2rem 0 1rem 0', flexWrap: 'wrap', gap: '1rem'}}>
          <h3 style={{margin:0, color:'var(--text-color)', fontSize:'1.2rem'}}>Análise Gráfica</h3>
          <div className="filterPills" style={{background: 'var(--glass-border)', overflowX: 'auto', maxWidth: '100%'}}>
              <span style={{fontSize:'0.8rem', padding:'0.5rem', opacity:0.6}}><FaFilter/> Filtrar:</span>
              {filterCategories.slice(0, 5).map(cat => (
                  <button key={cat.id} className={`filterBtnPill ${chartFilter === cat.id ? 'active' : ''}`} onClick={() => setChartFilter(cat.id)} style={{whiteSpace: 'nowrap'}}>
                    {cat.label}
                  </button>
              ))}
          </div>
      </div>

      <div className="chartsGridModern" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'}}>
        {filteredCharts.map(chart => (
            <div key={chart.id} className="chartSectionGlass" style={{gridColumn: chart.colSpan ? '1 / -1' : 'auto', animation: 'fadeIn 0.4s ease'}}>
                <div className="sectionTitleGlass">{chart.title}</div>
                <div style={{height: chart.colSpan ? '300px' : '250px'}}>{chart.component}</div>
            </div>
        ))}
        
        {(chartFilter === 'all' || chartFilter === 'safety') && (
            <div className="chartSectionGlass" style={{gridColumn: '1 / -1'}}>
                <div className="sectionTitleGlass"><FaMapMarkedAlt/> Mapeamento de Áreas Críticas</div>
                <div style={{position:'relative', width:'100%', height:'350px', background:'#334155', borderRadius:'16px', overflow:'hidden'}}>
                    <div style={{width:'100%', height:'100%', opacity: 0.15, background:'repeating-linear-gradient(45deg, #000, #000 10px, #222 10px, #222 20px)'}}></div>
                    {heatmapPoints.map((p,i)=>(<div key={i} style={{position:'absolute', left:`${p.x}%`, top:`${p.y}%`, width:'40px', height:'40px', borderRadius:'50%', background: p.value==='high'?'rgba(239, 68, 68, 0.8)':'rgba(234, 179, 8, 0.8)', boxShadow:'0 0 15px 5px rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold', cursor:'pointer', transform:'translate(-50%,-50%)'}}>!</div>))}
                    <div style={{position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.6)', color:'white', padding:'5px 10px', borderRadius:'8px', fontSize:'0.7rem'}}>Plantas Industriais: Unidade 1 & 2</div>
                </div>
            </div>
        )}
      </div>
    </>
  );

  const renderTeamView = () => (
    <div className="dashboardGridModern" style={{gridTemplateColumns: '2.5fr 1fr'}}>
        <div className="mainColumn">
            
            {/* NOVO: Header de Status Rápido do Turno */}
            <div className="kpiGridModern" style={{gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '1.5rem'}}>
                <div className="kpiCardGlass" style={{padding: '1rem', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                    <div className="kpiIconGlass" style={{background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', width: '40px', height: '40px', fontSize: '1rem'}}><FaUsers/></div>
                    <div><span style={{fontSize:'1.2rem', fontWeight:'bold', display:'block'}}>32</span><span style={{fontSize:'0.7rem', opacity:0.7}}>Total</span></div>
                </div>
                <div className="kpiCardGlass" style={{padding: '1rem', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                    <div className="kpiIconGlass" style={{background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', width: '40px', height: '40px', fontSize: '1rem'}}><FaUserTie/></div>
                    <div><span style={{fontSize:'1.2rem', fontWeight:'bold', display:'block'}}>30</span><span style={{fontSize:'0.7rem', opacity:0.7}}>Presentes</span></div>
                </div>
                <div className="kpiCardGlass" style={{padding: '1rem', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                    <div className="kpiIconGlass" style={{background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', width: '40px', height: '40px', fontSize: '1rem'}}><FaUserInjured/></div>
                    <div><span style={{fontSize:'1.2rem', fontWeight:'bold', display:'block'}}>2</span><span style={{fontSize:'0.7rem', opacity:0.7}}>Afastados</span></div>
                </div>
                <div className="kpiCardGlass" style={{padding: '1rem', flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
                    <div className="kpiIconGlass" style={{background: 'rgba(251, 146, 60, 0.1)', color: '#fb923c', width: '40px', height: '40px', fontSize: '1rem'}}><FaExclamationTriangle/></div>
                    <div><span style={{fontSize:'1.2rem', fontWeight:'bold', display:'block'}}>3</span><span style={{fontSize:'0.7rem', opacity:0.7}}>Risco Crítico</span></div>
                </div>
            </div>

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
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                <div className="avatarInitials" style={{backgroundColor: member.avatarColor, width: '50px', height: '50px', fontSize:'1.1rem'}}>
                                    {getInitials(member.name)}
                                </div>
                                <div>
                                    <h3 style={{fontSize: '1.1rem', margin: 0}}>{member.name}</h3>
                                    <span style={{fontSize: '0.8rem', opacity: 0.7}}>{member.role}</span>
                                    <div style={{display:'flex', gap:'4px', marginTop:'4px', flexWrap: 'wrap'}}>
                                        {member.skills.map(skill => (
                                            <span key={skill} style={{fontSize:'0.65rem', background:'var(--glass-border)', padding:'2px 6px', borderRadius:'4px', color:'var(--text-secondary)'}}>{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button className="btnGhost" style={{padding: '5px', borderRadius: '50%'}}><FaEllipsisV /></button>
                        </div>
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
        
        {/* COLUNA LATERAL (Widgets Extras) */}
        <div className="sidebarColumn">
            <div className="dashboardSectionGlass">
                <div className="sectionHeader"><h2><FaPen style={{marginRight:'8px', color: 'var(--primary-color)'}}/> Diário de Turno</h2></div>
                <textarea className="inputModern" placeholder="Registrar ocorrência..." style={{minHeight: '120px', borderRadius: '15px', padding: '10px', fontSize: '0.9rem', resize:'none'}}></textarea>
                <button className="btnNewChecklist" style={{marginTop: '10px', width: '100%', justifyContent: 'center', fontSize: '0.9rem'}}>Salvar Registro</button>
            </div>
            
            <div className="dashboardSectionGlass">
                <div className="sectionHeader"><h2><FaBell style={{color: '#f59e0b', marginRight: '8px'}}/> Prioridades</h2></div>
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

            {/* NOVO WIDGET: VENCIMENTO DE CERTIFICAÇÕES */}
            <div className="dashboardSectionGlass">
                <div className="sectionHeader"><h2><FaIdCard style={{marginRight:'8px', color: '#f472b6'}}/> Vencimentos de NR</h2></div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    {expiringCerts.map(cert => (
                        <div key={cert.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.8rem', background:'var(--input-bg)', borderRadius:'10px', border:'1px solid var(--glass-border)'}}>
                            <div>
                                <strong style={{fontSize:'0.9rem', display:'block'}}>{cert.name}</strong>
                                <span style={{fontSize:'0.75rem', opacity:0.8}}>{cert.cert}</span>
                            </div>
                            <span style={{fontSize:'0.8rem', fontWeight:'bold', color: cert.days < 5 ? '#ef4444' : '#fbbf24'}}>
                                {cert.days} dias
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    </div>
  );

  return (
    <div className="checklistPageModern">
      <title>Safely | Painel do Gestor</title>
      <style>{`@media print { .btnNewChecklist, .headerModern, .bottom-nav, .filterPills { display: none !important; } .checklistPageModern { padding: 0; } }`}</style>

      <div className="welcomeBannerGlass" style={{padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
          <div>
              <h1 style={{fontSize: '1.8rem', margin: 0}}>Central de Comando EHS</h1>
              <p style={{opacity: 0.9, margin: 0}}>Gestor: <strong>Ricardo Oliveira</strong> • Turno A (06:00 - 14:00)</p>
          </div>
          <div style={{display: 'flex', gap: '2rem', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '10px 20px', borderRadius: '16px', backdropFilter: 'blur(5px)'}}>
              <div style={{textAlign: 'center'}}><FaSun style={{fontSize: '1.5rem', color: '#fbbf24', marginBottom: '5px'}}/><span style={{display: 'block', fontSize: '0.8rem', fontWeight: '600'}}>28°C / Sol</span></div>
              <div style={{width: '1px', height: '30px', background: 'rgba(255,255,255,0.3)'}}></div>
              <div style={{textAlign: 'center'}}><strong style={{fontSize: '1.2rem', display: 'block', lineHeight: 1}}>32/32</strong><span style={{fontSize: '0.7rem', opacity: 0.8}}>Presentes</span></div>
              <div style={{textAlign: 'center'}}><strong style={{fontSize: '1.2rem', display: 'block', lineHeight: 1, color: '#f87171'}}>2</strong><span style={{fontSize: '0.7rem', opacity: 0.8}}>Alertas</span></div>
          </div>
      </div>

      <div className="pageHeaderModern" style={{alignItems: 'center', marginTop: '-1rem'}}>
        <div className="filterPills" style={{background: 'var(--glass-border)', padding: '5px', borderRadius: '50px'}}>
            <button className={`filterBtnPill ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.5rem'}}><FaUsers /> Monitoramento</button>
            <button className={`filterBtnPill ${activeTab === 'indicators' ? 'active' : ''}`} onClick={() => setActiveTab('indicators')} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.5rem'}}><FaChartPie /> Indicadores</button>
        </div>
        <div style={{display: 'flex', gap: '10px'}}>
          <button onClick={handleExportJSON} className="btnNewChecklist" style={{background:'transparent', color:'var(--primary-color)', border:'1px solid var(--primary-color)'}}><FaFileExport/> JSON</button>
          <button onClick={() => window.print()} className="btnNewChecklist"><FaFilePdf/> PDF</button>
        </div>
      </div>

      {activeTab === 'indicators' ? renderIndicatorsView() : renderTeamView()}
    </div>
  );
}

export default ManagerDashboard;