import { useContext } from "react";
import { Link } from "react-router-dom";
import AnswerContext from "../../contexts/AnswerContext";
import UserContext from "../../contexts/UserContext";
import UserCard from "../molecules/user-card/UserCard";
import LikeCount from "../molecules/like-count/LikeCount";


const Question = ({answer, tagNumber}) => {

  const { deleteAnswer, updateAnswer } = useContext(AnswerContext);
  const { users, loggedInUser } = useContext(UserContext);
  
  return (
    <article className="card answerCard">
        {users ?
            <>
            <div className="answerTag">Answer {tagNumber}</div>
            <div className="topSectionContainer">
                <div className="dateContainer">
                    <span className="date">posted: {answer.date}</span>
                    {answer.edited && <span className="date edited">last edited on: {answer.edited}</span>}
                </div>
                {loggedInUser && loggedInUser.id === users.find(user => user.id === answer.authorId).id ?
                    <div className="manageButtonsWrapper">
                        <div className="button editButton">
                            <Link to={`/questions/edit-answer/${answer.id}`}>Edit</Link>
                        </div>
                        <button className="button deleteButton" onClick = {()=>deleteAnswer(answer.id)}>Delete</button>          
                    </div>  :
                    <UserCard userData = {users.find(user => user.id === answer.authorId)}/>      
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
            </>: <p>Loading..</p> }
        </article>
  )
}
 
export default Question;