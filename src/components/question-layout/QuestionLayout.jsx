import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

import Header from "../header/Header"

const QuestionLayout = () => {

    const { loggedInUser } = useContext(UserContext);

    return (
        <>
            <Header />
            <main>
                {loggedInUser ? 
                    <Link className="addNewPost" to="/questions/new-question"> + Add new Question</Link> :
                    <Link className="addNewPost" to="/login"> + Add new Question</Link>      
                }
                <Outlet />
            </main>
        </>        
    );
}
 
export default QuestionLayout;