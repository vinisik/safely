import React from 'react';
import { rewards } from '../data/mockData';

function RewardsPage() {
  // Para o protótipo, podemos repetir o total de pontos aqui.
  // Em uma aplicação real, essa informação viria de um local compartilhado.
  const totalPoints = 1250;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🛍️ Loja de Recompensas</h1>
      </div>
      <p className="rewards-subtitle">
        Você tem <strong>{totalPoints} pontos</strong>. Use-os para resgatar prêmios exclusivos!
      </p>
      <div className="rewards-grid card-grid">
        {rewards.map((reward) => (
          <div className="reward-card card" key={reward.id}>
            <img src={reward.image} alt={reward.title} className="reward-image" />
            <div className="reward-content">
              <h3>{reward.title}</h3>
              <div className="reward-cost">
                <span>{reward.cost}</span> pontos
              </div>
              <button
                className="btn btn-reward"
                disabled={totalPoints < reward.cost}
              >
                {totalPoints >= reward.cost ? 'Resgatar' : 'Pontos insuficientes'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RewardsPage;