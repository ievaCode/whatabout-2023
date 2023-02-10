import { useContext } from "react";
import { Link } from "react-router-dom";

import QuestionContext from "../../contexts/QuestionContext";
import UserContext from "../../contexts/UserContext";
import Question from "./Question";


const QuestionList = () => {

  const { questions } = useContext(QuestionContext);
  const { loggedInUser, users } = useContext(UserContext);

  return (
    <>
      {loggedInUser ? 
        <Link className="addNewPost" to="/questions/new-question"> + Add new Question</Link> :
        <Link className="addNewPost" to="/login"> + Add new Question</Link>      
      }
      {users ?
        <div className = "questionList">   
          {questions.map(question => 
          <Question key={question.id} question={question}/>  
          )}
        </div> :
        <p>...Loding</p>
      }
    </>
  );
}
 
export default QuestionList;