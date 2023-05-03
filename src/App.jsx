import { Routes, Route } from 'react-router-dom';

import NotFound from "./components/NotFound";
import UserLayout from "./components/user-layout/UserLayout";
import QuestionLayout from "./components/question-layout/QuestionLayout";
import QuestionList from "./components/question-layout/QuestionList";
import Question from "./components/question-layout/Question";
import NewQuestion from "./components/question-layout/NewQuestion";
import EditQuestion from "./components/question-layout/EditQuestion";
import NewAnswer from "./components/question-layout/NewAnswer";
import EditAnswer from "./components/question-layout/EditAnswer";
import RegistrationLayout from "./components/registration-layout/RegistrationLayout";
import Login from "./components/registration-layout/Login";
import Register from "./components/registration-layout/Register";
import EditUser from "./components/registration-layout/EditUser";


import './App.css';

function App() {

  return (
    <Routes>
      <Route path="/" element={<QuestionLayout />}>
        <Route index element={<QuestionList />} />
        <Route path="/questions" element={<QuestionList />} />
        <Route path="/questions/:id" element={<Question />} />
        <Route path="/questions/new-question" element={<NewQuestion />} />
        <Route path="/questions/edit-question/:id" element={<EditQuestion />} />
        <Route path="/questions/:questionId/new-answer" element={<NewAnswer />} />
        <Route path="/questions/edit-answer/:id" element={<EditAnswer />} />
      </Route>
      <Route path="/user/:id" element={<UserLayout />} />
      <Route element={<RegistrationLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
