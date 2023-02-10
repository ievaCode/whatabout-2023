import { useContext } from "react";

import QuestionContext from "../../contexts/QuestionContext";
import UserContext from "../../contexts/UserContext";
import Question from "./Question";


const QuestionList = () => {

  const { questions } = useContext(QuestionContext);
  const { users } = useContext(UserContext);

  return (
    users ?
      <div className = "questionList">   
        {questions.map(question => 
        <Question key={question.id} question={question}/>  
        )}
      </div> :
      <p>...Loding</p>
  );
}
 
export default QuestionList;