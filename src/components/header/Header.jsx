import { Link } from 'react-router-dom';

import UserRegistration from './UserRegistration';
import PublicRegistration from './PublicRegistration';
import UserNavigation from './UserNavigation';

const Header = () => {

  return (
    <header className = "header">
      <div className="upperHeader">
          <UserRegistration /> 
          {/* <PublicRegistration /> */}
      </div>
      <div className="lowerHeader">
        <nav className="mainNavigation">
          <Link to="/">WHATABOUT</Link>
          <UserNavigation /> 
        </nav>
      </div>
    </header>
  );
}
 
export default Header;