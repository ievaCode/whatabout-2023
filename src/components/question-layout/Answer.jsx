import { useContext } from "react";
import { Link } from "react-router-dom";
import AnswerContext from "../../contexts/AnswerContext";
import UserContext from "../../contexts/UserContext";
import UserCard from "../molecules/user-card/UserCard";
import LikeCount from "../molecules/LikeCount";


const Question = ({answer, tagNumber}) => {

  const { deleteAnswer, updateAnswer } = useContext(AnswerContext);
  const { users, loggedInUser } = useContext(UserContext);
  const answerOwner = users.find(user => user.id === answer.authorId);
  console.log(tagNumber);
  
  return (
    <article style = {{border: "1px solid black"}} className="card question">
        <div className="answerTag">Answer {tagNumber}</div>
        <UserCard userData = {answerOwner}/>
        {loggedInUser && loggedInUser.id === answerOwner.id &&
            <>
                <div className="button editButton"><Link to={`/questions/edit-answer/${answer.id}`}>Edit my answer</Link></div>
                <button className="button deleteButton" onClick = {()=> deleteAnswer(answer.id)}>Delete my answer</button>                
            </>        
        }
        <span className="date">{answer.date}</span>
        {answer.edited && <span className="edited">last edited on {answer.edited}</span>}
        {loggedInUser? 
            <LikeCount item={answer} action={updateAnswer} /> :
            <div className="statistics">                
                <span className="rate">Rate: {answer.likedBy.length-answer.dislikedBy.length}</span> 
                <span className="votes">Votes: {answer.likedBy.length+answer.dislikedBy.length}</span>               
            </div>
        }
        <div className="mainSection"> 
            <p className="answerText">{answer.answer}</p>      
        </div> 
    </article>
  );
}
 
export default Question;