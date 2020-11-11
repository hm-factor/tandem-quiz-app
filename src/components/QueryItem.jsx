import React from "react";
import { useQuery } from 'react-query';

const fetchQuestions = async () => {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=12&category=20&difficulty=easy&type=multiple"
  );
  return response.json();
};

const QueryItem = () => {
  const { data, status } = useQuery("questions", fetchQuestions);

  return (
    <div>
      {status === "loading" && <div>Loading...</div>}

      {status === "error" && <div>Couldn't fetch data -- try again later</div>}

      {status === "success" && <div>
        {data.results.map( data => <div>{data.question}</div> )}
        </div>}
    </div>
  );
}

export default QueryItem;
