import React, { useState, useEffect } from 'react';
import { FaTimes, FaQrcode, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import '../pages/Pages.css'; // Usa o CSS moderno

function QRScannerModal({ isOpen, onClose }) {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setResult(null);
      // Simula tempo de leitura
      setTimeout(() => {
        setScanning(false);
        setResult("Extrusora #04 - Manutenção Preventiva");
      }, 2000);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modalBackdropGlass">
      <div className="modalCardGlass" style={{maxWidth: '400px', textAlign: 'center'}}>
        <button onClick={onClose} className="btnCloseModal" style={{position: 'absolute', right: '20px', top: '20px'}}>
           <FaTimes />
        </button>

        <h2 style={{marginTop: '1rem'}}>Escanear Equipamento</h2>
        
        <div style={{
            height: '250px', background: '#000', borderRadius: '20px', margin: '1.5rem 0', 
            position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            {scanning ? (
                <>
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', 
                        background: '#00ff00', boxShadow: '0 0 10px #00ff00', animation: 'scanMove 2s infinite'
                    }}></div>
                    <p style={{color: 'white', zIndex: 2}}><FaSpinner className="fa-spin"/> Procurando QR Code...</p>
                </>
            ) : (
                <div style={{color: '#4caf50', fontSize: '4rem'}}>
                    <FaCheckCircle />
                </div>
            )}
            {/* Imagem de fundo simulando câmera */}
            <div style={{position: 'absolute', top:0, left:0, width:'100%', height:'100%', background: 'rgba(0,0,0,0.6)'}}></div>
        </div>

        {result && (
            <div style={{animation: 'slideUp 0.3s'}}>
                <p style={{color: '#666', marginBottom: '0.5rem'}}>Equipamento Identificado:</p>
                <h3 style={{color: '#005A9C'}}>{result}</h3>
                <button className="btnNewChecklist" style={{width: '100%', justifyContent: 'center', marginTop: '1rem'}}>
                    Abrir Checklist
                </button>
            </div>
        )}
        
        <style>{`@keyframes scanMove { 0% {top: 0} 50% {top: 100%} 100% {top: 0} }`}</style>
      </div>
    </div>
  );
}
export default QRScannerModal;