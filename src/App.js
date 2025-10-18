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
import LoginPage from './pages/LoginPage'; 
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';

const SettingsPage = () => <div style={{padding: '2rem', textAlign: 'center'}}><title>Safely | Configurações</title><h2>Página de Configurações (Em breve)</h2></div>;

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null); // Limpa o estado do usuário, efetivamente fazendo o logout
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Header user={user} onLogout={handleLogout}/> 
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/video/:id" element={<VideoPage />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
              <Route path="/videos" element={<VideosList />} />
              <Route path="/quizzes" element={<QuizzesList />} />
              <Route path="/checklists" element={<ChecklistsList />} />
              <Route path="/pontos" element={<MyPoints />} />
              <Route path="/recompensas" element={<RewardsPage />} />
              <Route path="/perfil" element={<ProfilePage user={user} />} />
              <Route path="/configuracoes" element={<SettingsPage />} />
            </Routes>
          </main>
        <Footer />
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;