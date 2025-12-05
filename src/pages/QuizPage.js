import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizzes } from '../data/mockData';
import { FaTrophy, FaArrowRight, FaRedo } from 'react-icons/fa';
import './Pages.css';

function QuizPage({addPoints, markQuizAsCompleted}) {
  const { id } = useParams();
  const quiz = quizzes.find(q => q.id === parseInt(id));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!quiz) return <div className="checklistPageModern">Quiz não encontrado.</div>;

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

    const pointsEarned = correctAnswersCount * 10; 
    if (pointsEarned > 0) {
      addPoints(pointsEarned);
    }

    markQuizAsCompleted(quiz.id); 
    setShowResults(true); 
  };

  // --- Tela de Resultados ---
  if (showResults) {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      const selectedOptionIndex = selectedAnswers[index];
      if (selectedOptionIndex !== undefined && question.options[selectedOptionIndex].correct) {
        score++;
      }
    });

    return (
      <div className="checklistPageModern">
        <div className="successCard">
          <div style={{fontSize: '4rem', color: '#ffca28', marginBottom: '1rem'}}>
            <FaTrophy />
          </div>
          <h2>Resultados do Quiz</h2>
          <p style={{fontSize: '1.2rem', margin: '1rem 0'}}>
            Você acertou <strong>{score}</strong> de <strong>{quiz.questions.length}</strong> perguntas!
          </p>
          
          {score > 0 && (
             <div className="pointsGained" style={{fontSize: '1.2rem', marginBottom: '2rem'}}>
                Você ganhou {score * 10} pontos!
             </div>
          )}
          
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
            <Link to="/quizzes" className="btnNewChecklist">
               Voltar aos Quizzes
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const question = quiz.questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="checklistPageModern">
      {/* Header com Barra de Progresso */}
      <div className="checklistHeaderCard" style={{paddingBottom: '4rem', position: 'relative'}}>
        <h1>{quiz.title}</h1>
        <p style={{opacity: 0.9}}>Pergunta {currentQuestionIndex + 1} de {quiz.questions.length}</p>
        
        {/* Barra de Progresso */}
        <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '100%', height: '8px', 
            background: 'rgba(0,0,0,0.2)', overflow: 'hidden', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px'
        }}>
            <div style={{
                width: `${progressPercentage}%`, height: '100%', background: '#4caf50', 
                transition: 'width 0.3s ease'
            }}></div>
        </div>
      </div>

      {/* Card da Pergunta */}
      <div className="questionCard">
        <div className="questionText">
           {question.text}
        </div>
        
        <div className="quizOptionsList">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`quizOptionItem ${selectedAnswers[currentQuestionIndex] === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
            >
              <div className="quizOptionCircle"></div>
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="submitButtonContainer" style={{display: 'flex', justifyContent: 'flex-end'}}>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button 
            className="btnNewChecklist" 
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
            style={{width: 'auto', paddingLeft: '2rem', paddingRight: '2rem'}}
          >
            Próxima <FaArrowRight style={{marginLeft: '8px'}}/>
          </button>
        ) : (
          <button 
            className="btnSubmitHuge" 
            onClick={handleSubmit}
          >
            Finalizar Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizPage;