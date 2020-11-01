import './app.css';
import data from './data.json';
import { useState, useEffect } from 'react';

function App() {
  const [questions, setQuestions] = useState([]);
  const [begin, setBegin] = useState(false);
  const [count, setCount] = useState(0);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    console.log(questions)
  }, [questions]);

  const tenRandQuestions = [];

  function selectQuestions() {
    while (tenRandQuestions.length < 10) {
      let rand = Math.floor(Math.random() * Math.floor(data.length));

      if (!tenRandQuestions.includes(rand)) tenRandQuestions.push(rand);
    }
  }
  
  function handleBegin() {
    selectQuestions();
    setQuestions(tenRandQuestions);
    setBegin(true);
    setEnd(false);
  };

  function handleAnswer() {
    setCount(count => count + 1);
    if (count === 9) {
      setEnd(true);
      setBegin(false);
    };
  }

  let currData = data[questions[count]];

  if (begin && currData) {
    return (
      <div className="App">
        <h1 className="question-item">{currData.question}</h1>
        <div className="answers-grid">
          <button onClick={handleAnswer} className="answer-item">{currData.correct}</button>
          <button onClick={handleAnswer} className="answer-item">{currData.incorrect[0]}</button>
          <button onClick={handleAnswer} className="answer-item">{currData.incorrect[1]}</button>
          <button onClick={handleAnswer} className="answer-item">{currData.incorrect[2]}</button>
        </div>
      </div>
    );
  } else if (end) {
    return (
      <div className="App">
        <h1>Congrats you win</h1>
        <button onClick={handleBegin}>Play Again?</button>
      </div>
    )
  } else if (!begin) {
    return (
      <div className="App">
        <button className="begin" onClick={handleBegin}>Begin Quiz</button>
      </div>
    )
  }
}

export default App;
