import React, { useState, useEffect } from 'react';
import questions from "../questions.js";
import Result from './Result'; 
import "./QuestionBox.css";

const QuestionBox = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    new Array(questions.length).fill(null)
  );
  const [darkMode, setDarkMode] = useState(true);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [showResult, setShowResult] = useState(false); 

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOptionClick = (optionId) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = optionId;
    setSelectedAnswers(updatedAnswers);
    if (currentQuestionIndex === questions.length - 1) {
      setShowResult(true); 
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleHighlightClick = () => {
    setIsHighlighted(true);
  };

  const handleRemoveHighlightClick = () => {
    setIsHighlighted(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const calculateScore = () => {
    let correctAnswers = 0;
    selectedAnswers.forEach((answerIndex, questionIndex) => {
      const correctOption = questions[questionIndex].options.findIndex(option => option.isCorrect);
      if (answerIndex === correctOption) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  return (
    <div>
      {showResult ? (
        <Result score={calculateScore()} />
      ) : (
        <div>
          <div className={`header ${darkMode ? 'dark-header' : 'light-header'}`}>
            <h2>Kalvium</h2>
            <button className={`mode-button ${darkMode ? 'dark-button' : 'light-button'}`} onClick={toggleDarkMode}>
              {darkMode ? 'Light' : 'Dark'}
            </button>
          </div>
          <div className="question-container">
            <h2>Question: {currentQuestionIndex + 1} out of {questions.length}</h2>
            <p className={isHighlighted ? 'highlighted' : 'normal'}>{currentQuestion.text}</p>
            <div className="option-container">
              {currentQuestion.options && currentQuestion.options.map((option, index) => (  
                <div key={index}>
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="answer"
                    value={option.id}
                    checked={selectedAnswers[currentQuestionIndex] === option.id}
                    onChange={() => handleOptionClick(option.id)}
                  />
                  <label htmlFor={`option-${index}`}>{option.text}</label>
                </div>
              ))}
            </div>
            <div className="button-container">
              <button className="highlight-button" onClick={handleHighlightClick}>Highlight</button>
              <button className="remove-highlight-button" onClick={handleRemoveHighlightClick}>Remove Highlight</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBox;
