import { useContext, useState, useEffect } from "react";

import QuestionContext from "../../../contexts/QuestionContext";
import AnswerContext from "../../../contexts/AnswerContext";


const SortPanel = ({setSortedQuestions}) => {

  const { questions } = useContext(QuestionContext);
  const { answers } = useContext(AnswerContext);

  const [selectedOption, setSelectedOption] = useState("newest");
    
  useEffect(() => {
    setSortedQuestions(sortedQuestions);
  }, [selectedOption]);

  const sortedQuestions = () => {
    switch (selectedOption) {
      case "newest":
        return [...questions].sort((a, b) => new Date(b.date) - new Date(a.date));
      case "oldest":
        return  [...questions].sort((a, b) => new Date(a.date) - new Date(b.date));
      case "mostAnswered":
        return [...questions].sort(
            (a, b) =>
              answers.filter((answer) => answer.questionId === b.id).length -
              answers.filter((answer) => answer.questionId === a.id).length
          );
      case "highestRate":
        return [...questions].sort(
            (a, b) =>
              (b.likedBy.length - b.dislikedBy.length) -
              (a.likedBy.length - a.dislikedBy.length)
          );
      default:
        return null;
    }
  }

  function handleFilter() {
    const notAnswered = [...questions].filter(question => answers.filter(answer => answer.questionId === question.id).length === 0);
    setSortedQuestions(notAnswered);
  }

    return (
      <div className="sortPanel">
        <label>Sort questions: 
          <select name="sort" id="sort" onChange = {e => setSelectedOption(e.target.value)}>
              <option value="newest" >By date from the newest</option>
              <option value="oldest" >By date from the oldest</option>
              <option value="mostAnswered" >By the number of answers</option>
              <option value="highestRate" >By rate</option>
          </select>
        </label>
        <button onClick = {handleFilter}>Filter not answered</button>
      </div>
    )
  }
   
  export default SortPanel;