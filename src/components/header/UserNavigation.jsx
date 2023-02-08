import { Link } from 'react-router-dom';

const UserNavigation = () => {

  return (
    <>
      <Link to="/questions">Home</Link>
      <Link to="/my-zone">My zone</Link>
    </>
  );
}
 
export default UserNavigation;