import './app.css';
import data from './data.json';
import { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [begin, setBegin] = useState(false);

  const tenRandQuestions = [];

  useEffect(() => {
    console.log(questions)
  }, [questions]);

  function selectQuestions() {
    while (tenRandQuestions.length < data.length) {
      let rand = Math.floor(Math.random() * Math.floor(data.length));

      if (!tenRandQuestions.includes(rand)) tenRandQuestions.push(rand);
    }
  }
  
  function handleBegin() {
    selectQuestions();
    setQuestions(tenRandQuestions);
    setBegin(true);
  };

  if (begin) {
    return (
      <div className="App">
        <h1 className="question-item">{data[0].question}</h1>
        <div className="answers-grid">
          <button className="answer-item">{data[0].correct}</button>
          <button className="answer-item">{data[0].incorrect[0]}</button>
          <button className="answer-item">{data[0].incorrect[1]}</button>
          <button className="answer-item">{data[0].incorrect[2]}</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <button className="begin" onClick={handleBegin}>Begin Quiz</button>
      </div>
    )
  }
}

export default App;
