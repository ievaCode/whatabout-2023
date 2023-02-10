import { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import QuestionContext from "../../contexts/QuestionContext";
import AnswerContext from "../../contexts/AnswerContext";
import UserCard from "../molecules/user-card/UserCard";

import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"


const Question = ({question}) => {

  const { users, loggedInUser } = useContext(UserContext);
  const { editQuestion, deleteQuestion } = useContext(QuestionContext);
  const { answers } = useContext(AnswerContext);

  const questionOwner = users.find(user => user.id === question.authorId);

  const numberOfAnswers = answers.filter(answer => answer.questionId === question.id).length;

  return (
    <article style = {{border: "1px solid black"}} className="card question">
        <span>id: {question.id}</span>
        <div className="numberOfAnswers">
            <span>answers: {numberOfAnswers}</span>
        </div>
        <UserCard userData = {questionOwner}/>
        {loggedInUser && loggedInUser.id === questionOwner.id &&
            <>
                <div className="button editButton"><Link to={`/questions/edit-question/${question.id}`}>Edit my question</Link></div>
                <button className="button deleteButton">Delete my question</button>          
            </>        
        }
        <span className="date">{question.date}</span>
        {question.edited && <span className="edited">last edited on {question.edited}</span>}
        <div className="likeWrapper" >
            <img style = {{width:"24px", height: "auto"}} className="likeButton" src={like} alt="" />
            <span className="rate">{question.rate}</span>
            <img style = {{width:"24px", height: "auto"}} className="dislikeButton" src={dislike} alt="" />
        </div>
        <div className="mainSection">   
            <Link className="questionHeading" to={`/questions/${question.id}`}>{question.question}</Link>
            <p className="questionText">{question.explanation}</p>      
        </div> 
        {loggedInUser && <button className="button addAnswer">Add your answer</button>}
    </article>
  );
}
 
export default Question;