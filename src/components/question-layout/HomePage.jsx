import { useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";

import QuestionContext from "../../contexts/QuestionContext";
import AnswerContext from "../../contexts/AnswerContext";
import UserContext from "../../contexts/UserContext";
import Question from "./Question";
import SortPanel from "../molecules/sort-panel/SortPanel";

const QuestionList = () => {

  const { questions } = useContext(QuestionContext);
  const { answers } = useContext(AnswerContext);
  const { users, loggedInUser } = useContext(UserContext);
  const [sortedQuestions, setSortedQuestions] = useState(questions.reverse());

  useEffect(() => {
    setSortedQuestions(questions);
  }, [questions]);

  return (
    <div className="homePageContainer">
      <div className="actionContainer">
        {loggedInUser ? 
          <Link className="addNewQuestion" to="/questions/new-question"> + Ask a Question</Link> :
          <Link className="addNewQuestion" to="/login"> + Ask a Question</Link>      
        }
        <SortPanel sortedQuestions = {sortedQuestions} setSortedQuestions = {setSortedQuestions}/>
      </div>
      {questions && users ?
        <div className = "questionList">
          {sortedQuestions.map(question => 
            <Question 
              key={question.id}
              question={question}
              numberOfAnswers = {answers.filter(answer => answer.questionId === question.id).length} />  
          )}
        </div> 
        : <p className="loading">...Loading</p>
      }
    </div>
  );
}
 
export default QuestionList;