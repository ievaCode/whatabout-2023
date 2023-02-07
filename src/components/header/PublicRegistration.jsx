import { Link } from 'react-router-dom';

const PublicLoginMenu = () => {

  return (
    <div className="publicLoginMenu">
      <div className="button loginButton">
        <Link to='/login'>Log in </Link>
      </div>
      <div className="button loginButton">
        <Link to='/register'>Register</Link>
      </div>        
    </div>
  );
}
 
export default PublicLoginMenu;