import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizzes } from '../data/mockData';

function QuizPage({addPoints}) {
  const { id } = useParams();
  const quiz = quizzes.find(q => q.id === parseInt(id));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
    return <div>Quiz não encontrado.</div>;
  }

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = () => {
    let correctAnswersCount = 0;
    quiz.questions.forEach((question, index) => {
      const selectedOptionIndex = selectedAnswers[index];
      if (selectedOptionIndex !== undefined && question.options[selectedOptionIndex].correct) {
        correctAnswersCount++;
      }
    });

    const pointsEarned = correctAnswersCount * 10; // 10 pontos por acerto
    if (pointsEarned > 0) {
      addPoints(pointsEarned); // Chama a função do App.js para adicionar os pontos
    }

    setShowResults(true); // Mostra a tela de resultados
  };

  if (showResults) {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      const selectedOptionIndex = selectedAnswers[index];
      if (selectedOptionIndex !== undefined && question.options[selectedOptionIndex].correct) {
        score++;
      }
    });

    return (
      <div className="quiz-page quiz-results">
        <h2>Resultados do Quiz</h2>
        <p>Você acertou {score} de {quiz.questions.length} perguntas!</p>
        {score > 0 && <p className="points-earned">Você ganhou {score * 10} pontos!</p>}
        <Link to="/quizzes" className="btn">Voltar aos quizzes</Link>
      </div>
    );
  }
  
  const question = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <h2>{quiz.title}</h2>
      <div className="quiz-question">
        <h3>{`Pergunta ${currentQuestionIndex + 1}: ${question.text}`}</h3>
      </div>
      <div className="quiz-options">
        <ul>
          {question.options.map((option, index) => (
            <li
              key={index}
              className={selectedAnswers[currentQuestionIndex] === index ? 'selected' : ''}
              onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      </div>
      
      {currentQuestionIndex < quiz.questions.length - 1 ? (
        <button className="btn" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
          Próxima Pergunta
        </button>
      ) : (
        <button className="btn" onClick={handleSubmit}>
          Finalizar Quiz
        </button>
      )}
    </div>
  );
}

export default QuizPage;