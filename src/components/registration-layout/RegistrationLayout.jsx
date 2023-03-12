import "./registration-layout-styles/registrationLayoutStyles.scss"

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