
const UserCard = ({userData}) => {

    return (
      <div className="UserCard">
        <img style = {{width:"30px", height: "auto"}} className="avatar" src={userData.imageUrl} alt="user avatar" />
        <span className="username">{userData.username}</span>
      </div>
    );
  }
   
  export default UserCard;

