import { useContext, useEffect, useReducer } from "react";
import QuestionContext from "../../../contexts/QuestionContext";
import AnswerContext from "../../../contexts/AnswerContext";

function sortedQuestionsReducer(state, action) {
  switch (action.type) {
    case "newest": {
      return [...state.questions].sort((a, b) => b.date - a.date);
    }
    case "oldest": {
      return [...state.questions].sort((a, b) => a.date - b.date);
    }
    case "mostAnswered": {
      return [
        ...state.questions.sort(
          (a, b) =>
            state.answers.filter((answer) => answer.questionId === b.id).length -
            state.answers.filter((answer) => answer.questionId === a.id).length
        ),
      ];
    }
    case "highestRate": {
      return [
        ...state.questions.sort(
          (a, b) =>
            b.likedBy.length -
            b.dislikedBy.length -
            (a.likedBy.length - a.dislikedBy.length)
        ),
      ];
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const SortPanel = ({ setSortedQuestions }) => {
  const { questions } = useContext(QuestionContext);
  const { answers } = useContext(AnswerContext);

  const [sortedQuestions, dispatch] = useReducer(sortedQuestionsReducer, {
    questions: questions,
    answers: answers,
  });

  useEffect(() => {
    setSortedQuestions(sortedQuestions);
  }, [sortedQuestions, setSortedQuestions]);

  function handleSortChange(e) {
    dispatch({ type: e.target.value });
  }

  return (
    <div className="sortPanel">
      <select name="sort" id="sort" onChange={handleSortChange}>
        <option value="newest">By date from the newest</option>
        <option value="oldest">By date from the oldest</option>
        <option value="mostAnswered">By the number of answers</option>
        <option value="highestRate">By rate</option>
      </select>
      <button>Filter not answered</button>
      <input type="search" name="" id="" placeholder="search" />
    </div>
  );
};

export default SortPanel;