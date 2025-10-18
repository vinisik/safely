import React, { useState } from 'react';
import safelyLogo from '../assets/logo.png';

// A função 'onLogin' será recebida como uma propriedade (prop) do App.js
function LoginPage({ onLogin }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede que a página recarregue
    if (name.trim() !== '') { // Validação simples para ver se o nome não está vazio
      onLogin({ name: name }); // Chama a função do App.js, passando o nome do usuário
    } else {
      alert('Por favor, insira seu nome.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          {/* Pode usar o seu logo aqui também */}
          <div className="login-header">
            <img src={safelyLogo} alt="Safely Logo" />
            <h2>Bem-vindo ao Safely</h2>
            <p>Faça login para continuar</p>
          </div>
          
          <div className="input-group">
            <label htmlFor="name">Nome de Usuário</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>
          
          <button type="submit" className="btn btn-login">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;