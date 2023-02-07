import { Outlet } from "react-router-dom";

import Header from "../header/Header"

const QuestionLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>        
    );
}
 
export default QuestionLayout;