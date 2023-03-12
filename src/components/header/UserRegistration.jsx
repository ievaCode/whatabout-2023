import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

import UserTag from "../user-layout/user-tag/UserTag";


const UserLoginMenu = () => {

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const navigation = useNavigate();

  const logOutUser = () => {
    setLoggedInUser(null);
    sessionStorage.clear();
    window.location.reload();
    navigation('/questions');
  }

  return (
    <div className="registration userRegistration">     
      <Link to={`/user/${loggedInUser.id}`}>
        <UserTag userData = {loggedInUser} />
      </Link>
      <div className="registrationButton loginButton" onClick={() => logOutUser()}>
          <Link to='/questions'>Log out</Link>
      </div>
    </div>  
  );
}
 
export default UserLoginMenu;