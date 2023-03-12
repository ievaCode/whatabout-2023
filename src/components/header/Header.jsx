import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { Link } from 'react-router-dom';

import UserRegistration from './UserRegistration';
import PublicRegistration from './PublicRegistration';
import UserNavigation from './UserNavigation';

import "./header-styles/header.scss"

const Header = () => {

  const { loggedInUser } = useContext(UserContext);

  return (
    <header>
      <div className="header">
        <div className="upperHeader">
          {loggedInUser ? 
            <UserRegistration /> :
            <PublicRegistration />
          }
        </div>
        <div className="lowerHeader">
          <nav className="mainNavigation">
            <Link className="logo" to="/questions">WHATABOUT</Link>
            {loggedInUser && <UserNavigation /> }
          </nav>
        </div>
      </div>
    </header>
  );
}
 
export default Header;