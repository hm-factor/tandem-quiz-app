const AnswerItem = (props) => {
  console.log(props);

  return (
    <button className="answer-item" onClick={props.onClick}>
      {props.data}
    </button>
  );
};

export default AnswerItem;