import React, { useState, useEffect, useRef } from 'react';
import './Components.css'; // Importa o CSS

function ChatWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'support', text: 'Olá! Como podemos ajudar hoje?' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage = { id: Date.now(), sender: 'user', text: newMessage };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    setTimeout(() => {
      const supportResponse = { 
        id: Date.now() + 1, 
        sender: 'support', 
        text: 'Obrigado pelo seu contato! Sua mensagem foi recebida pela gestão e será analisada em breve.' 
      };
      setMessages(prev => [...prev, supportResponse]);
    }, 1500);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>Suporte Safely</h3>
        <button onClick={onClose} className="close-chat-btn">×</button>
      </div>
      
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ChatWindow;