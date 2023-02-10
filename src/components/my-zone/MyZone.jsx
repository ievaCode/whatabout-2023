import { useContext } from "react";
import { useParams } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import Header from "../header/Header"

const MyZone = () => {

  let { id } = useParams();
  const { users } = useContext(UserContext);
  const user = users.find(user => user.id.toString() === id);

  return (
    <>
      <Header />
      <main>
        <div className="UserDataCard">
          <img style = {{width:"100px", height: "auto"}} className="userImage" src={user.imageUrl} alt="user image" />
          <span className="username">{user.username}</span>
          <span className="useremail">{user.email}</span>
        </div>
      </main>
    </>     
  );
}
 
export default MyZone;