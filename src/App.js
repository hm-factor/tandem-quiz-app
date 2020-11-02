import './app.css';
import data from './util/data.json';
import { useState, useEffect } from 'react';
import AnswerItem from './components/AnswerItem';
import shuffle from './util/shuffle';

function App() {
  const [questions, setQuestions] = useState([]);
  const [begin, setBegin] = useState(false);
  const [count, setCount] = useState(0);
  const [end, setEnd] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    console.log(score)
  }, [score]);

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

    let possibleAnswers = [...currData.incorrect, currData.correct];
    let shuffledAnswers = shuffle(possibleAnswers);

    let answerItems = shuffledAnswers.map( (data, idx) => {
      return (
        <AnswerItem 
          key={idx} 
          data={data} 
          handleAnswer={handleAnswer}
          correct={currData.correct}
          setScore={setScore}/>
      )
    });

    return (
      <div className="App">
        <h1 className="question-item">{currData.question}</h1>
        <div className="answers-grid">
          {answerItems}
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