import React from 'react';
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { 
  FaUsers, FaClock, FaCheckCircle, FaExclamationTriangle, 
  FaCertificate, FaHeartbeat, FaArrowUp, FaArrowDown, 
  FaFilePdf, FaFileExport, FaChartBar, FaChartPie,
  FaShieldAlt, FaGraduationCap, FaBolt, FaTools, FaChartLine, FaNetworkWired
} from 'react-icons/fa';
import { topPerformers, recentIncidents } from '../data/mockData';

// Importa o CSS Moderno
import './Pages.css';

// Registra TODOS os componentes necessários do ChartJS
ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement,
  PointElement, LineElement, RadialLinearScale, Filler
);

function ManagerDashboard({ checklists }) {
  // --- DADOS SIMULADOS (KPIs) ---
  const kpiData = {
    avgResponseTime: 2.3,
    auditsCompleted: 47,
    nonConformities: 8,
    activeCertifications: 142,
    participationRate: 96,
    severityIndex: 0.12,
    // Novos KPIs
    daysWithoutAccidents: 365,
    trainingHours: 1250,
    nearMisses: 15, // Quase acidentes (reportados proativamente)
    maintenanceRate: 98 // % de manutenção preventiva em dia
  };

  // --- DADOS DOS GRÁFICOS ---
  
  // 1. Barras (Existente)
  const engagementData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [{
      label: 'Pontos',
      data: [650, 590, 800, 810],
      backgroundColor: 'rgba(0, 90, 156, 0.7)',
      borderRadius: 8,
    }],
  };

  // 2. Rosca (Existente)
  const nonConformanceData = {
    labels: ['EPIs', 'Vazamentos', 'Obstrução', 'Elétrica', 'Outros'],
    datasets: [{
      data: [12, 19, 3, 5, 2],
      backgroundColor: ['#ef5350', '#ffa726', '#ff7043', '#7e57c2', '#bdbdbd'],
      borderWidth: 0,
    }],
  };

  // 3. Linha (NOVO): Tendência de Incidentes vs Meta
  const incidentTrendData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Taxa de Frequência',
        data: [2.5, 2.0, 1.8, 1.5, 0.8, 0.5],
        borderColor: '#2e7d32', // Verde
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        tension: 0.4, // Curva suave
        fill: true,
      },
      {
        label: 'Limite Aceitável',
        data: [2.0, 2.0, 2.0, 2.0, 2.0, 2.0],
        borderColor: '#c62828', // Vermelho
        borderDash: [5, 5], // Linha tracejada
        tension: 0,
        fill: false,
      }
    ]
  };

  // 4. Radar (NOVO): Cultura de Segurança
  const safetyCultureData = {
    labels: ['Liderança', 'Procedimentos', 'Uso de EPIs', 'Comunicação', 'Relatos', 'Treinamento'],
    datasets: [
      {
        label: 'Avaliação Atual',
        data: [85, 90, 95, 75, 80, 88],
        backgroundColor: 'rgba(0, 90, 156, 0.2)',
        borderColor: '#005A9C',
        borderWidth: 2,
      },
      {
        label: 'Meta',
        data: [90, 90, 90, 90, 90, 90],
        backgroundColor: 'transparent',
        borderColor: 'rgba(0,0,0,0.3)',
        borderDash: [3, 3],
        borderWidth: 1,
      }
    ],
  };

  // --- OPÇÕES DE GRÁFICOS ---
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' } }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right', labels: { usePointStyle: true, font: {family: 'Inter'} } } }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: 'rgba(0,0,0,0.1)' },
        grid: { color: 'rgba(0,0,0,0.1)' },
        pointLabels: { font: { family: 'Poppins', size: 11 } }
      }
    }
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return (names[0][0] + (names.length > 1 ? names[names.length - 1][0] : '')).toUpperCase();
  };

  const getStatusPillClass = (status) => {
    const s = status.toLowerCase();
    if (s === 'resolvido' || s === 'baixa') return 'statusBadgePill completed'; 
    if (s === 'em análise' || s === 'média') return 'statusBadgePill pending'; 
    return 'statusBadgePill'; 
  };

  const handleExportJSON = () => { alert("Exportando dados em JSON..."); };
  const handlePrintPDF = () => { window.print(); };

  return (
    <div className="checklistPageModern">
      <title>Safely | Painel do Gestor</title>

      {/* Header */}
      <div className="pageHeaderModern">
        <div>
           <h1>Painel de Gestão EHS</h1>
           <p style={{color: '#666', marginTop: '5px'}}>Visão geral de segurança, saúde e meio ambiente.</p>
        </div>
        
        <div style={{display: 'flex', gap: '10px'}}>
          <button className="btnNewChecklist" onClick={handleExportJSON} style={{background: 'white', color: '#005A9C', border: '1px solid #005A9C'}}>
            <FaFileExport /> Exportar
          </button>
          <button className="btnNewChecklist" onClick={handlePrintPDF}>
            <FaFilePdf /> Imprimir
          </button>
        </div>
      </div>

      {/* --- GRID DE KPIS (AGORA COM 10 CARDS) --- */}
      <div className="kpiGridModern">
        
        {/* KPI 1: Dias Sem Acidentes (NOVO) */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
            <div className="kpiIconGlass" style={{background: '#e8f5e9', color: '#2e7d32'}}><FaShieldAlt /></div>
            <span className="trendPill positive"><FaArrowUp size={10}/> Recorde</span>
          </div>
          <span className="kpiValue">{kpiData.daysWithoutAccidents}</span>
          <span className="kpiLabel">Dias Sem Acidentes</span>
          <span className="kpiSubtext">Meta: 400 dias</span>
        </div>

        {/* KPI 2: Tempo Resposta */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
            <div className="kpiIconGlass iconTime"><FaClock /></div>
            <span className="trendPill positive"><FaArrowDown size={10}/> -0.8h</span>
          </div>
          <span className="kpiValue">{kpiData.avgResponseTime}h</span>
          <span className="kpiLabel">Tempo de Resposta</span>
          <span className="kpiSubtext">Média semanal</span>
        </div>

        {/* KPI 3: Quase Acidentes (NOVO) */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass" style={{background: '#fff3e0', color: '#f57f17'}}><FaBolt /></div>
             <span className="trendPill positive"><FaArrowUp size={10}/> +5</span>
          </div>
          <span className="kpiValue">{kpiData.nearMisses}</span>
          <span className="kpiLabel">Quase Acidentes</span>
          <span className="kpiSubtext">Reportados (Proatividade)</span>
        </div>

        {/* KPI 4: Auditorias */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass iconAudit"><FaCheckCircle /></div>
             <span className="trendPill positive"><FaArrowUp size={10}/> +12</span>
          </div>
          <span className="kpiValue">{kpiData.auditsCompleted}</span>
          <span className="kpiLabel">Auditorias</span>
          <span className="kpiSubtext">Realizadas este mês</span>
        </div>

        {/* KPI 5: Não Conformidades */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass iconAlert"><FaExclamationTriangle /></div>
             <span className="trendPill positive"><FaArrowDown size={10}/> -5</span>
          </div>
          <span className="kpiValue">{kpiData.nonConformities}</span>
          <span className="kpiLabel">Não Conformidades</span>
          <span className="kpiSubtext">Pendentes de ação</span>
        </div>

        {/* KPI 6: Horas de Treinamento (NOVO) */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass" style={{background: '#e3f2fd', color: '#1976d2'}}><FaGraduationCap /></div>
             <span className="trendPill positive"><FaArrowUp size={10}/> +120h</span>
          </div>
          <span className="kpiValue">{kpiData.trainingHours}</span>
          <span className="kpiLabel">Horas Treinamento</span>
          <span className="kpiSubtext">Acumulado no ano</span>
        </div>

        {/* KPI 7: Manutenção Preventiva (NOVO) */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass" style={{background: '#f3e5f5', color: '#7b1fa2'}}><FaTools /></div>
             <span className="trendPill positive"><FaArrowUp size={10}/> 98%</span>
          </div>
          <span className="kpiValue">{kpiData.maintenanceRate}%</span>
          <span className="kpiLabel">Manutenção</span>
          <span className="kpiSubtext">Preventivas em dia</span>
        </div>

        {/* KPI 8: Certificações */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass iconCert"><FaCertificate /></div>
             <span className="trendPill positive"><FaArrowUp size={10}/> +18</span>
          </div>
          <span className="kpiValue">{kpiData.activeCertifications}</span>
          <span className="kpiLabel">Certificações</span>
          <span className="kpiSubtext">Colaboradores ativos</span>
        </div>

        {/* KPI 9: Participação */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass iconUsers"><FaUsers /></div>
             <span className="trendPill positive"><FaArrowUp size={10}/> +4%</span>
          </div>
          <span className="kpiValue">{kpiData.participationRate}%</span>
          <span className="kpiLabel">Engajamento</span>
          <span className="kpiSubtext">Taxa de participação</span>
        </div>

        {/* KPI 10: Gravidade */}
        <div className="kpiCardGlass">
           <div className="kpiHeader">
             <div className="kpiIconGlass iconAlert" style={{background: '#ffebee', color: '#b71c1c'}}><FaHeartbeat /></div>
             <span className="trendPill positive"><FaArrowDown size={10}/> -0.08</span>
           </div>
           <span className="kpiValue">{kpiData.severityIndex}</span>
           <span className="kpiLabel">Índice Gravidade</span>
           <span className="kpiSubtext">Por 1k horas</span>
        </div>
      </div>

      {/* --- GRÁFICOS EM GLASSMORPHISM (AGORA COM 4 GRÁFICOS) --- */}
      <div className="chartsGridModern">
        {/* Gráfico 1: Barras */}
        <div className="chartSectionGlass">
          <div className="sectionTitleGlass"><FaChartBar /> Engajamento (Gamificação)</div>
          <div style={{height: '250px'}}>
            <Bar options={commonOptions} data={engagementData} />
          </div>
        </div>

        {/* Gráfico 2: Linha (Tendência) */}
        <div className="chartSectionGlass">
          <div className="sectionTitleGlass"><FaChartLine /> Taxa de Frequência (Acidentes)</div>
          <div style={{height: '250px'}}>
            <Line options={commonOptions} data={incidentTrendData} />
          </div>
        </div>

        {/* Gráfico 3: Rosca (Tipos) */}
        <div className="chartSectionGlass">
          <div className="sectionTitleGlass"><FaChartPie /> Tipos de Ocorrências</div>
          <div style={{height: '250px', display: 'flex', justifyContent: 'center'}}>
            <Doughnut options={doughnutOptions} data={nonConformanceData} />
          </div>
        </div>

        {/* Gráfico 4: Radar (Cultura) */}
        <div className="chartSectionGlass">
          <div className="sectionTitleGlass"><FaNetworkWired /> Cultura de Segurança (360º)</div>
          <div style={{height: '250px'}}>
            <Radar options={radarOptions} data={safetyCultureData} />
          </div>
        </div>
      </div>

      {/* Tabelas de Detalhes */}
      <div className="detailsGridModern">
        
        {/* Tabela: Top Performers */}
        <div className="glassTableContainer">
          <div className="glassTableHeader">
            <h2>Top Performers</h2>
            <p>Colaboradores destaque em segurança</p>
          </div>
          <div className="modernList">
            {topPerformers.map(user => (
              <div key={user.id} className="modernListItem">
                <div className="performerInfo">
                  <div className="avatarInitials" style={{ backgroundColor: user.avatarColor || '#005A9C' }}>
                    {getInitials(user.name)}
                  </div>
                  <div className="infoText">
                    <span className="nameText">{user.name}</span>
                    <span className="roleText">{user.role}</span>
                  </div>
                </div>
                <div style={{textAlign: 'right'}}>
                   <div className="scorePill">{user.score} pts</div>
                   <span style={{fontSize: '0.75rem', color: '#999'}}>{user.trainings} cursos</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabela: Incidentes */}
        <div className="glassTableContainer">
          <div className="glassTableHeader">
            <h2>Incidentes Recentes</h2>
            <p>Últimas ocorrências registradas</p>
          </div>
          <div className="modernList">
            {recentIncidents.map(incident => (
              <div key={incident.id} className="modernListItem">
                <div className="infoText" style={{flex: 1}}>
                    <span className="nameText">{incident.type}</span>
                    <span className="roleText">{incident.date} • {incident.location}</span>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end'}}>
                    <span className={getStatusPillClass(incident.severity)} style={{fontSize: '0.7rem'}}>
                        {incident.severity}
                    </span>
                    <span style={{fontSize: '0.75rem', fontWeight: '500', color: '#555'}}>
                        {incident.status}
                    </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ManagerDashboard;