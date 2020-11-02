const AnswerItem = ({data, truthValue, handleReveal, setScore, style}) => {
  
  let truthBorder = (truthValue ? 'correct' : 'incorrect');

  function handleAnswerPress() {
    if(truthValue) {
      setScore(score => score + 1);
    };
    handleReveal();
  };


  return (
    <button className={`answer-item ${style ? truthBorder : 'neutral'}`} onClick={handleAnswerPress}>
      {data}
    </button>
  );
};

export default AnswerItem;