import { Link } from 'react-router-dom';

import avatar from "../../../assets/neutral_avatar.png";

import "./userTag.scss"

const UserTag = ({userData}) => {

    return (
      <Link to={`/user/${userData.id}`}>
        <div className="userTag">
          <img className="avatar" src={userData.imageUrl? userData.imageUrl : avatar} alt="user avatar" />
          <span className="username">{userData.username}</span>
        </div>
      </Link>
    );
  }
   
  export default UserTag;

