const AnswerItem = ({data, onClick}) => {

  return (
    <button className="answer-item" onClick={onClick}>
      {data}
    </button>
  );
};

export default AnswerItem;