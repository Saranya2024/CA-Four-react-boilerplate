import React, { useState, useEffect } from 'react';
import "./Result.css"; 

const Result = ({ score }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <div className="header">
        <h2 className={darkMode ? 'dark-header' : 'light-header'}>Kalvium</h2>
        <button className={`mode-button ${darkMode ? 'dark-button' : 'light-button'}`} onClick={toggleDarkMode}>
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>
      <div className="result-container">
        <div className="result-content">
          <h2>Final Results</h2>
          <p>{score} out of 5 correct - ({Math.round((score / 5) * 100)}%)</p>
        </div>
        <button className="restart-button" onClick={() => window.location.reload()}>Restart game</button>
      </div>
    </div>
  );
};

export default Result;
