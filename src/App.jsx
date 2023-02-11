import { Routes, Route } from 'react-router-dom';

import NotFound from "./components/NotFound";
import MyZone from "./components/my-zone/MyZone";
import QuestionLayout from "./components/question-layout/QuestionLayout";
import HomePage from "./components/question-layout/HomePage";
import QuestionPage from "./components/question-layout/QuestionPage";
import NewQuestion from "./components/question-layout/NewQuestion";
import EditQuestion from "./components/question-layout/EditQuestion";
import NewAnswer from "./components/question-layout/NewAnswer";
import EditAnswer from "./components/question-layout/EditAnswer";
import RegistrationLayout from "./components/registration-layout/RegistrationLayout";
import Login from "./components/registration-layout/Login";
import Register from "./components/registration-layout/Register";


import './App.css';

function App() {

  return (
    <Routes>
      <Route path="/" element={<QuestionLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/questions" element={<HomePage />} />
        <Route path="/questions/:id" element={<QuestionPage />} />
        <Route path="/questions/new-question" element={<NewQuestion />} />
        <Route path="/questions/edit-question/:id" element={<EditQuestion />} />
        <Route path="/questions/new-answer/:questionId" element={<NewAnswer />} />
        <Route path="/questions/edit-answer/:id" element={<EditAnswer />} />
      </Route>
      <Route path="/my-zone/:id" element={<MyZone />} />
      <Route element={<RegistrationLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
