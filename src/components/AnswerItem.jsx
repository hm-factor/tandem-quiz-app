const AnswerItem = ({data, correct, handleAnswer, setScore}) => {

  function handleAnswerPress() {
    if(data === correct) {
      setScore(score => score + 1);
    };
    handleAnswer();
  };

  return (
    <button className="answer-item" onClick={handleAnswerPress}>
      {data}
    </button>
  );
};

export default AnswerItem;