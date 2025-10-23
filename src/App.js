import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checklists as initialChecklists } from './data/mockData';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingChatButton from './components/FloatingChatButton'; 
import ChatWindow from './components/ChatWindow';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import VideosList from './pages/VideosList';
import VideoPage from './pages/VideoPage';
import QuizzesList from './pages/QuizzesList';
import QuizPage from './pages/QuizPage';
import ChecklistsList from './pages/ChecklistsList';
import ChecklistPage from './pages/ChecklistPage';
import RewardsPage from './pages/RewardsPage';
import MyPoints from './pages/MyPoints';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

// Páginas Placeholder
const SettingsPage = () => <div style={{padding: '2rem', textAlign: 'center'}}><h2>Página de Configurações (Em breve)</h2></div>;

function App() {
  const [user, setUser] = useState(null);
  const [checklistsData, setChecklistsData] = useState(initialChecklists);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedVideoIds, setCompletedVideoIds] = useState(new Set());
  const pendingChecklistsCount = checklistsData.filter(c => c.status === 'pending').length;

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null); // Limpa o usuário logado
    setTotalPoints(1250); // Reseta a pontuação para o valor inicial
    setChecklistsData(initialChecklists); // Reseta a lista de checklists para a original
    setCompletedVideoIds(new Set()); // Limpa a lista de vídeos concluídos
    setIsChatOpen(false);
  };

  const markVideoAsCompleted = (videoId, pointsValue = 75) => { // Pontuação padrão de 75
    // Verifica se o vídeo JÁ FOI concluído antes
    if (!completedVideoIds.has(videoId)) {
      addPoints(pointsValue); // Adiciona os pontos
      // Adiciona o ID do vídeo ao conjunto de concluídos
      setCompletedVideoIds(prevIds => new Set(prevIds).add(videoId)); 
      console.log(`Vídeo ${videoId} concluído! +${pointsValue} pontos.`); // Para depuração
    } else {
      console.log(`Vídeo ${videoId} já foi concluído anteriormente.`); // Para depuração
    }
  };
  
  const addChecklist = (newChecklist) => {
    setChecklistsData(prevChecklists => [newChecklist, ...prevChecklists]);
  };

  const deleteChecklist = (idToDelete) => {
    setChecklistsData(prevChecklists => prevChecklists.filter(checklist => checklist.id !== idToDelete));
  };

  const updateChecklistStatus = (checklistId, newStatus) => {
    setChecklistsData(prevChecklists => 
      prevChecklists.map(checklist => 
        checklist.id === checklistId 
          ? { ...checklist, status: newStatus } // Se encontrar o ID, atualiza o status
          : checklist // Senão, mantém o checklist como está
      )
    );
  };

  const addPoints = (pointsToAdd) => {
    setTotalPoints(prevPoints => prevPoints + pointsToAdd);
  };


  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="app-container">
        <Header user={user} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard checklists={checklistsData} />} />
            <Route path="/videos" element={<VideosList />} />
            <Route path="/videos/:id" element={<VideoPage markVideoAsCompleted={markVideoAsCompleted} completedVideoIds={completedVideoIds}/>} />
            <Route path="/quizzes" element={<QuizzesList />} />
            <Route path="/quiz/:id" element={<QuizPage addPoints={addPoints}/>} />
            <Route 
              path="/checklists" 
              element={<ChecklistsList checklists={checklistsData} addChecklist={addChecklist} deleteChecklist={deleteChecklist} />} 
            />
            <Route 
              path="/checklists/:id" 
              element={<ChecklistPage user={user} checklists={checklistsData} updateChecklistStatus={updateChecklistStatus} addPoints={addPoints}/>} 
            />
            <Route path="/recompensas" element={<RewardsPage totalPoints={totalPoints}/>} />
            <Route path="/pontos" element={<MyPoints totalPoints={totalPoints}/>}/>
            <Route 
              path="/perfil" 
              element={<ProfilePage user={user} checklists={checklistsData} totalPoints={totalPoints}/>} 
            />
            <Route path="/configuracoes" element={<SettingsPage />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav pendingCount={pendingChecklistsCount}/>
        <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        {!isChatOpen && <FloatingChatButton onClick={() => setIsChatOpen(true)} />}
      </div>
    </Router>
  );
}

export default App;