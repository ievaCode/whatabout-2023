import { useContext } from "react";
import { useParams } from "react-router-dom";

import UserContext from "../../contexts/UserContext";

import "./user-layout-styles/userLayoutStyles.scss"

const UserInfo = () => {

  let { id } = useParams();
  const { users } = useContext(UserContext);

  return (
    users? 
    <div className="userInfoCard">
        <img className="userImage" src={users.find(user => user.id.toString() === id).imageUrl} alt="user image" />
        <div className="userData">
            <p className="userName">
              <span className="userTag">Username:</span>
              {users.find(user => user.id.toString() === id).username}
            </p>
            <p className="userEmail">
              <span className="userTag">Email:</span>
              {users.find(user => user.id.toString() === id).email}
            </p>
        </div>
    </div> :
    <p className="loading">Loading..</p>
  );
}
 
export default UserInfo;