import { Routes, Route } from 'react-router-dom';

// import Home from "./components/Home";
import NotFound from "./components/NotFound";
import MyZone from "./components/my-zone/MyZone";
import QuestionLayout from "./components/question-layout/QuestionLayout";
import QuestionList from "./components/question-layout/QuestionList";
import Question from "./components/question-layout/Question";
import NewQuestion from "./components/question-layout/NewQuestion";
import EditQuestion from "./components/question-layout/EditQuestion";
import RegistrationLayout from "./components/registration-layout/RegistrationLayout";
import Login from "./components/registration-layout/Login";
import Register from "./components/registration-layout/Register";


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
      </Route>
      <Route path="/my-zone" element={<MyZone />} />
      <Route element={<RegistrationLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
