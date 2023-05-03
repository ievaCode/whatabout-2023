import { useContext } from "react";
import { Link } from "react-router-dom";
import AnswerContext from "../../../contexts/AnswerContext";
import UserContext from "../../../contexts/UserContext";
import UserTag from "../../user-layout/user-tag/UserTag";
import LikeCount from "../../question-layout/question-molecules/like-count/LikeCount";
import ManageBlock from "../../molecules/ManageBlock";

const AnswerCard = ({answer, tagNumber}) => {

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
                    <ManageBlock 
                        editLink={`/questions/edit-answer/${answer.id}`}
                        deleteAction={()=>deleteAnswer(answer.id)}
                    />   :
                    <UserTag userData = {users.find(user => user.id === answer.authorId)}/>      
                }    
            </div>
            <div className="mainSectionContainer">
                <div className="leftSideContainer">                
                    {loggedInUser? 
                        <LikeCount item={answer} action={updateAnswer} type = "answer"/> :
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
 
export default AnswerCard;