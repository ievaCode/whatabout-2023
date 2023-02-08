import { useContext } from "react";

import UserContext from "../../../contexts/UserContext";

const UserCard = () => {

  const { loggedInUser } = useContext(UserContext);

    return (
      <div className="UserCard">
        <img className="avatar" src={loggedInUser.imageUrl} alt="user avatar" />
        <span className="username">{loggedInUser.username}</span>
      </div>
    );
  }
   
  export default UserCard;

