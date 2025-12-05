import React from 'react';
import { rewards } from '../data/mockData';
import { FaBagShopping, FaWallet, FaLock, FaCheck } from 'react-icons/fa6';
import './Pages.css';

function RewardsPage({totalPoints}) {
  return (
    <div className="checklistPageModern">
      <title>Safely | Recompensas</title>
      
      {/* Header com Saldo (Carteira) */}
      <div className="checklistHeaderCard" style={{background: 'linear-gradient(135deg, #FFC107, #FF8F00)', marginBottom: '3rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem'}}>
            <FaBagShopping size={30} />
            <h1 style={{margin: 0}}>Loja de Recompensas</h1>
        </div>
        <div className="headerMetaGrid">
          <div className="metaItem" style={{background: 'rgba(255,255,255,0.2)', fontSize: '1.2rem', padding: '0.8rem 1.5rem'}}>
             <FaWallet style={{marginRight: '10px'}}/> 
             Saldo: <strong>{totalPoints} pontos</strong>
          </div>
        </div>
      </div>

      {/* Grid de Recompensas */}
      <div className="mediaGridModern">
        {rewards.map((reward) => {
            const canAfford = totalPoints >= reward.cost;

            return (
              <div className="rewardCardGlass" key={reward.id} style={{opacity: canAfford ? 1 : 0.8}}>
                <div className="rewardImageContainer">
                  <img src={reward.image} alt={reward.title} className="rewardImage" style={{filter: canAfford ? 'none' : 'grayscale(80%)'}} />
                </div>
                
                <div className="rewardContent">
                  <div className="rewardCostTag">
                    {reward.cost} pts
                  </div>
                  <h3 style={{fontSize: '1.2rem', margin: '0 0 0.5rem 0'}}>{reward.title}</h3>
                  <p style={{color: '#777', fontSize: '0.9rem', flexGrow: 1}}>
                    Resgate este item incrível usando seus pontos acumulados.
                  </p>
                  
                  <button
                    className={`btnNewChecklist ${!canAfford ? 'disabled' : ''}`}
                    disabled={!canAfford}
                    style={{
                        width: '100%', 
                        marginTop: '1rem', 
                        justifyContent: 'center',
                        background: canAfford ? '#005A9C' : '#ccc',
                        cursor: canAfford ? 'pointer' : 'not-allowed',
                        boxShadow: canAfford ? '' : 'none'
                    }}
                  >
                    {canAfford ? <><FaCheck /> Resgatar</> : <><FaLock /> Faltam {reward.cost - totalPoints} pts</>}
                  </button>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default RewardsPage;