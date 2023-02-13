import { Link } from 'react-router-dom';

const PublicLoginMenu = () => {

  return (
    <div className="registration publicRegistration">
      <div className="registrationButton loginButton">
        <Link to='/login'>Log in </Link>
      </div>
      <div className="registrationButton loginButton">
        <Link to='/register'>Register</Link>
      </div>        
    </div>
  );
}
 
export default PublicLoginMenu;