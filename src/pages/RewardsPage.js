import React, { useState, useEffect } from 'react';
import { rewards } from '../data/mockData';
import { FaShoppingBag, FaWallet, FaLock, FaCheck, FaTimes, FaHistory, FaCalendarAlt } from 'react-icons/fa';

// Importa o CSS Unificado
import './Pages.css';

function RewardsPage({ totalPoints }) { 
  
  // Estado local para manipular a UI instantaneamente
  const [currentPoints, setCurrentPoints] = useState(totalPoints);
  const [successItem, setSuccessItem] = useState(null); 
  const [shakeBtnId, setShakeBtnId] = useState(null); 
  
  // Estado do Menu de Histórico
  const [showHistory, setShowHistory] = useState(false);
  
  // Histórico (Iniciado com dados de exemplo para visualização)
  const [history, setHistory] = useState([
    { id: 991, title: 'Vale Ifood R$ 30', cost: 300, date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(), image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=iFood' },
    { id: 992, title: 'Ingresso Cinema', cost: 450, date: new Date(Date.now() - 86400000 * 15).toLocaleDateString(), image: 'https://via.placeholder.com/150/000000/FFFFFF?text=Cinema' }
  ]);

  // Sincroniza se a prop mudar externamente (ex: ganhar pontos em outra aba)
  useEffect(() => {
    setCurrentPoints(totalPoints);
  }, [totalPoints]);

  const handleRedeem = (reward) => {
    // 1. Verificação de Saldo
    if (currentPoints < reward.cost) {
      setShakeBtnId(reward.id);
      setTimeout(() => setShakeBtnId(null), 500); // Remove classe após animação
      return;
    }

    // 2. Deduz pontos visualmente e abre modal
    setCurrentPoints(prev => prev - reward.cost);
    setSuccessItem(reward);

    // 3. Adiciona ao histórico
    const newHistoryItem = {
        ...reward,
        id: Date.now(),
        date: new Date().toLocaleDateString()
    };
    setHistory(prev => [newHistoryItem, ...prev]);
  };

  const closeSuccessModal = () => {
    setSuccessItem(null);
  };

  return (
    <div className="checklistPageModern">
      <title>Safely | Recompensas</title>
      
      {/* Header com Destaque nos Pontos (Hero) */}
      <div className="checklistHeaderCard" style={{
          background: 'linear-gradient(135deg, #FFC107, #FF8F00)', 
          marginBottom: '2rem',
          padding: '2rem'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
             
             {/* Espaço vazio para manter o centro alinhado visualmente em telas grandes */}
             <div style={{width: '120px'}} className="desktop-only-spacer"></div> 

             {/* BLOCO CENTRAL DESTAQUE */}
             <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1}}>
                
                {/* Título Menor */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    opacity: 0.9, marginBottom: '0.5rem', color: 'white',
                    textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', fontWeight: '600'
                }}>
                    <FaShoppingBag /> Loja de Recompensas
                </div>

                {/* Saldo Gigante */}
                <div style={{
                    fontSize: '4.5rem', 
                    fontWeight: '700', 
                    lineHeight: '1',
                    fontFamily: 'Poppins, sans-serif',
                    textShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    color: 'white'
                }}>
                    {currentPoints}
                </div>
                
                {/* Subtexto */}
                <div style={{fontSize: '1rem', opacity: 0.9, fontWeight: '500', color: 'white'}}>
                    pontos disponíveis
                </div>
             </div>

             {/* Wrapper Relativo para o Menu Flutuante */}
             <div className="historyContainerRelative">
                <button 
                    className="btnHistoryToggle" 
                    onClick={() => setShowHistory(!showHistory)}
                    title="Ver Histórico"
                >
                    <FaHistory /> {showHistory ? 'Fechar' : 'Histórico'}
                </button>

                {/* PAINEL DE HISTÓRICO (Popover) */}
                {showHistory && (
                    <div className="historyPanelGlass">
                        <div className="historyHeader">
                            <h3>Meus Resgates</h3>
                            <span>{history.length} itens</span>
                        </div>
                        
                        <div className="historyList">
                            {history.length === 0 ? (
                                <p style={{textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem'}}>
                                    Nenhum item resgatado ainda.
                                </p>
                            ) : (
                                history.map(item => (
                                    <div key={item.id} className="historyItem">
                                        <img src={item.image} alt={item.title} className="historyThumb" />
                                        <div className="historyInfo">
                                            <h4>{item.title}</h4>
                                            <span className="historyDate">
                                                <FaCalendarAlt size={10}/> {item.date}
                                            </span>
                                        </div>
                                        <div className="historyCost">-{item.cost} pts</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
             </div>
        </div>
      </div>

      {/* Grid de Recompensas */}
      <div className="mediaGridModern">
        {rewards.map((reward) => {
            const canAfford = currentPoints >= reward.cost;
            const isShaking = shakeBtnId === reward.id;

            return (
              <div className="rewardCardGlass" key={reward.id} style={{opacity: canAfford ? 1 : 0.7}}>
                <div className="rewardImageContainer">
                  <img src={reward.image} alt={reward.title} className="rewardImage" style={{filter: canAfford ? 'none' : 'grayscale(100%) opacity(0.8)'}} />
                </div>
                
                <div className="rewardContent">
                  <div className="rewardCostTag">
                    {reward.cost} pts
                  </div>
                  <h3 style={{fontSize: '1.2rem', margin: '0 0 0.5rem 0'}}>{reward.title}</h3>
                  <p style={{fontSize: '0.9rem', flexGrow: 1}}>
                    {canAfford ? 'Resgate este item incrível.' : `Junte mais ${reward.cost - currentPoints} pts para resgatar.`}
                  </p>
                  
                  <button
                    onClick={() => handleRedeem(reward)}
                    className={`btnNewChecklist ${!canAfford ? 'disabled' : ''} ${isShaking ? 'btn-shake' : ''}`}
                    disabled={!canAfford && !isShaking} 
                    style={{
                        width: '100%', 
                        marginTop: '1rem', 
                        justifyContent: 'center',
                        background: isShaking ? '#c62828' : (canAfford ? '#005A9C' : '#e0e0e0'),
                        color: isShaking || canAfford ? 'white' : '#999',
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                        boxShadow: canAfford ? '' : 'none',
                        transition: 'all 0.3s'
                    }}
                  >
                    {isShaking ? (
                        <><FaTimes /> Saldo Insuficiente</>
                    ) : canAfford ? (
                        <><FaCheck /> Resgatar</>
                    ) : (
                        <><FaLock /> Bloqueado</>
                    )}
                  </button>
                </div>
              </div>
            );
        })}
      </div>

      {/* MODAL DE SUCESSO */}
      {successItem && (
        <div className="rewardSuccessOverlay">
           <div className="successCard">
              <div className="successIconContainer animate-confetti">
                 <FaCheck />
                 {/* Partículas CSS para explosão de confete */}
                 <div className="confetti-piece" style={{'--tx': '-50px', '--ty': '-50px'}}></div>
                 <div className="confetti-piece" style={{'--tx': '50px', '--ty': '-50px'}}></div>
                 <div className="confetti-piece" style={{'--tx': '-50px', '--ty': '50px'}}></div>
                 <div className="confetti-piece" style={{'--tx': '50px', '--ty': '50px'}}></div>
                 <div className="confetti-piece" style={{'--tx': '0px', '--ty': '-70px'}}></div>
              </div>

              <div className="successContent">
                  <h2 style={{color: '#005A9C', marginBottom: '0.5rem'}}>Sucesso!</h2>
                  <p style={{marginBottom: '1.5rem'}}>Você resgatou:</p>
                  
                  <img src={successItem.image} alt={successItem.title} className="purchasedItemImage" />
                  
                  <h3 style={{fontSize: '1.3rem', margin: '1rem 0'}}>{successItem.title}</h3>
                  <div className="rewardCostTag" style={{margin: '0 auto', display: 'inline-block'}}>
                     -{successItem.cost} pontos
                  </div>
                  
                  <br/>
                  <button onClick={closeSuccessModal} className="btnCloseSuccess">Continuar</button>
                  <p style={{fontSize: '0.8rem', opacity: 0.7, marginTop: '1.5rem'}}>
                    Voucher enviado para seu e-mail.
                  </p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default RewardsPage;