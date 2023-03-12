import { useContext } from "react";
import { useParams } from "react-router-dom";

import QuestionContext from "../../contexts/QuestionContext";
import AnswerContext from "../../contexts/AnswerContext";
import QuestionCard from "./question-molecules/QuestionCard";
import AnswerCard from "./question-molecules/AnswerCard";

const Question = () => {

    let { id } = useParams();
    const { questions } = useContext(QuestionContext);
    const { answers } = useContext(AnswerContext);
    
    const question = questions.find(question => question.id.toString() === id);

    const relevantAnswers = answers.filter(answer => answer.questionId === question.id);
    const sortedAnswers = relevantAnswers.sort((a, b) => ((b.likedBy.length - b.dislikedBy.length)-(a.likedBy.length - a.dislikedBy.length)));

    return (
        questions?
        <div className="homePageContainer">
            <QuestionCard question={question} />             
            <div className="answerList">
                {sortedAnswers.map(answer => 
                    <AnswerCard
                        key={answer.id}
                        answer = {answer}
                        tagNumber = {(sortedAnswers.indexOf(answer)+1)}
                    /> 
                )}
            </div>         
        </div>:
        <p>loading...</p>
    );
}
 
export default Question;