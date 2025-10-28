import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { FaUsers, FaClock, FaCheckCircle, FaExclamationTriangle, FaCertificate, FaHeartbeat, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { topPerformers, recentIncidents } from '../data/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function ManagerDashboard({ checklists, completedVideosCount, totalVideosCount, completedQuizzesCount, totalQuizzesCount }) {
  // Cálculos (alguns são placeholders)
  const totalChecklists = checklists.length;
  const pendingChecklists = checklists.filter(c => c.status === 'pending').length;
  const nonConformities = 8; // Placeholder
  const participationRate = 96; // Placeholder
  const avgResponseTime = 2.3; // Placeholder
  const auditsCompleted = 47; // Placeholder
  const activeCertifications = 142; // Placeholder
  const severityIndex = 0.12; // Placeholder

  // Dados Simulados para Gráficos
  const engagementData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Pontos Ganhos',
        data: [650, 590, 800, 810], // Dados simulados
        backgroundColor: 'rgba(0, 90, 156, 0.6)', // Azul Safely com transparência
        borderColor: 'rgba(0, 90, 156, 1)',
        borderWidth: 1,
      },
    ],
  };

  const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }

  // Função auxiliar para classes CSS de severidade/status
  const getBadgeClass = (value) => {
      value = value.toLowerCase();
      if (value === 'baixa' || value === 'resolvido') return 'status-low';
      if (value === 'média' || value === 'em análise') return 'status-medium';
      if (value === 'alta') return 'status-high';
      return '';
  }

  const nonConformanceData = {
    labels: ['EPIs Faltando', 'Vazamentos', 'Obstrução', 'Falha Elétrica', 'Outros'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2], // Dados simulados
        backgroundColor: [ '#dc3545', '#ffc107', '#fd7e14', '#6f42c1', '#6c757d'],
        hoverOffset: 4,
      },
    ],
  };

  const barOptions = { responsive: true, plugins: { legend: { display: false }, title: { display: true, text: 'Engajamento Semanal (Pontos)' } } };
  const doughnutOptions = { responsive: true, plugins: { legend: { position: 'right'}, title: { display: true, text: 'Principais Não Conformidades Reportadas' } } };

  return (
    <div className="page-container manager-dashboard">
      <title>Safely | Painel do Gestor</title>
      <div className="page-header">
        <h1>Painel do Gestor</h1>
      </div>

      {/* --- NOVA SEÇÃO DE KPIs --- */}
      <div className="manager-kpi-grid">
        {/* Card: Taxa de Participação */}
        <div className="kpi-card ">
          <div className="kpi-header">
            <div className="kpi-icon icon-participation">
              <FaUsers size={20}/>
            </div>
            <span className="kpi-trend positive">
              <FaArrowUp size={12}/> +4%
            </span>
          </div>
          <span className="kpi-label">Taxa de Participação</span>
          <span className="kpi-value">{participationRate}%</span>
          <span className="kpi-subtext">Colaboradores engajados</span>
        </div>

        {/* Card: Tempo Médio de Resposta */}
        <div className="kpi-card ">
          <div className="kpi-header">
            <div className="kpi-icon icon-time">
              <FaClock size={20}/>
            </div>
             <span className="kpi-trend negative">
              <FaArrowDown size={12}/> -0.8h
            </span>
          </div>
          <span className="kpi-label">Tempo Médio de Resposta</span>
          <span className="kpi-value">{avgResponseTime}h</span>
          <span className="kpi-subtext">Para resolver incidentes</span>
        </div>

        {/* Card: Auditorias Realizadas */}
        <div className="kpi-card ">
          <div className="kpi-header">
            <div className="kpi-icon icon-audits">
              <FaCheckCircle size={20}/>
            </div>
             <span className="kpi-trend positive">
              <FaArrowUp size={12}/> +12
            </span>
          </div>
          <span className="kpi-label">Auditorias Realizadas</span>
          <span className="kpi-value">{auditsCompleted}</span>
          <span className="kpi-subtext">Este mês</span>
        </div>

        {/* Card: Não Conformidades */}
        <div className="kpi-card ">
          <div className="kpi-header">
            <div className="kpi-icon icon-nonconformity">
              <FaExclamationTriangle size={20}/>
            </div>
             <span className="kpi-trend negative">
              <FaArrowDown size={12}/> -5
            </span>
          </div>
          <span className="kpi-label">Não Conformidades</span>
          <span className="kpi-value">{nonConformities}</span>
          <span className="kpi-subtext">Em aberto</span>
        </div>

        {/* Card: Certificações Ativas */}
        <div className="kpi-card ">
          <div className="kpi-header">
            <div className="kpi-icon icon-certifications">
              <FaCertificate size={20}/>
            </div>
             <span className="kpi-trend positive">
              <FaArrowUp size={12}/> +18
            </span>
          </div>
          <span className="kpi-label">Certificações Ativas</span>
          <span className="kpi-value">{activeCertifications}</span>
          <span className="kpi-subtext">Colaboradores certificados</span>
        </div>

        {/* Card: Índice de Gravidade */}
        <div className="kpi-card ">
          <div className="kpi-header">
            <div className="kpi-icon icon-severity">
              <FaHeartbeat size={20}/>
            </div>
             <span className="kpi-trend negative">
              <FaArrowDown size={12}/> -0.08
            </span>
          </div>
          <span className="kpi-label">Índice de Gravidade</span>
          <span className="kpi-value">{severityIndex}</span>
          <span className="kpi-subtext">Por 1000 horas trabalhadas</span>
        </div>

      </div>
      {/* --- FIM DA NOVA SEÇÃO DE KPIs --- */}

      {/* Gráficos (Mantêm-se como estavam) */}
      <div className="manager-charts-grid">
        <div className="chart-card ">
          <Bar options={barOptions} data={engagementData} />
        </div>
        <div className="chart-card ">
          <Doughnut options={doughnutOptions} data={nonConformanceData} />
        </div>
      </div>

      <div className="manager-details-grid">
        {/* Card: Top Performers */}
        <div className="top-performers-card ">
          <h2>Top Performers em Segurança</h2>
          <p className="section-subtitle">Colaboradores com melhor desempenho</p>
          <div className="performers-list">
            <div className="performers-header">
              <span>Colaborador</span>
              <span>Score</span>
              <span>Treinamentos</span>
            </div>
            {topPerformers.map(user => (
              <div key={user.id} className="performer-item">
                <div className="performer-info">
                  <span className="performer-avatar" style={{ backgroundColor: user.avatarColor }}>
                    {getInitials(user.name)}
                  </span>
                  <div className="performer-details">
                    <span className="performer-name">{user.name}</span>
                    <span className="performer-role">{user.role}</span>
                  </div>
                </div>
                <span className="performer-score status-low">{user.score}</span>
                <span className="performer-trainings">{user.trainings}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card: Incidentes Recentes */}
        <div className="recent-incidents-card ">
           <h2>Incidentes Recentes</h2>
           <p className="section-subtitle">Últimas ocorrências registradas</p>
           <div className="incidents-table">
              <div className="incidents-header">
                  <span>Data</span>
                  <span>Tipo</span>
                  <span>Severidade</span>
                  <span>Status</span>
              </div>
              {recentIncidents.map(incident => (
                  <div key={incident.id} className="incident-item">
                      <span>{incident.date}</span>
                      <div className="incident-type-location">
                          <span className="incident-type">{incident.type}</span>
                          <span className="incident-location">{incident.location}</span>
                      </div>
                      <span className={`status-badge ${getBadgeClass(incident.severity)}`}>{incident.severity}</span>
                      <span className={`status-badge ${getBadgeClass(incident.status)}`}>{incident.status}</span>
                  </div>
              ))}
           </div>
        </div>
      </div>

    </div>
  );
}

export default ManagerDashboard;