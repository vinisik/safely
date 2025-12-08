import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPaperPlane, FaTimes, FaHeadset, FaRobot, 
  FaHardHat, FaExclamationTriangle, FaTools, 
  FaCheckDouble, FaChartLine, FaBullhorn, FaUsersCog
} from 'react-icons/fa';
import './Components.css'; 

function ChatWindow({ isOpen, onClose, user }) {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Verifica se é gestor
  const isManager = user?.role === 'gestor';

  
  // Menu para Funcionários 
  const employeeOptions = [
    { id: 'epi', label: 'Solicitar EPI', icon: <FaHardHat />, color: '#005A9C' },
    { id: 'maintenance', label: 'Reportar Avaria', icon: <FaTools />, color: '#e65100' },
    { id: 'report', label: 'Denúncia / Risco', icon: <FaExclamationTriangle />, color: '#c62828' },
    { id: 'human', label: 'Falar com Técnico', icon: <FaHeadset />, color: '#2e7d32' },
  ];

  // Menu para Gestores 
  const managerOptions = [
    { id: 'approvals', label: 'Aprovações (5)', icon: <FaCheckDouble />, color: '#eab308' }, // Amarelo
    { id: 'stats', label: 'Relatório Rápido', icon: <FaChartLine />, color: '#005A9C' }, // Azul
    { id: 'broadcast', label: 'Enviar Alerta', icon: <FaBullhorn />, color: '#ef4444' }, // Vermelho
    { id: 'team', label: 'Status Equipe', icon: <FaUsersCog />, color: '#8b5cf6' }, // Roxo
  ];

  // Define qual menu usar
  const currentOptions = isManager ? managerOptions : employeeOptions;

  // Mensagem inicial ao abrir 
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = isManager 
        ? `Olá, Gestor ${user.name.split(' ')[0]}. Painel de comando ativo. O que deseja fazer?`
        : "Olá! Sou o assistente virtual da Segurança. Como posso ajudar você hoje?";

      setMessages([
        { 
          id: 1, 
          text: greeting, 
          sender: 'bot',
          isMenu: true 
        }
      ]);
    }
  }, [isOpen, messages.length, isManager, user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const newUserMsg = { id: Date.now(), text: text, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = { id: Date.now() + 1, text: "Comando não reconhecido. Tente usar o menu.", sender: 'bot' };
      const lowerText = text.toLowerCase();

      // Respostas específicas para Gestor 
      if (isManager) {
         if (lowerText.includes('aprov')) botResponse.text = "Abrindo painel de aprovações pendentes...";
         else if (lowerText.includes('relat')) botResponse.text = "Gerando PDF do turno atual. Aguarde um instante.";
         else botResponse.text = "Entendido. Ação registrada no log do gestor.";
      } else {
         // Respostas para Operador
         if (lowerText.includes('epi')) botResponse.text = "Solicitação registrada.";
         else botResponse.text = "Um técnico irá analisar sua mensagem.";
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleOptionClick = (option) => {
    const userChoiceMsg = { id: Date.now(), text: option.label, sender: 'user' };
    setMessages(prev => [...prev, userChoiceMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botReply = { id: Date.now() + 1, text: "", sender: 'bot' };

      // LÓGICA DE RESPOSTAS 
      
      if (isManager) {
          // Respostas do Gestor
          switch(option.id) {
            case 'approvals':
              botReply.text = "Você tem 3 permissões de trabalho e 2 solicitações de EPI pendentes. Redirecionando para a área de aprovação...";
              break;
            case 'stats':
              botReply.text = "📊 *Resumo do Turno:* \n- Acidentes: 0\n- Checklists: 94% Concluídos\n- Equipe: 100% Presente.";
              break;
            case 'broadcast':
              botReply.text = "Modo de Transmissão Ativo. Digite a mensagem abaixo e ela será enviada como 'Alerta Prioritário' para todos os operadores do setor.";
              break;
            case 'team':
              botReply.text = "Sua equipe está com 96% de conformidade hoje. Ana Souza possui uma pendência de treinamento.";
              break;
            default: botReply.text = "Opção inválida.";
          }
      } else {
          // Respostas do Funcionário
          switch(option.id) {
            case 'epi':
              botReply.text = "Certo. Qual EPI você precisa repor? (Ex: Luvas, Óculos, Bota)";
              break;
            case 'maintenance':
              botReply.text = "Entendido. Qual equipamento apresenta defeito? Informe o código da máquina.";
              break;
            case 'report':
              botReply.text = "Segurança é prioridade. Descreva a situação de risco. Sua identidade será preservada.";
              break;
            case 'human':
              botReply.text = "Transferindo para o técnico de plantão. Você é o número 2 da fila.";
              break;
            default: botReply.text = "Como posso ajudar?";
          }
      }

      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="chat-window">
      <div className="chat-header" style={{background: isManager ? 'linear-gradient(135deg, #1e293b, #0f172a)' : ''}}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <div style={{background:'rgba(255,255,255,0.2)', padding:'8px', borderRadius:'50%', display:'flex'}}>
                <FaRobot style={{fontSize:'1.2rem'}}/>
            </div>
            <div>
                <h3>{isManager ? 'Assistente Gestão' : 'Suporte Safely'}</h3>
                <span style={{fontSize:'0.7rem', opacity:0.9, display:'flex', alignItems:'center', gap:'4px'}}>
                    <span style={{width:'6px', height:'6px', background:'#4ade80', borderRadius:'50%'}}></span> Online
                </span>
            </div>
        </div>
        <button onClick={onClose} className="close-chat-btn"><FaTimes /></button>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className={`message ${msg.sender === 'user' ? 'user' : 'support'}`} 
                 style={{whiteSpace: 'pre-line'}}> 
              {msg.text}
            </div>
            
            {msg.isMenu && (
                <div className="chat-options-grid">
                    {currentOptions.map(option => (
                        <button 
                            key={option.id} 
                            className="chat-option-btn"
                            onClick={() => handleOptionClick(option)}
                        >
                            <div className="option-icon" style={{background: option.color}}>{option.icon}</div>
                            <span>{option.label}</span>
                        </button>
                    ))}
                </div>
            )}
          </div>
        ))}
        
        {isTyping && (
            <div className="message support typing-indicator">
                <span></span><span></span><span></span>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
        <input 
          type="text" 
          placeholder={isManager ? "Digite um comando ou mensagem..." : "Digite sua mensagem..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit"><FaPaperPlane /></button>
      </form>
    </div>
  );
}

export default ChatWindow;