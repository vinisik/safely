import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { quizzes } from '../data/mockData';
import { FaClock, FaSearch, FaBrain, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';
import './Pages.css'; 

const allQuizzes = [...quizzes];

function QuizzesList({completedQuizzesCount, totalQuizzesCount}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const pendingQuizzesCount = totalQuizzesCount - completedQuizzesCount;

  const filteredQuizzes = allQuizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="checklistPageModern">
      <title>Safely | Quizzes</title>
      
      <div className="pageHeaderModern">
        <h1>Meus Quizzes</h1>
      </div>
  
      {/* Resumo */}
      <div className="summaryGridModern">
        <div className="summaryCardGlass">
          <div className="summaryContent">
            <h3>{totalQuizzesCount}</h3>
            <span>Total</span>
          </div>
          <div className="summaryIconBox iconTotal">
            <FaBrain />
          </div>
        </div>

        <div className="summaryCardGlass">
          <div className="summaryContent">
            <h3>{pendingQuizzesCount}</h3>
            <span>Pendentes</span>
          </div>
          <div className="summaryIconBox iconPending">
            <FaClock />
          </div>
        </div>

        <div className="summaryCardGlass">
          <div className="summaryContent">
            <h3>{completedQuizzesCount}</h3>
            <span>Concluídos</span>
          </div>
          <div className="summaryIconBox iconCompleted">
              <FaCheckCircle />
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="controlsContainer">
        <div className="searchBarGlass">
          <FaSearch className="searchIconModern" /> 
          <input 
            type="text" 
            placeholder="Buscar quiz..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filterPills">
          <button 
            className={`filterBtnPill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Todos
          </button>
          <button 
            className={`filterBtnPill ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveFilter('pending')}
          >
            Pendentes
          </button>
          <button 
            className={`filterBtnPill ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveFilter('completed')}
          >
            Concluídos
          </button>
        </div>
      </div>

      {/* Grid de Quizzes */}
      <div className="mediaGridModern">
        {filteredQuizzes.map((quiz, index) => (
          <Link 
            key={`${quiz.id}-${index}`}
            to={`/quiz/${quiz.id}`} // Nota: Verifique se sua rota é /quiz/ ou /quizzes/ no App.js
            className="mediaCardGlass"
          >
            <div className="mediaThumbnailContainer">
              <img src={quiz.thumbnail} alt={quiz.title} className="mediaThumbnail" />
              <div className="mediaOverlayIcon">
                <FaQuestionCircle />
              </div>
            </div>
            
            <div className="mediaContent">
              <h3>{quiz.title}</h3>
              <div className="mediaMeta">
                <FaClock /> <span>{quiz.dueDate}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuizzesList;