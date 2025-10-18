import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

function MyPoints() {
  const totalPoints = 1250;
  const rank = 'Especialista em Prevenção';
  const badges = [
    { name: 'Primeiro EPI', icon: '👷‍♂️', color: '#FFC107' },
    { name: 'Mestre do Quiz', icon: '🧠', color: '#4CAF50' },
    { name: 'Checklist Ágil', icon: '✅', color: '#005A9C' },
  ];

  const chartData = {
    labels: ['Vídeos Concluídos', 'Quizzes Acertados', 'Checklists Preenchidos', 'Participação Extra'],
    datasets: [
      {
        data: [400, 500, 250, 100],
        backgroundColor: [
          '#005A9C',
          '#4CAF50',
          '#FFC107',
          '#E91E63',
        ],
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14,
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + ' pontos';
            }
            return label;
          }
        }
      }
    }
  };

  return (
    
    <div className="page-container points-page">
      <title>Safely | Meus Pontos</title>
      <div className="page-header">
        <h1>Meus Pontos e Conquistas</h1>
      </div>

      <div className="points-header-layout">
        <div className="points-summary card">
          <div className="point-item">
            <h2>🏆 Total de Pontos</h2>
            <p className="large-number">{totalPoints}</p>
          </div>
          <div className="point-item">
            <h2>🌟 Seu Rank Atual</h2>
            <p className="large-text">{rank}</p>
          </div>
        </div>

        <div className="points-chart-section">
          <div className="chart-container card">
            <h2>📊 Distribuição dos Pontos</h2>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* --- LINK PARA A LOJA DE RECOMPENSAS --- */}
      <Link to="/recompensas" className="card rewards-link-card">
        <h3>🛍️ Visite a Loja de Recompensas</h3>
        <p>Troque seus pontos por prêmios incríveis!</p>
        <span className="rewards-link-arrow">→</span>
      </Link>

      <div className="points-section">
        <h2>Meus Badges</h2>
        <div className="badges-grid card-grid">
          {badges.map((badge, index) => (
            <div className="badge-card card" key={index} style={{ borderColor: badge.color }}>
              <span className="badge-icon" style={{ backgroundColor: badge.color }}>{badge.icon}</span>
              <h3>{badge.name}</h3>
              <p>Desbloqueado em {new Date().toLocaleDateString()}</p>
            </div>
          ))}
          <div className="badge-card card placeholder-badge">
            <span className="badge-icon">❓</span>
            <h3>Próximo Badge</h3>
            <p>Conclua mais 5 vídeos</p>
          </div>
        </div>
      </div>

      <div className="points-section">
        <h2>Próximos Desafios</h2>
        <div className="challenges-list card-grid">
          <div className="challenge-card card">
            <h3>Concluir "EPIs Avançado"</h3>
            <p>Ganhe 150 pontos!</p>
            <Link to="/video/1" className="btn-challenge">Iniciar Treinamento</Link>
          </div>
          <div className="challenge-card card">
            <h3>Responder 3 Quizzes com 100%</h3>
            <p>Ganhe 200 pontos e o badge "Mestre Aprovado"!</p>
            <Link to="/quizzes" className="btn-challenge">Ver Quizzes</Link>
          </div>
          <div className="challenge-card card">
            <h3>Conclua todas suas checklists</h3>
            <p>Ganhe 100 pontos!</p>
            <Link to="/checklists" className="btn-challenge">Ver Checklits</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPoints;