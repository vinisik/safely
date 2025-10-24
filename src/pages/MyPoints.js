import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import { FaHelmetSafety, FaBrain, FaClipboardCheck, FaQuestion, FaChartPie, FaBagShopping, FaMedal } from 'react-icons/fa6';
import { IoIosPodium } from 'react-icons/io';

ChartJS.register(ArcElement, Tooltip, Legend);

function MyPoints({ totalPoints }) {
  const isMobile = useIsMobile();
  const rank = 'Especialista em Prevenção';
  const badges = [
    { name: 'Primeiro EPI', icon: <FaHelmetSafety/>, color: '#FFC107' },
    { name: 'Mestre do Quiz', icon: <FaBrain/>, color: '#4CAF50' },
    { name: 'Checklist Ágil', icon: <FaClipboardCheck/>, color: '#005A9C' },
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

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: !isMobile, 
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
  }), [isMobile]);

  return (
    <div className="points-page">
      
      <title>Safely | Meus Pontos</title>
      
      <div className="page-header">
        <h1>Meus Pontos e Conquistas</h1>
      </div>

      <div className="points-header-layout">
        {/* Coluna para empilhar os cards de resumo */}
            <div className="points-summary-column">
              <div className="summary-card-points">
                <div className="summary-content-points">
                  <h2>Pontuação Total</h2>
                  <span className="summary-value">{totalPoints}</span>
                </div>
                <div className="summary-icon icon-medal">
                    <FaMedal size={20}/>
                </div>
              </div>
              
              <div className="summary-card-points">
                <div className="summary-content-points">
                  <h2> Seu Rank Atual</h2>
                  <span className="large-text">{rank}</span>
                </div>
                <div className="summary-icon icon-poduim">
                    <IoIosPodium size={20}/>
                </div>
              </div>
              
            {/* <div className="points-summary ">
              <div className="point-item">
                <h2><FaTrophy/> Total de Pontos</h2>
                <p className="large-number">{totalPoints}</p>
              </div>
            </div> */}

            {/* <div className="points-summary ">
              <div className="point-item">
                
              </div>
            </div> */}
          </div>


        {/* Coluna do gráfico */}
        <div className="points-chart-section">
          <div className="summary-card-points">
                <div className="chart-container chart-card">
                  <h2>Distribuição dos Pontos</h2>
                  <div className="chart-container-wrapper">
                      <Pie data={chartData} options={chartOptions} />
                  </div>
              </div>
                <div className="summary-icon icon-poduim">
                    <FaChartPie size={20}/>
                </div>
          </div>
        </div>
      </div>

      <Link to="/recompensas" className="card rewards-link-card">
        <h3><FaBagShopping/> Visite a Loja de Recompensas</h3>
        <p>Troque seus pontos por prêmios incríveis!</p>
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
            <span className="badge-icon"><FaQuestion/></span>
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
            <Link to="/videos/1" className="btn-challenge">Iniciar Treinamento</Link>
          </div>
          <div className="challenge-card card">
            <h3>Responder 3 Quizzes com 100%</h3>
            <p>Ganhe 200 pontos e o badge "Mestre Aprovado"!</p>
            <Link to="/quizzes" className="btn-challenge">Ver Quizzes</Link>
          </div>
          <div className="challenge-card card">
            <h3>Responder 3 Quizzes com 100%</h3>
            <p>Ganhe 200 pontos e o badge "Mestre Aprovado"!</p>
            <Link to="/quizzes" className="btn-challenge">Ver Quizzes</Link>
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

export default MyPoints;