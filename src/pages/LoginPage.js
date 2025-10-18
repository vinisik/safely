import React, { useState } from 'react';
import safelyLogo from '../assets/logo.png';

function LoginPage({ onLogin }) {
  // O estado 'name' foi removido
  const [password, setPassword] = useState('');
  const [idColaborador, setidColaborador] = useState(''); 

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede que a página recarregue
    // Validação simplificada para checar apenas o ID
    if (idColaborador.trim() !== '') {
      onLogin({ name: 'Carlos Eduardo do Vale',
         idColaborador: idColaborador ,
         profilePictureUrl: 'https://i.pravatar.cc/150?img=68'
        });
    } else {
      alert('Por favor, preencha o ID de colaborador.');
    }
  };

  // Formulário de login
  return (
    <div className="login-page">
      
        <title>Safely | Login</title>
      
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-header">
            <img src={safelyLogo} alt="Safely Logo" />
            <h2>Bem-vindo à Safely</h2>
            <p>Faça login para continuar</p>
          </div>

          {/* Campo de ID */}
          <div className="input-group">
            <label htmlFor="idColaborador">ID de Colaborador</label>
            <input
              type="text"
              id="idColaborador"
              value={idColaborador}
              onChange={(e) => setidColaborador(e.target.value)}
              placeholder="Digite seu ID"
            />
          </div>
          
          {/* Campo de Senha */}
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