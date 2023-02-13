import { useContext } from "react";
import { Link } from "react-router-dom";
import AnswerContext from "../../contexts/AnswerContext";
import UserContext from "../../contexts/UserContext";
import UserCard from "../molecules/user-card/UserCard";
import LikeCount from "../molecules/like-count/LikeCount";


const Question = ({answer, tagNumber}) => {

  const { deleteAnswer, updateAnswer } = useContext(AnswerContext);
  const { users, loggedInUser } = useContext(UserContext);
  const answerOwner = users.find(user => user.id === answer.authorId);
  console.log(tagNumber);
  
  return (
    <article className="card answerCard">
        <div className="answerTag">Answer {tagNumber}</div>
        <div className="topSectionContainer">
            <div className="dateContainer">
                <span className="date">posted: {answer.date}</span>
                {answer.edited && <span className="date edited">last edited on: {answer.edited}</span>}
            </div>
            {loggedInUser && loggedInUser.id === answerOwner.id ?
                <div className="manageButtonsWrapper">
                    <div className="button editButton"><Link to={`/questions/edit-answer/${answer.id}`}>Edit</Link></div>
                    <button className="button deleteButton" onClick = {()=>deleteAnswer(answer.id)}>Delete</button>          
                </div>  :
                <UserCard userData = {answerOwner}/>      
            }    
        </div>
        <div className="mainSectionContainer">
            <div className="leftSideContainer">                
                {loggedInUser? 
                    <LikeCount item={answer} action={updateAnswer} /> :
                    <div className="statistics">
                        <p className="rateWrapper">rate: 
                            <span className="rate"> {answer.likedBy.length-answer.dislikedBy.length}</span>
                        </p>
                        <p className="votes">from total votes of {answer.likedBy.length+answer.dislikedBy.length}</p>
                    </div>
                }
            </div>
            <div className="rightSideContainer">
                <p className="answerText questionText">{answer.answer}</p>   
            </div>
        </div>

        
        {/* <UserCard userData = {answerOwner}/>
        {loggedInUser && loggedInUser.id === answerOwner.id &&
            <>
                <div className="button editButton"><Link to={`/questions/edit-answer/${answer.id}`}>Edit my answer</Link></div>
                <button className="button deleteButton" onClick = {()=> deleteAnswer(answer.id)}>Delete my answer</button>                
            </>        
        }
        <span className="date">{answer.date}</span>
        {answer.edited && <span className="edited">last edited on {answer.edited}</span>} */}
        {/* {loggedInUser? 
            <LikeCount item={answer} action={updateAnswer} /> :
            <div className="statistics">                
                <span className="rate">Rate: {answer.likedBy.length-answer.dislikedBy.length}</span> 
                <span className="votes">Votes: {answer.likedBy.length+answer.dislikedBy.length}</span>               
            </div>
        }
        <div className="mainSection"> 
            <p className="answerText">{answer.answer}</p>      
        </div>  */}
    </article>
  );
}
 
export default Question;