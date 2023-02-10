import { createContext, useState, useEffect } from "react";

const AnswerContext = createContext();

const AnswerProvider = ({ children }) => {

  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    const allAnswers = await fetch('http://localhost:5000/answers')
      .then(res => res.json());
    setAnswers(allAnswers);
  }

  useEffect(()=>{
    fetchAnswers();
  }, []);

// CRUD functions
  let post = (data) => {
    fetch('http://localhost:5000/answers', {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    })
  }
  let remove = (id) => {
    fetch(`http://localhost:5000/answers/${id}`, {
      method: "DELETE"
    })
  }
  let updateWithPUT = (id, newDataObject) => {
    fetch(`http://localhost:5000/answers/${id}`, {
      method: "PUT",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newDataObject)
    })
  }
  let updateWithPATCH = (id, newData) => { 
    fetch(`http://localhost:5000/answers/${id}`, {
      method: "PATCH",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newData)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }
  
  //onClick and other functions


  return (
    <AnswerContext.Provider
      value={{
        answers
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
}

export { AnswerProvider };
export default AnswerContext;