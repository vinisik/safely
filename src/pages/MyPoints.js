import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import { FaHelmetSafety, FaBrain, FaClipboardCheck, FaQuestion, FaChartPie, FaBagShopping, FaMedal, FaTrophy } from 'react-icons/fa6';
import { IoIosPodium } from 'react-icons/io';
import './Pages.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function MyPoints({ totalPoints, currentRankName }) {
  const isMobile = useIsMobile();
  
  const badges = [
    { name: 'Primeiro EPI', icon: <FaHelmetSafety/>, color: '#FFC107' },
    { name: 'Mestre do Quiz', icon: <FaBrain/>, color: '#4CAF50' },
    { name: 'Checklist Ágil', icon: <FaClipboardCheck/>, color: '#005A9C' },
  ];

  const chartData = {
    labels: ['Vídeos', 'Quizzes', 'Checklists', 'Extras'],
    datasets: [
      {
        data: [400, 500, 250, 100],
        backgroundColor: ['#005A9C', '#4CAF50', '#FFC107', '#E91E63'],
        borderWidth: 0, 
        hoverOffset: 15,
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
          usePointStyle: true,
          font: { size: 12, family: "'Poppins', sans-serif" },
          padding: 20
        }
      },
    }
  }), [isMobile]);

  return (
    <div className="checklistPageModern">
      <title>Safely | Meus Pontos</title>
      
      {/* Header Estilo Cartão "Hero" */}
      <div className="checklistHeaderCard" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h1 style={{marginBottom: '0.5rem'}}>Painel de Conquistas</h1>
        <div className="headerMetaGrid" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center', gap: '3rem' }}>
            
            {/* Total de Pontos Grande */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <span style={{fontSize: '3.5rem', fontWeight: 'bold', lineHeight: 1}}>{totalPoints}</span>
                <span style={{opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <FaMedal /> PONTOS TOTAIS
                </span>
            </div>

            {/* Rank Atual */}
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                 <span style={{fontSize: '2rem', fontWeight: 'bold', lineHeight: 1, marginTop: '1rem'}}>{currentRankName}</span>
                 <span style={{opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <IoIosPodium /> RANK ATUAL
                </span>
            </div>
        </div>
      </div>

      {/* Grid Principal: Gráfico e Banner da Loja */}
      <div className="pointsDashboardGrid">
        
        {/* Coluna do Gráfico (Glass) */}
        <div className="chartGlassContainer">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
             <h2><FaChartPie style={{marginRight: '8px'}}/> Distribuição</h2>
          </div>
          <div style={{ height: '300px', position: 'relative' }}>
             <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Coluna Lateral: Loja */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <Link to="/recompensas" className="storeBanner">
                <h3><FaBagShopping/> Loja de Pontos</h3>
                <p>Você tem <strong>{totalPoints}</strong> pontos para gastar.</p>
                <div style={{marginTop: '1rem', background: 'white', color: '#FF9800', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem'}}>
                    Ver Prêmios
                </div>
                <FaBagShopping className="storeBannerIconBg" />
            </Link>
            
            {/* Um pequeno card extra, ex: Dica */}
            <div className="badgeCardGlass" style={{flex: 1, alignItems: 'flex-start', textAlign: 'left', background: 'linear-gradient(135deg, #2e7d32, #43a047)', color: 'white', border: 'none'}}>
                 <h3 style={{color: 'white'}}><FaTrophy /> Dica</h3>
                 <p style={{color: 'rgba(255,255,255,0.9)'}}>Complete 3 Quizzes seguidos para ganhar um bônus de 50 pts!</p>
            </div>
        </div>
      </div>

      {/* Seção Badges */}
      <h2 style={{color: '#005A9C', marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
        <FaMedal /> Meus Badges
      </h2>
      <div className="badgesGridModern">
        {badges.map((badge, index) => (
          <div className="badgeCardGlass" key={index}>
            <div className="badgeIconCircle" style={{ backgroundColor: badge.color }}>
                {badge.icon}
            </div>
            <h3>{badge.name}</h3>
            <p>Desbloqueado</p>
          </div>
        ))}
        {/* Placeholder */}
        <div className="badgeCardGlass locked">
          <div className="badgeIconCircle">
            <FaQuestion/>
          </div>
          <h3>Próximo Nível</h3>
          <p>Complete 5 vídeos</p>
        </div>
      </div>

      {/* Seção Desafios */}
      <h2 style={{color: '#005A9C', marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
        <FaBrain /> Próximos Desafios
      </h2>
      <div className="mediaGridModern">
        <div className="challengeCardGlass">
            <div>
                <h3 style={{color: '#005A9C', marginBottom: '0.5rem'}}>EPIs Avançado</h3>
                <p style={{color: '#666'}}>Conclua o treinamento completo sobre uso de máscaras.</p>
            </div>
            <div style={{marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontWeight: 'bold', color: '#E91E63'}}>+150 pts</span>
                <Link to="/videos" className="btnNewChecklist" style={{padding: '0.5rem 1rem', fontSize: '0.8rem'}}>Iniciar</Link>
            </div>
        </div>

        <div className="challengeCardGlass">
             <div>
                <h3 style={{color: '#005A9C', marginBottom: '0.5rem'}}>Mestre dos Quizzes</h3>
                <p style={{color: '#666'}}>Acerte 100% em 3 quizzes consecutivos.</p>
            </div>
            <div style={{marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span style={{fontWeight: 'bold', color: '#E91E63'}}>+200 pts</span>
                <Link to="/quizzes" className="btnNewChecklist" style={{padding: '0.5rem 1rem', fontSize: '0.8rem'}}>Ver Quizzes</Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default MyPoints;