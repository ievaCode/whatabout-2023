import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import { QuestionProvider } from './contexts/QuestionContext';
import { AnswerProvider } from './contexts/AnswerContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <AnswerProvider>
        <QuestionProvider>          
          <App />          
        </QuestionProvider>
      </AnswerProvider>
    </UserProvider>
  </BrowserRouter>
);

