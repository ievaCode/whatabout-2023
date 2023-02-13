import "../styles/form-styles/formStyles.scss"

import { Outlet } from "react-router-dom";

const RegistrationLayout = () => {
    return (
        <>
            <main>
                <Outlet />
            </main>
        </>     
    );
}
 
export default RegistrationLayout;