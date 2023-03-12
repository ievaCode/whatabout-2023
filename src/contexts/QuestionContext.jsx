import { createContext, useState, useEffect, useContext } from "react";

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {

  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const allQuestions = await fetch('http://localhost:5000/questions')
      .then(res => res.json());
      allQuestions.sort((a, b) => new Date(b.date) - new Date(a.date))
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
 
  const deleteQuestion = (id) => {
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