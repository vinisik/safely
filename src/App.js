import React, { useState } from 'react'; // Importe o useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import VideoPage from './pages/VideoPage';
import QuizPage from './pages/QuizPage';
import VideosList from './pages/VideosList';
import QuizzesList from './pages/QuizzesList';
import ChecklistsList from './pages/ChecklistsList';
import MyPoints from './pages/MyPoints';
import LoginPage from './pages/LoginPage'; // 1. Importe a página de login

function App() {
  // 2. Crie um estado para armazenar os dados do usuário
  // O valor inicial é 'null', significando que ninguém está logado.
  const [user, setUser] = useState(null);

  // 3. Crie a função que será chamada pela LoginPage
  const handleLogin = (userData) => {
    setUser(userData); // Atualiza o estado com os dados do usuário (o nome)
  };

  // 4. Se não houver usuário logado, mostre a tela de login
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // 5. Se houver um usuário, mostre a plataforma completa
  return (
    <Router>
      <div className="app-container">
        <Header user={user} /> {/* Passe o usuário para o Header */}
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/videos" element={<VideosList />} />
            <Route path="/quizzes" element={<QuizzesList />} />
            <Route path="/checklists" element={<ChecklistsList />} />
            <Route path="/pontos" element={<MyPoints />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;