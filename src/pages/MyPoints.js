import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import { FaHelmetSafety, FaBrain, FaClipboardCheck, FaQuestion, FaChartPie, FaBagShopping, FaMedal, FaTrophy, FaUsers } from 'react-icons/fa6';
import { IoIosPodium } from 'react-icons/io';
import './Pages.css';

ChartJS.register(ArcElement, Tooltip, Legend);

// Cor do texto padrão para os gráficos (visível no dark e light)
ChartJS.defaults.color = '#94a3b8';

function MyPoints({ totalPoints, currentRankName }) {
  const isMobile = useIsMobile();
  const badges = [ { name: 'Primeiro EPI', icon: <FaHelmetSafety/>, color: '#FFC107' }, { name: 'Mestre do Quiz', icon: <FaBrain/>, color: '#4CAF50' }, { name: 'Checklist Ágil', icon: <FaClipboardCheck/>, color: '#005A9C' } ];
  const teams = [ { rank: 1, name: 'Turno A - Manutenção', points: 15400, trend: 'up' }, { rank: 2, name: 'Turno B - Produção', points: 14200, trend: 'down' }, { rank: 3, name: 'Logística', points: 11050, trend: 'same' } ];

  const chartData = {
    labels: ['Vídeos', 'Quizzes', 'Checklists', 'Extras'],
    datasets: [{ data: [400, 500, 250, 100], backgroundColor: ['#38bdf8', '#4ade80', '#fbbf24', '#f472b6'], borderWidth: 0, hoverOffset: 15 }],
  };

  const chartOptions = useMemo(() => ({
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: !isMobile, position: 'right', labels: { usePointStyle: true, color: '#94a3b8', font: { size: 12, family: "'Poppins', sans-serif" }, padding: 20 } } }
  }), [isMobile]);

  return (
    <div className="checklistPageModern">
      <title>Safely | Meus Pontos</title>
      <div className="checklistHeaderCard">
        <h1>Painel de Conquistas</h1>
        <div className="headerMetaGrid">
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}><span style={{fontSize:'3.5rem', fontWeight:'bold', lineHeight:1}}>{totalPoints}</span><span style={{opacity:0.9, display:'flex', alignItems:'center', gap:'5px'}}><FaMedal/> PONTOS TOTAIS</span></div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}><span style={{fontSize:'2rem', fontWeight:'bold', lineHeight:1}}>{currentRankName}</span><span style={{opacity:0.9, display:'flex', alignItems:'center', gap:'5px'}}><IoIosPodium/> RANK ATUAL</span></div>
        </div>
      </div>

      <div className="pointsDashboardGrid">
        <div className="chartGlassContainer">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><h2><FaChartPie style={{marginRight:'8px'}}/> Distribuição</h2></div>
          <div style={{ height: '300px', position: 'relative' }}><Pie data={chartData} options={chartOptions} /></div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            <Link to="/recompensas" className="storeBanner">
                <h3><FaBagShopping/> Loja de Pontos</h3>
                <p>Você tem <strong>{totalPoints}</strong> pontos.</p>
                <div style={{marginTop:'1rem', background:'white', color:'#FF9800', padding:'0.5rem 1rem', borderRadius:'20px', fontWeight:'bold', fontSize:'0.9rem'}}>Ver Prêmios</div>
                <FaBagShopping className="storeBannerIconBg" />
            </Link>
            <div className="badgeCardGlass" style={{flex:1, alignItems:'flex-start', textAlign:'left', background:'linear-gradient(135deg, #15803d, #166534)', border:'none'}}>
                 <h3 style={{color:'white'}}><FaTrophy/> Dica Pro</h3><p style={{color:'rgba(255,255,255,0.9)'}}>Responda o Quiz semanal para bônus!</p>
            </div>
        </div>
      </div>

      {/* Liga de Equipes */}
      <div className="chartSectionGlass" style={{marginTop:'2rem'}}>
        <h2 style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'1rem'}}><FaUsers/> Liga de Equipes</h2>
        <div style={{display:'grid', gap:'1rem'}}>
            {teams.map((team, i) => (
                <div key={i} className="badgeCardGlass" style={{flexDirection:'row', justifyContent:'space-between', padding:'1rem 2rem', background: i===0?'rgba(251, 191, 36, 0.1)':'var(--glass-bg)'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                        <span style={{fontSize:'1.5rem', fontWeight:'bold', color: i===0?'#fbbf24':'#94a3b8', width:'30px'}}>#{team.rank}</span>
                        <div><h3 style={{margin:0}}>{team.name}</h3><p style={{margin:0}}>{team.trend === 'up' ? '🔥 Em alta' : '➖ Estável'}</p></div>
                    </div>
                    <div className="scorePill">{team.points.toLocaleString()} pts</div>
                </div>
            ))}
        </div>
      </div>

      <h2 style={{marginTop:'2rem'}}><FaMedal/> Meus Badges</h2>
      <div className="badgesGridModern">
        {badges.map((b,i)=>(<div className="badgeCardGlass" key={i}><div className="badgeIconCircle" style={{backgroundColor:b.color}}>{b.icon}</div><h3>{b.name}</h3><p>Desbloqueado</p></div>))}
        <div className="badgeCardGlass locked"><div className="badgeIconCircle"><FaQuestion/></div><h3>Próximo</h3><p>???</p></div>
      </div>
    </div>
  );
}
export default MyPoints;