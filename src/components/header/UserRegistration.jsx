import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

import UserCard from "../molecules/user-card/UserCard";


const UserLoginMenu = () => {

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const navigation = useNavigate();

  const logOutUser = () => {
    setLoggedInUser(null);
    navigation('/questions');
  }

  return (
    <div className="userLoginMenu">     
      <Link to={`/my-zone/${loggedInUser.id}`}>
        <UserCard userData = {loggedInUser} />
      </Link>
      <div className="registration loginButton" onClick={() => logOutUser()}>
          <Link to='/questions'>Log out</Link>
      </div>
    </div>  
  );
}
 
export default UserLoginMenu;