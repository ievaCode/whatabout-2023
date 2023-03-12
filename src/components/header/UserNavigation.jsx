import { Link } from 'react-router-dom';
import { useContext } from "react";

import UserContext from "../../contexts/UserContext";

const UserNavigation = () => {

  const { loggedInUser } = useContext(UserContext);

  return (
    <>
      <Link to={`/user/${loggedInUser.id}`}>My zone</Link>
    </>
  );
}
 
export default UserNavigation;