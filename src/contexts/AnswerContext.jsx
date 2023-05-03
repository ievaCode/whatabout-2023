import { createContext, useState, useEffect } from "react";

import { serverPort } from '../config';

const AnswerContext = createContext();

const AnswerProvider = ({ children }) => {

  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    const allAnswers = await fetch(`http://localhost:${serverPort}/answers`)
      .then(res => res.json());
    setAnswers(allAnswers);
  }

  useEffect(()=>{
    fetchAnswers();
  }, []);

// CRUD functions
  let post = (data) => {
    fetch(`http://localhost:${serverPort}/answers`, {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    })
  }
  let remove = (id) => {
    fetch(`http://localhost:${serverPort}/answers/${id}`, {
      method: "DELETE"
    })
  }
  let updateWithPATCH = (id, newData) => { 
    fetch(`http://localhost:${serverPort}/answers/${id}`, {
      method: "PATCH",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newData)
    })
    .then(res => res.json())
  }
  
  //onClick and other functions
  const addNewAnswer = (newAnswer) => {
    setAnswers([newAnswer, ...answers]);
    post(newAnswer);
  }  
  const deleteAnswer = (id) => {
    remove(id);
    setAnswers(answers.filter(answer => answer.id !== id));
  }

  const updateAnswer = (id, updatedAnswer) => {
    updateWithPATCH(id, updatedAnswer);
    setAnswers(answers.map(answer => answer.id.toString() === id ? {...answer, ...updatedAnswer} : answer));
  }

  return (
    <AnswerContext.Provider
      value={{
        answers,
        setAnswers,
        deleteAnswer,
        addNewAnswer,
        updateAnswer
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
}

export { AnswerProvider };
export default AnswerContext;