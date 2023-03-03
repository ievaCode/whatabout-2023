import { useContext } from "react";
import { Link, useNavigate  } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import QuestionContext from "../../contexts/QuestionContext";
import AnswerContext from "../../contexts/AnswerContext";
import UserCard from "../molecules/user-card/UserCard";
import LikeCount from "../molecules/like-count/LikeCount";

import "../styles/card-styles/cardStyles.scss"

const Question = ({question}) => {

  const { users, loggedInUser } = useContext(UserContext);
  const { updateQuestion, deleteQuestion } = useContext(QuestionContext);
  const { answers } = useContext(AnswerContext);

  const navigation = useNavigate();

  const onDeleteQuestion = (id) => {
    deleteQuestion(id);
    navigation('/questions');  
  }

  return (
    <article className="card questionCard">
        {users && question?
            <>
                <div className="topSectionContainer">
                    <div className="dateContainer">
                        <span className="date posted">posted: {question.date}</span>
                        {question.edited && <span className="date edited">last edited: {question.edited}</span>}
                    </div>
                    {loggedInUser && loggedInUser.id === users.find(user => user.id === question.authorId).id ?
                        <div className="manageButtonsWrapper">
                            <div className="button editButton"><Link to={`/questions/edit-question/${question.id}`}>Edit</Link></div>
                            <button className="button deleteButton" onClick = {()=>onDeleteQuestion(question.id)}>Delete</button>          
                        </div>  :
                        <UserCard userData = {users.find(user => user.id === question.authorId)}/>      
                    }    
                </div>
                
                <div className="mainSectionContainer">
                    <div className="leftSideContainer">                
                        {loggedInUser? 
                            <LikeCount item={question} action={updateQuestion} /> :
                            <div className="statistics">
                                <p className="rateWrapper">rate: 
                                    <span className="rate"> {question.likedBy.length-question.dislikedBy.length}</span>
                                </p>
                                <p className="votes">from total votes of {question.likedBy.length+question.dislikedBy.length}</p>
                            </div>
                        }
                    </div>
                    <div className="rightSideContainer">
                        <Link className="questionHeading" to={`/questions/${question.id}`}>{question.question}</Link>
                        {loggedInUser && <p className="questionText">{question.explanation}</p> }                
                    </div>
                    <div className="answerButton numberOfAnswers">{answers.filter(answer => answer.questionId === question.id).length} answers</div>
                    {loggedInUser &&
                        <div className="answerButton addAnswer">
                            <Link to={`/questions/${question.id}/new-answer`}>Add Your answer</Link>
                        </div>
                    }
                </div>
            </> : 
            <p>Loading..</p>
        }
    </article>
  );
}
 
export default Question;