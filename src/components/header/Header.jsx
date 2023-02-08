import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { Link } from 'react-router-dom';

import UserRegistration from './UserRegistration';
import PublicRegistration from './PublicRegistration';
import UserNavigation from './UserNavigation';

const Header = () => {

  const { loggedInUser } = useContext(UserContext);

  return (
    <header className = "header">
      <div className="upperHeader">
        {loggedInUser ? 
          <UserRegistration /> :
          <PublicRegistration />
        }
      </div>
      <div className="lowerHeader">
        <nav className="mainNavigation">
          <Link to="/questions">WHATABOUT</Link>
          {loggedInUser && <UserNavigation /> }
        </nav>
      </div>
    </header>
  );
}
 
export default Header;