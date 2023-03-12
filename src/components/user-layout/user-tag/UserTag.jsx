import avatar from "../../../assets/neutral_avatar.png";

import "./userTag.scss"

const UserTag = ({userData}) => {

    return (
      <div className="userTag">
        <img className="avatar" src={userData.imageUrl? userData.imageUrl : avatar} alt="user avatar" />
        <span className="username">{userData.username}</span>
      </div>
    );
  }
   
  export default UserTag;

