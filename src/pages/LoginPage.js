import React, { useState } from 'react';
import safelyLogoLogin from '../assets/safelyLogin.png';
import kaduPic from '../assets/kadu.png';
import elisPic from '../assets/elis.png';
import gabrielPic from '../assets/gabriel.png';
import rafaelaPic from '../assets/rafaela.png';
import viniciusPic from '../assets/vinicius.png';

function LoginPage({ onLogin }) {
  // O estado 'name' foi removido
  const [password, setPassword] = useState('');
  const [idColaborador, setidColaborador] = useState(''); 

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validação de campo vazio
    if (idColaborador.trim() === '') {
      alert('Por favor, preencha o ID de colaborador.');
      return; // Interrompe a função
    }

    let userName;
    let profilePic;
    let userRole = 'colaborador';

    if (idColaborador === 'kadu123') { userName = 'Carlos Eduardo'; profilePic = kaduPic; }
    else if (idColaborador === 'elis123') { userName = 'Elis Santos'; profilePic = elisPic; }
    else if (idColaborador === 'gabriel123') { userName = 'Gabriel Maciel'; profilePic = gabrielPic; }
    else if (idColaborador === 'rafaela123') { userName = 'Rafaela Souza'; profilePic = rafaelaPic; }
    else if (idColaborador === 'vinicius123') { userName = 'Vinicius Siqueira'; profilePic = viniciusPic; }
    else if (idColaborador === 'gerente123') { // ID do Gestor
        userName = 'Jose Gestor';
        profilePic = 'https://i.pravatar.cc/150?img=5'; // Foto diferente
        userRole = 'gestor'; // Define o papel como gestor
    }

    // Passa o objeto de usuário com o nome e foto corretos
    onLogin({ 
      name: userName, 
      idColaborador: idColaborador,
      profilePictureUrl: profilePic,
      role: userRole
    });
  };

  // Formulário de login
  return (
    <div className="login-page">
      
        <title>Safely | Login</title>
      
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-header">
            <img src={safelyLogoLogin} alt="Safely Logo" />
            <h2>Bem-vindo(a) à SAFELY</h2>
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