import React from 'react';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, 
  ArcElement, PointElement, LineElement, RadialLinearScale, Filler, Defaults
} from 'chart.js';
import { 
  FaUsers, FaClock, FaCheckCircle, FaExclamationTriangle, FaCertificate, FaHeartbeat, 
  FaArrowUp, FaArrowDown, FaFilePdf, FaFileExport, FaChartBar, FaChartPie,
  FaShieldAlt, FaGraduationCap, FaBolt, FaTools, FaChartLine, FaNetworkWired, FaMapMarkedAlt
} from 'react-icons/fa';
import { topPerformers, recentIncidents } from '../data/mockData';
import './Pages.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, RadialLinearScale, Filler);

// Configura cor padrão do texto dos gráficos para ser legível no escuro e no claro (Cinza Médio-Claro)
ChartJS.defaults.color = '#94a3b8'; 
ChartJS.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';

function ManagerDashboard({ checklists }) {
  // Dados Mockados (Mantidos iguais)
  const kpiData = { avgResponseTime: 2.3, auditsCompleted: 47, nonConformities: 8, activeCertifications: 142, participationRate: 96, severityIndex: 0.12, daysWithoutAccidents: 365, trainingHours: 1250, nearMisses: 15, maintenanceRate: 98 };
  const heatmapPoints = [{ x: 20, y: 30, value: 'high', label: 'Extrusão' }, { x: 50, y: 50, value: 'medium', label: 'Montagem' }, { x: 80, y: 20, value: 'low', label: 'Expedição' }, { x: 30, y: 70, value: 'high', label: 'Caldeira' }];

  // Gráficos
  const engagementData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [{ label: 'Pontos', data: [650, 590, 800, 810], backgroundColor: 'rgba(56, 189, 248, 0.6)', borderRadius: 8 }] // Usei azul mais claro
  };

  const incidentTrendData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      { label: 'Taxa', data: [2.5, 2.0, 1.8, 1.5, 0.8, 0.5], borderColor: '#4ade80', backgroundColor: 'rgba(74, 222, 128, 0.2)', tension: 0.4, fill: true },
      { label: 'Meta', data: [2.0, 2.0, 2.0, 2.0, 2.0, 2.0], borderColor: '#f87171', borderDash: [5, 5], tension: 0 }
    ]
  };

  const nonConformanceData = {
    labels: ['EPIs', 'Vazamentos', 'Obstrução', 'Elétrica', 'Outros'],
    datasets: [{ data: [12, 19, 3, 5, 2], backgroundColor: ['#ef5350', '#ffa726', '#ff7043', '#7e57c2', '#bdbdbd'], borderWidth: 0 }]
  };

  const safetyCultureData = {
    labels: ['Liderança', 'Procedimentos', 'EPIs', 'Comunicação', 'Relatos', 'Treino'],
    datasets: [
      { label: 'Atual', data: [85, 90, 95, 75, 80, 88], backgroundColor: 'rgba(56, 189, 248, 0.2)', borderColor: '#38bdf8', borderWidth: 2 },
      { label: 'Meta', data: [90, 90, 90, 90, 90, 90], borderColor: 'rgba(255,255,255,0.3)', borderDash: [3, 3], borderWidth: 1 }
    ],
  };

  // Opções com Cores Ajustadas
  const commonOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { x: { grid: { display: false }, ticks: { color: '#94a3b8' } }, y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } } }
  };

  const doughnutOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'right', labels: { usePointStyle: true, color: '#94a3b8', font: { family: 'Inter' } } } },
    elements: { arc: { borderWidth: 0 } } // Remove bordas brancas
  };

  const radarOptions = {
    responsive: true, maintainAspectRatio: false,
    scales: { r: { angleLines: { color: 'rgba(255,255,255,0.1)' }, grid: { color: 'rgba(255,255,255,0.1)' }, pointLabels: { color: '#cbd5e1', font: { family: 'Poppins', size: 11 } }, ticks: { backdropColor: 'transparent', color: '#94a3b8' } } },
    plugins: { legend: { labels: { color: '#cbd5e1' } } }
  };

  // Helpers
  const getInitials = (n) => n.split(' ').map((p,i,a)=> i===0||i===a.length-1?p[0]:'').join('').toUpperCase();
  const getStatusPillClass = (s) => (s==='Resolvido'||s==='Baixa'?'statusBadgePill completed':(s==='Em análise'||s==='Média'?'statusBadgePill pending':'statusBadgePill'));

  return (
    <div className="checklistPageModern">
      <title>Safely | Painel do Gestor</title>
      <div className="pageHeaderModern">
        <div><h1>Painel de Gestão EHS</h1><p>Visão geral de segurança e indicadores.</p></div>
        <div style={{display: 'flex', gap: '10px'}}>
          <button className="btnNewChecklist" style={{background:'transparent', color:'var(--primary-color)', border:'1px solid var(--primary-color)'}}><FaFileExport/> Exportar</button>
          <button className="btnNewChecklist"><FaFilePdf/> Imprimir</button>
        </div>
      </div>

      {/* Grid KPIs */}
      <div className="kpiGridModern">
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(74, 222, 128, 0.2)', color:'#4ade80'}}><FaShieldAlt/></div><span className="trendPill positive"><FaArrowUp/> Recorde</span></div><span className="kpiValue">{kpiData.daysWithoutAccidents}</span><span className="kpiLabel">Dias Sem Acidentes</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass iconTime"><FaClock/></div><span className="trendPill positive"><FaArrowDown/> -0.8h</span></div><span className="kpiValue">{kpiData.avgResponseTime}h</span><span className="kpiLabel">Tempo Resposta</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass" style={{background:'rgba(251, 146, 60, 0.2)', color:'#fb923c'}}><FaBolt/></div><span className="trendPill positive"><FaArrowUp/> +5</span></div><span className="kpiValue">{kpiData.nearMisses}</span><span className="kpiLabel">Quase Acidentes</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass iconAudit"><FaCheckCircle/></div><span className="trendPill positive"><FaArrowUp/> +12</span></div><span className="kpiValue">{kpiData.auditsCompleted}</span><span className="kpiLabel">Auditorias</span></div>
        <div className="kpiCardGlass"><div className="kpiHeader"><div className="kpiIconGlass iconAlert"><FaExclamationTriangle/></div><span className="trendPill positive"><FaArrowDown/> -5</span></div><span className="kpiValue">{kpiData.nonConformities}</span><span className="kpiLabel">Não Conformidades</span></div>
      </div>

      {/* Gráficos */}
      <div className="chartsGridModern">
        <div className="chartSectionGlass"><div className="sectionTitleGlass"><FaChartBar/> Engajamento</div><div style={{height:'250px'}}><Bar options={commonOptions} data={engagementData}/></div></div>
        <div className="chartSectionGlass"><div className="sectionTitleGlass"><FaChartLine/> Taxa de Frequência</div><div style={{height:'250px'}}><Line options={commonOptions} data={incidentTrendData}/></div></div>
        <div className="chartSectionGlass"><div className="sectionTitleGlass"><FaChartPie/> Tipos de Ocorrência</div><div style={{height:'250px', display:'flex', justifyContent:'center'}}><Doughnut options={doughnutOptions} data={nonConformanceData}/></div></div>
        <div className="chartSectionGlass"><div className="sectionTitleGlass"><FaNetworkWired/> Cultura de Segurança</div><div style={{height:'250px'}}><Radar options={radarOptions} data={safetyCultureData}/></div></div>
        
        {/* Mapa de Calor */}
        <div className="chartSectionGlass" style={{gridColumn:'1 / -1'}}>
            <div className="sectionTitleGlass"><FaMapMarkedAlt/> Mapa de Calor</div>
            <div style={{position:'relative', width:'100%', height:'350px', background:'#334155', borderRadius:'16px', overflow:'hidden'}}>
                <div style={{width:'100%', height:'100%', opacity: 0.1, background:'repeating-linear-gradient(45deg, #000, #000 10px, #222 10px, #222 20px)'}}></div>
                {heatmapPoints.map((p,i)=>(<div key={i} style={{position:'absolute', left:`${p.x}%`, top:`${p.y}%`, width:'40px', height:'40px', borderRadius:'50%', background: p.value==='high'?'rgba(239, 68, 68, 0.6)':'rgba(234, 179, 8, 0.6)', boxShadow:'0 0 15px 5px rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold', cursor:'pointer', transform:'translate(-50%,-50%)'}}>!</div>))}
                <div style={{position:'absolute', bottom:10, left:10, background:'rgba(0,0,0,0.6)', color:'white', padding:'5px 10px', borderRadius:'8px', fontSize:'0.8rem'}}>Legenda: 🔴 Crítico 🟠 Atenção</div>
            </div>
        </div>
      </div>

      {/* Tabelas */}
      <div className="detailsGridModern">
        <div className="glassTableContainer"><div className="glassTableHeader"><h2>Top Performers</h2></div><div className="modernList">{topPerformers.map(u=>(<div key={u.id} className="modernListItem"><div className="performerInfo"><div className="avatarInitials" style={{backgroundColor:u.avatarColor}}>{getInitials(u.name)}</div><div className="infoText"><span className="nameText">{u.name}</span><span className="roleText">{u.role}</span></div></div><div className="scorePill">{u.score} pts</div></div>))}</div></div>
        <div className="glassTableContainer"><div className="glassTableHeader"><h2>Incidentes Recentes</h2></div><div className="modernList">{recentIncidents.map(i=>(<div key={i.id} className="modernListItem"><div className="infoText"><span className="nameText">{i.type}</span><span className="roleText">{i.date} • {i.location}</span></div><span className={getStatusPillClass(i.severity)}>{i.severity}</span></div>))}</div></div>
      </div>
    </div>
  );
}
export default ManagerDashboard;