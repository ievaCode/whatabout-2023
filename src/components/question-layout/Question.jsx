import { useContext } from "react";
import { Link, useNavigate  } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import QuestionContext from "../../contexts/QuestionContext";
import AnswerContext from "../../contexts/AnswerContext";
import UserCard from "../molecules/user-card/UserCard";
import LikeCount from "../molecules/LikeCount";


const Question = ({question}) => {

  const { users, loggedInUser } = useContext(UserContext);
  const { updateQuestion, deleteQuestion } = useContext(QuestionContext);
  const { answers } = useContext(AnswerContext);

  const navigation = useNavigate();

  const questionOwner = users.find(user => user.id === question.authorId);

  const numberOfAnswers = answers.filter(answer => answer.questionId === question.id).length;

  const onDeleteQuestion = (id) => {
    deleteQuestion(id);
    // const relevantAnswers = answers.filter(answer => answer.questionId === id);
    // relevantAnswers.forEach(answer => deleteAnswer(answer.id));
    navigation('/questions');  
  }

  return (
    <article style = {{border: "1px solid black"}} className="card question">
        <div className="numberOfAnswers">
            <span>answers: {numberOfAnswers}</span>
        </div>
        <UserCard userData = {questionOwner}/>
        {loggedInUser && loggedInUser.id === questionOwner.id &&
            <>
                <div className="button editButton"><Link to={`/questions/edit-question/${question.id}`}>Edit my question</Link></div>
                <button className="button deleteButton" onClick = {()=>onDeleteQuestion(question.id)}>Delete my question</button>          
            </>        
        }        
        <span className="date">{question.date}</span>
        {question.edited && <span className="edited">last edited on {question.edited}</span>}
        {loggedInUser? 
            <LikeCount item={question} action={updateQuestion} /> :
            <div className="statistics">
                <span className="rate">Rate: {question.likedBy.length-question.dislikedBy.length}</span>
                <span className="votes">Votes: {question.likedBy.length+question.dislikedBy.length}</span>
            </div>
        }
        <div className="mainSection">   
            <Link className="questionHeading" to={`/questions/${question.id}`}>{question.question}</Link>
            <p className="questionText">{question.explanation}</p>      
        </div> 
        {loggedInUser && <div className="button addAnswer">
            <Link to={`/questions/${question.id}/new-answer`}>Add Your answer</Link>
        </div>}
    </article>
  );
}
 
export default Question;