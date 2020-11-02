import './app.css';
import data from './util/data.json';
import { useState, useEffect } from 'react';
import AnswerItem from './components/AnswerItem';
import shuffle from './util/shuffle';

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [begin, setBegin] = useState(false);
  const [count, setCount] = useState(0);
  const [end, setEnd] = useState(false);
  const [score, setScore] = useState(0);
  const [style, setStyle] = useState(false);

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
    setStyle(value => !value);
  }
  
  function handleReveal() {
    setStyle(value => !value)
  }

  let currData = data[questions[count]];
  // the order of the answers kept switching after clicking on an answer
  // with useEffect I can make it so that only happens when the question changes
  useEffect(() => {
    if (currData) {
      let possibleAnswers = [...currData.incorrect, currData.correct];
      let shuffledAnswers = shuffle(possibleAnswers);
      setAnswers(shuffledAnswers);
    }
  }, [currData]);

  if (begin && currData) {
    let answerItems = answers.map( (data, idx) => {
    let truthValue = (data === currData.correct ? true : false);

      return (
        <AnswerItem 
          key={idx} 
          data={data} 
          setScore={setScore}
          truthValue={truthValue}
          handleReveal={handleReveal}
          style={style}
          />
      )
    });

    return (
      <div className="App">
        <h1 className="question-item">{currData.question}</h1>
        <div className="answers-grid">
          {answerItems}
          <button className={`next-button ${style ? 'on' : 'off'}`} onClick={handleAnswer}>Next Question</button>
        </div>
      </div>
    );
  } else if (end) {
    return (
      <div className="App">
        <h1>You got {score} out of 10 questions correct!</h1>
        {/* <button onClick={handleBegin}>Play Again?</button> */}
      </div>
    )
  } else if (!begin) {
    return (
      <div className="App">
        <button className="begin" onClick={handleBegin}>Begin Quiz</button>
      </div>
    )
  } else {
    return (
      <div className="App">Loading...</div>
    )
  }
}

export default App;