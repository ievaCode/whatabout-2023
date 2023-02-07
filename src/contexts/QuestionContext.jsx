import { createContext, useState, useEffect } from "react";

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {

  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const allQuestions = await fetch('http://localhost:5000/questions')
      .then(res => res.json());
      console.log(allQuestions);
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
  let updateWithPUT = (id, newDataObject) => {
    fetch(`http://localhost:5000/questions/${id}`, {
      method: "PUT",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newDataObject)
    })
  }
  let updateWithPATCH = (id, newData) => { 
    fetch(`http://localhost:5000/questions/${id}`, {
      method: "PATCH",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }
  
  //onClick and other functions


  return (
    <QuestionContext.Provider
      value={{
        questions
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

export { QuestionProvider };
export default QuestionContext;