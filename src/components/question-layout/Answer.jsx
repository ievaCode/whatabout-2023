import { useContext } from "react";
import AnswerContext from "../../contexts/AnswerContext";
import UserContext from "../../contexts/UserContext";
import UserCard from "../molecules/user-card/UserCard";

import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"

const Question = ({answer, tagNumber}) => {

  const { answers } = useContext(AnswerContext);
  const { users, loggedInUser } = useContext(UserContext);
  const answerOwner = users.find(user => user.id === answer.authorId);
  console.log(tagNumber);
  
  return (
    <article style = {{border: "1px solid black"}} className="card question">
        <div className="answerTag">Answer {tagNumber}</div>
        <span>id: {answer.id}</span> 
        <UserCard userData = {answerOwner}/>
        {loggedInUser && loggedInUser.id === answerOwner.id &&
            <>
                <div className="button editButton">Edit my answer</div>
                <button className="button deleteButton">Delete my answer</button>                
            </>        
        }
        <span className="date">{answer.date}</span>
        {answer.edited && <span className="edited">last edited on {answer.edited}</span>}
        <div className="likeWrapper" >
            <img style = {{width:"24px", height: "auto"}} className="likeButton" src={like} alt="" />
            <span className="rate">{answer.rate}</span>
            <img style = {{width:"24px", height: "auto"}} className="dislikeButton" src={dislike} alt="" />
        </div>
        <div className="mainSection"> 
            <p className="answerText">{answer.answer}</p>      
        </div> 
    </article>
  );
}
 
export default Question;