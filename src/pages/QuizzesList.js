import React from 'react';
import ContentCard from '../components/ContentCard';
import { quizzes } from '../data/mockData';
import { FaClock, FaSearch, FaBrain, FaCheckCircle } from 'react-icons/fa';

// Simula uma lista maior
const allQuizzes = [...quizzes];

function QuizzesList({completedQuizzesCount, totalQuizzesCount}) {
  const pendingQuizzesCount = totalQuizzesCount - completedQuizzesCount
  return (
    <div className="page-container">
      <title>Safely | Quizzes</title>
      <div className="page-header">
        <h1>Meus Quizzes</h1>
      </div>
  
      <div className='page-container' >
        <div className="summary-cards-grid checklist-summary-grid"> {/* Adiciona classe específica */}
                          {/* Card Total */}
            <div className="summary-card">
              <div className="summary-content">
                <span className="summary-value">{totalQuizzesCount}</span>
                <span className="summary-label">Total Disponível</span>
              </div>
              <div className="summary-icon icon-total"> {/* Classe específica para cor */}
                <FaBrain size={20}/>
              </div>
            </div>
            {/* Card Pendentes */}
            <div className="summary-card">
              <div className="summary-content">
                <span className="summary-value">{pendingQuizzesCount}</span>
                <span className="summary-label">Quizzes Pendentes</span>
              </div>
              <div className="summary-icon icon-pending"> {/* Classe específica para cor */}
                <FaClock size={20}/>
              </div>
            </div>
            {/* Card Concluídos */}
            <div className="summary-card">
              <div className="summary-content">
                <span className="summary-value">{completedQuizzesCount}</span>
                <span className="summary-label">Concluídos</span>
              </div>
              <div className="summary-icon icon-completed"> {/* Classe específica para cor */}
                  <FaCheckCircle size={20}/>
              </div>
            </div>
          </div>
          <div className="search-bar-container">
          <FaSearch className="search-icon" /> 
          <input 
            type="text" 
            placeholder="Buscar treinamento..." 
            className="search-bar" 
          />
        </div>
        <div className="filter-buttons" style={{marginBottom: '20px'}}>
          <button className="filter-btn active">Todos (6)</button>
          <button className="filter-btn">Pendentes (6)</button>
          <button className="filter-btn">Concluídos (0)</button>
        </div>
        <div className="card-grid">
          {allQuizzes.map((quiz, index) => (
            <ContentCard
              key={`${quiz.id}-${index}`}
              to={`/quiz/${quiz.id}`}
              thumbnail={quiz.thumbnail}
              title={quiz.title}
              description={<p className="due-date-text">
                            <FaClock className="due-date-icon" /> {quiz.dueDate}
                          </p>}
              buttonText="Iniciar Quiz"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizzesList;