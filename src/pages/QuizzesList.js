import React from 'react';
import ContentCard from '../components/ContentCard';
import { quizzes } from '../data/mockData';

// Simula uma lista maior
const allQuizzes = [...quizzes];

function QuizzesList() {
  return (
    <div className="page-container">
      <title>Safely | Quizzes</title>
      <div className="page-header">
        <h1>Meus Quizzes</h1>
        <div className="filter-buttons">
          <button className="filter-btn active">Todos</button>
          <button className="filter-btn">Pendentes</button>
          <button className="filter-btn">Concluídos</button>
        </div>
      </div>
      <div className="card-grid">
        {allQuizzes.map((quiz, index) => (
          <ContentCard
            key={`${quiz.id}-${index}`}
            to={`/quiz/${quiz.id}`}
            thumbnail={quiz.thumbnail}
            title={quiz.title}
            description={`Vence em: ${quiz.dueDate}`}
            buttonText="Iniciar Quiz"
          />
        ))}
      </div>
    </div>
  );
}

export default QuizzesList;