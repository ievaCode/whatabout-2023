import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './contexts/UserContext';
// import { QuestionsProvider } from './contexts/PostContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      {/* <QuestionsProvider> */}
        <App />
      {/* </QuestionsProvider> */}
    </UserProvider>
  </BrowserRouter>
);

