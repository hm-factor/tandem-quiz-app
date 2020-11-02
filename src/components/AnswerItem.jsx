const AnswerItem = ({data, truthValue, handleReveal, setScore, style}) => {

  let truthBorder = (truthValue ? 'correct' : 'incorrect');

  function handleAnswerPress() {
    if(truthValue) {
      setScore(score => score + 1);
    };
    handleReveal();
  };

  // hacky way of disabling buttons after first click -- tether it to the styling
  // because it is styled differently when exposing the answer, it has a truth value associated with pre- and post- answer
  return (
    <button disabled={style} className={`answer-item ${style ? truthBorder : 'neutral'}`} onClick={handleAnswerPress}>
      {data}
    </button>
  );
};

export default AnswerItem;