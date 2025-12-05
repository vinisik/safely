import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaUsers, FaClock, FaCheckCircle, FaExclamationTriangle, FaCertificate, FaHeartbeat, FaArrowUp, FaArrowDown, FaFilePdf, FaFileExport, FaChartBar, FaChartPie } from 'react-icons/fa';
import { topPerformers, recentIncidents } from '../data/mockData';

// Importa o CSS Moderno
import './Pages.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function ManagerDashboard({ checklists }) {
  // Cálculos (simulados)
  const nonConformities = 8;
  const participationRate = 96;
  const avgResponseTime = 2.3;
  const auditsCompleted = 47;
  const activeCertifications = 142;
  const severityIndex = 0.12;

  // Dados dos gráficos
  const engagementData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
    datasets: [{
      label: 'Pontos',
      data: [650, 590, 800, 810],
      backgroundColor: 'rgba(0, 90, 156, 0.7)',
      borderRadius: 8, // Bordas arredondadas nas barras
    }],
  };

  const nonConformanceData = {
    labels: ['EPIs', 'Vazamentos', 'Obstrução', 'Elétrica', 'Outros'],
    datasets: [{
      data: [12, 19, 3, 5, 2],
      backgroundColor: ['#ef5350', '#ffa726', '#ff7043', '#7e57c2', '#bdbdbd'],
      borderWidth: 0,
    }],
  };

  const barOptions = {
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
    plugins: { legend: { position: 'right', labels: { usePointStyle: true } } }
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    return (names[0][0] + (names.length > 1 ? names[names.length - 1][0] : '')).toUpperCase();
  };

  const getStatusPillClass = (status) => {
    const s = status.toLowerCase();
    if (s === 'resolvido' || s === 'baixa') return 'statusBadgePill completed'; // Verde
    if (s === 'em análise' || s === 'média') return 'statusBadgePill pending'; // Laranja
    return 'statusBadgePill'; // Padrão ou criar classe 'high' para vermelho
  };

  // Funções de Ação
  const handleExportJSON = () => { alert("Exportando dados em JSON..."); };
  const handlePrintPDF = () => { window.print(); };

  return (
    <div className="checklistPageModern">
      <title>Safely | Painel do Gestor</title>

      {/* Header com Ações */}
      <div className="pageHeaderModern">
        <h1>Painel do Gestor</h1>
        
        <div style={{display: 'flex', gap: '10px'}}>
          <button className="btnNewChecklist" onClick={handleExportJSON} style={{background: 'white', color: '#005A9C', border: '1px solid #005A9C'}}>
            <FaFileExport /> Exportar
          </button>
          <button className="btnNewChecklist" onClick={handlePrintPDF}>
            <FaFilePdf /> Imprimir
          </button>
        </div>
      </div>

      {/* Grid de KPIs */}
      <div className="kpiGridModern">
        
        {/* KPI: Tempo Resposta */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
            <div className="kpiIconGlass iconTime"><FaClock /></div>
            <span className="trendPill positive"><FaArrowDown size={10}/> -0.8h</span> {/* Seta para baixo é bom aqui (menos tempo) */}
          </div>
          <span className="kpiValue">{avgResponseTime}h</span>
          <span className="kpiLabel">Tempo de Resposta</span>
          <span className="kpiSubtext">Média semanal</span>
        </div>

        {/* KPI: Auditorias */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass iconAudit"><FaCheckCircle /></div>
             <span className="trendPill positive"><FaArrowUp size={10}/> +12</span>
          </div>
          <span className="kpiValue">{auditsCompleted}</span>
          <span className="kpiLabel">Auditorias</span>
          <span className="kpiSubtext">Realizadas este mês</span>
        </div>

        {/* KPI: Não Conformidades */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass iconAlert"><FaExclamationTriangle /></div>
             <span className="trendPill positive"><FaArrowDown size={10}/> -5</span> {/* Menos problemas = Positivo */}
          </div>
          <span className="kpiValue">{nonConformities}</span>
          <span className="kpiLabel">Não Conformidades</span>
          <span className="kpiSubtext">Pendentes de ação</span>
        </div>

        {/* KPI: Certificações */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass iconCert"><FaCertificate /></div>
             <span className="trendPill positive"><FaArrowUp size={10}/> +18</span>
          </div>
          <span className="kpiValue">{activeCertifications}</span>
          <span className="kpiLabel">Certificações</span>
          <span className="kpiSubtext">Colaboradores ativos</span>
        </div>

        {/* KPI: Participação */}
        <div className="kpiCardGlass">
          <div className="kpiHeader">
             <div className="kpiIconGlass iconUsers"><FaUsers /></div>
             <span className="trendPill positive"><FaArrowUp size={10}/> +4%</span>
          </div>
          <span className="kpiValue">{participationRate}%</span>
          <span className="kpiLabel">Engajamento</span>
          <span className="kpiSubtext">Taxa de participação</span>
        </div>

        {/* KPI: Gravidade */}
        <div className="kpiCardGlass">
           <div className="kpiHeader">
             <div className="kpiIconGlass iconAlert" style={{background: '#ffebee', color: '#b71c1c'}}><FaHeartbeat /></div>
             <span className="trendPill positive"><FaArrowDown size={10}/> -0.08</span>
           </div>
           <span className="kpiValue">{severityIndex}</span>
           <span className="kpiLabel">Índice Gravidade</span>
           <span className="kpiSubtext">Por 1k horas</span>
        </div>
      </div>

      {/* Gráficos em Glassmorphism */}
      <div className="chartsGridModern">
        <div className="chartSectionGlass">
          <div className="sectionTitleGlass"><FaChartBar /> Engajamento Semanal</div>
          <div style={{height: '250px'}}>
            <Bar options={barOptions} data={engagementData} />
          </div>
        </div>
        <div className="chartSectionGlass">
          <div className="sectionTitleGlass"><FaChartPie /> Motivos de Ocorrências</div>
          <div style={{height: '250px', display: 'flex', justifyContent: 'center'}}>
            <Doughnut options={doughnutOptions} data={nonConformanceData} />
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