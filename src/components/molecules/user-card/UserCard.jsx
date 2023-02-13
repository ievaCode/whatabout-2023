import "./userCard.scss"

const UserCard = ({userData}) => {

    return (
      <div className="userCard">
        <img className="avatar" src={userData.imageUrl} alt="user avatar" />
        <span className="username">{userData.username}</span>
      </div>
    );
  }
   
  export default UserCard;

