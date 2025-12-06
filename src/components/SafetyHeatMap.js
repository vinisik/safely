import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import '../pages/Components.css'; // Usa o mesmo CSS

function SafetyHeatmap() {
  // Dados simulados: x/y são porcentagens da posição na planta
  const heatmapPoints = [
    { x: 20, y: 30, value: 'high', label: 'Extrusão - Risco Térmico' },
    { x: 50, y: 50, value: 'medium', label: 'Montagem - Risco Ergonômico' },
    { x: 80, y: 20, value: 'low', label: 'Expedição - Trânsito' },
    { x: 30, y: 70, value: 'high', label: 'Caldeira - Pressão' },
  ];

  return (
    <div className="chartSectionGlass" style={{gridColumn: '1 / -1'}}>
        <div className="sectionTitleGlass"><FaMapMarkedAlt /> Mapa de Calor de Incidentes</div>
        <div style={{
            position: 'relative', width: '100%', height: '350px', 
            background: '#e0e0e0', borderRadius: '16px', overflow: 'hidden'
        }}>
            {/* Simulação da planta baixa da fábrica */}
            <div style={{width: '100%', height: '100%', background: 'repeating-linear-gradient(45deg, #eee, #eee 10px, #f5f5f5 10px, #f5f5f5 20px)'}}></div>
            
            {/* Pontos de calor */}
            {heatmapPoints.map((point, index) => (
                <div key={index} style={{
                    position: 'absolute', left: `${point.x}%`, top: `${point.y}%`,
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: point.value === 'high' ? 'rgba(255, 0, 0, 0.6)' : point.value === 'medium' ? 'rgba(255, 165, 0, 0.6)' : 'rgba(0, 128, 0, 0.4)',
                    boxShadow: '0 0 20px 10px rgba(255,255,255,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold',
                    cursor: 'pointer', transform: 'translate(-50%, -50%)',
                    zIndex: 10
                }} title={point.label}>!</div>
            ))}
            
            {/* Legenda */}
            <div style={{position: 'absolute', bottom: 10, left: 10, background: 'rgba(255,255,255,0.8)', padding: '5px 10px', borderRadius: '8px', fontSize: '0.8rem', zIndex: 11}}>
                🔴 Crítico 🟠 Atenção 🟢 Seguro
            </div>
        </div>
    </div>
  );
}

export default SafetyHeatmap;