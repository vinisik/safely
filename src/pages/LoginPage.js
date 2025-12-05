import React, { useState } from 'react';
import safelyLogoLogin from '../assets/safelyLogin.png';
import kaduPic from '../assets/kadu.png';
import elisPic from '../assets/elis.png';
import gabrielPic from '../assets/gabriel.png';
import rafaelaPic from '../assets/rafaela.png';
import viniciusPic from '../assets/vinicius.png';
import gerentePic from '../assets/gerente.png';
import defaultPic from '../assets/profile-placeholder.png'; 
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa';

// Importa o CSS Unificado
import './Pages.css';

function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [idColaborador, setidColaborador] = useState(''); 

  const handleSubmit = (event) => {
    event.preventDefault(); // Lógica original mantida

    if (idColaborador.trim() === '') {
      alert('Por favor, preencha o ID de colaborador.');
      return; 
    }

    // Lógica de seleção de usuário original mantida
    let userName;
    let profilePic;
    let userRole = 'colaborador';

    if (idColaborador === 'kadu123') { userName = 'Carlos Eduardo'; profilePic = kaduPic; }
    else if (idColaborador === 'elis123') { userName = 'Elis Santos'; profilePic = elisPic; }
    else if (idColaborador === 'gabriel123') { userName = 'Gabriel Maciel'; profilePic = gabrielPic; }
    else if (idColaborador === 'rafaela123') { userName = 'Rafaela Souza'; profilePic = rafaelaPic; }
    else if (idColaborador === 'vinicius123') { userName = 'Vinicius Siqueira'; profilePic = viniciusPic; }
    else if (idColaborador === 'gerente123') { 
        userName = 'Gestor';
        profilePic = gerentePic; 
        userRole = 'gestor'; 
    } else {
      userName = 'Usuário'; 
      profilePic = defaultPic; 
      userRole = 'colaborador'; 
    }

    onLogin({ 
      name: userName, 
      idColaborador: idColaborador,
      profilePictureUrl: profilePic,
      role: userRole
    });
  };

  return (
    <div className="loginPageModern">
      <title>Safely | Login</title>
      
      <div className="loginCardGlass">
        <form onSubmit={handleSubmit}>
          <div className="loginHeaderModern">
            <img src={safelyLogoLogin} alt="Safely Logo" />
            <h2>Bem-vindo de volta</h2>
            <p>Acesse sua conta para continuar</p>
          </div>

          {/* Campo de ID com Ícone */}
          <div className="inputGroupModern">
            <label htmlFor="idColaborador">ID de Colaborador</label>
            <div className="inputWrapper">
               <FaUser className="inputIcon" />
               <input
                 type="text"
                 id="idColaborador"
                 className="inputModern"
                 value={idColaborador}
                 onChange={(e) => setidColaborador(e.target.value)}
               />
            </div>
          </div>
          
          {/* Campo de Senha com Ícone */}
          <div className="inputGroupModern">
            <label htmlFor="password">Senha</label>
            <div className="inputWrapper">
              <FaLock className="inputIcon" />
              <input
                type="password"
                id="password"
                className="inputModern"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <button type="submit" className="btnLoginModern">
            Entrar na Plataforma <FaArrowRight style={{marginLeft: '8px', fontSize: '0.9rem'}}/>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;