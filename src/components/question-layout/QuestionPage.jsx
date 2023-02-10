import { useContext } from "react";
import { useParams } from "react-router-dom";

import QuestionContext from "../../contexts/QuestionContext";
import AnswerContext from "../../contexts/AnswerContext";
import Question from "./Question";
import Answer from "./Answer";

const QuestionPage = () => {

    let { id } = useParams();
    const { questions } = useContext(QuestionContext);
    const { answers } = useContext(AnswerContext);
    
    const question = questions.find(question => question.id.toString() === id);

    const relevantAnswers = answers.filter(answer => answer.questionId === question.id);

    const sortedAnswers = relevantAnswers.sort((a, b) => b.rate - a.rate);

    return (
        <>
            <Question question={question} />
            <div className="answerList">
                {sortedAnswers.map(answer => 
                    <Answer
                        key={answer.id}
                        answer = {answer}
                        tagNumber = {(sortedAnswers.indexOf(answer)+1)}
                    /> 
                )}
            </div>         
        </>
    );
}
 
export default QuestionPage;