import { createContext, useState, useEffect, useContext } from "react";
import AnswerContext from "./AnswerContext";

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {

  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const allQuestions = await fetch('http://localhost:5000/questions')
      .then(res => res.json());
    setQuestions(allQuestions);
  }
  useEffect(()=>{
    fetchQuestions();
  }, []);


// CRUD functions
  let post = (data) => {
    fetch('http://localhost:5000/questions', {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    })
  }
  let remove = (id) => {
    fetch(`http://localhost:5000/questions/${id}`, {
      method: "DELETE"
    })
  }
  let updateWithPATCH = (id, newData) => { 
    fetch(`http://localhost:5000/questions/${id}`, {
      method: "PATCH",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newData)
    })
    .then(res => res.json())
  }
  
  //onClick and other functions
  const addNewQuestion = (newQuestion) => {
    setQuestions([newQuestion, ...questions]);
    post(newQuestion);
  }  

  // const { answers, deleteAnswer } = useContext(AnswerContext);  
  const deleteQuestion = (id) => {
    // const relevantAnswers = answers.filter(answer => answer.questionId === id);
    // relevantAnswers.forEach(answer => deleteAnswer(answer));  
    remove(id);
    setQuestions(questions.filter(question => question.id !== id));
  }

  const updateQuestion = (id, updatedQuestion) => {
    updateWithPATCH(id, updatedQuestion);
    setQuestions(questions.map(question => question.id.toString() === id ? {...question, ...updatedQuestion} : question));
  }

  return (
    <QuestionContext.Provider
      value={{
        questions,
        addNewQuestion,
        deleteQuestion,
        updateQuestion
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };
export default QuestionContext;