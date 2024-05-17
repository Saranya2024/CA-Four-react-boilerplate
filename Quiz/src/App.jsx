import React, { useState } from 'react';
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import './App.css';

function App() {
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      {showResult ? <Result score={score} /> : <QuestionBox onQuizComplete={setShowResult} />}
    </div>
  );
}

export default App;
