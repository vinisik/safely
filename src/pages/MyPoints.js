import React from 'react';
import { Link } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar os elementos necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function MeusPontos() {
  // Dados simulados para a página de pontos
  const totalPoints = 1250;
  const rank = 'Especialista em Prevenção';
  const badges = [
    { name: 'Primeiro EPI', icon: '👷‍♂️', color: '#FFC107' },
    { name: 'Mestre do Quiz', icon: '🧠', color: '#4CAF50' },
    { name: 'Checklist Ágil', icon: '✅', color: '#005A9C' },
  ];

  // Dados para o gráfico de pizza (ex: pontos por categoria de conteúdo)
  const chartData = {
    labels: ['Vídeos Concluídos', 'Quizzes Acertados', 'Checklists Preenchidos', 'Participação Extra'],
    datasets: [
      {
        data: [400, 500, 250, 100], // Pontos simulados para cada categoria
        backgroundColor: [
          '#005A9C', // Azul principal
          '#4CAF50', // Verde
          '#FFC107', // Amarelo
          '#E91E63', // Rosa (um pouco diferente para 'extra')
        ],
        hoverOffset: 10,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right', // Coloca a legenda à direita
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
      <div className="page-header">
        <h1>Meus Pontos e Conquistas</h1>
      </div>

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

      <div className="points-section">
        <h2>Distribuição dos seus Pontos</h2>
        <div className="chart-container card">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>

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
          {/* Placeholder para mais badges */}
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
        </div>
      </div>
    </div>
  );
}

export default MeusPontos;