import { useContext } from "react";
import { Link } from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

const UserNavigation = () => {

  const { loggedInUser } = useContext(UserContext);

  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/user">My zone</Link>
    </>
  );
}
 
export default UserNavigation;