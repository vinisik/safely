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
  const pendingChecklistsCount = checklistsData.filter(c => c.status === 'pending').length;

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
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
            <Route path="/videos/:id" element={<VideoPage />} />
            <Route path="/quizzes" element={<QuizzesList />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route 
              path="/checklists" 
              element={<ChecklistsList checklists={checklistsData} addChecklist={addChecklist} deleteChecklist={deleteChecklist} />} 
            />
            <Route 
              path="/checklists/:id" 
              element={<ChecklistPage user={user} checklists={checklistsData} updateChecklistStatus={updateChecklistStatus}/>} 
            />
            <Route path="/recompensas" element={<RewardsPage />} />
            <Route path="/pontos" element={<MyPoints />} />
            {/* --- GARANTA QUE ESTA LINHA ESTEJA CORRETA --- */}
            <Route 
              path="/perfil" 
              element={<ProfilePage user={user} checklists={checklistsData} />} 
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