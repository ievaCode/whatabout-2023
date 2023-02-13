import { useContext} from "react";
import { Link } from "react-router-dom";

import QuestionContext from "../../contexts/QuestionContext";
import UserContext from "../../contexts/UserContext";
import Question from "./Question";


const QuestionList = () => {

  const { questions } = useContext(QuestionContext);
  const { loggedInUser, users } = useContext(UserContext);

  return (
    <div className="mainPageContainer">
      <div className="actionContainer">
        <button className="filter">Filter</button>
        <button className="sort">Sort</button>
        {loggedInUser ? 
          <Link className="addNewQuestion" to="/questions/new-question"> + Ask a Question</Link> :
          <Link className="addNewQuestion" to="/login"> + Ask a Question</Link>      
        }
      </div>
      {users ?
        <div className = "questionList">   
          {questions.map(question => 
          <Question key={question.id} question={question}/>  
          )}
        </div> :
        <p>...Loding</p>
      }
    </div>
  );
}
 
export default QuestionList;