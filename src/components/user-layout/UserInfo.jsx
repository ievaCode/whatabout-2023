import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import ManageBlock from "../molecules/ManageBlock";
import "./user-layout-styles/userLayoutStyles.scss"

const UserInfo = () => {
  const { users, loggedInUser, deleteUser } = useContext(UserContext);
  let { id } = useParams();
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (users) {
      const userProfile = users.find((user) => user.id.toString() === id);
      setProfile(userProfile);
    }
  }, [users, id]);

  return (
      profile ? 
        <div className="userInfoCard">
          <img
            className="userImage"
            src={profile.imageUrl}
            alt="user profile"
          />
          <div className="userData">
            {profile.id === loggedInUser.id ? 
              <>
                <ManageBlock
                  editLink={`/edit-user/${loggedInUser.id}`}
                  deleteAction={() => deleteUser(loggedInUser)}
                />
                <p className="userName">
                  <span className="userTag">Username:</span>
                  {profile.username}
                </p>
                <p className="userEmail">
                  <span className="userTag">Email:</span>
                  {loggedInUser.email}
                </p>
              </>
             : 
              <>
                <p className="userName">
                  <span className="userTag">Username:</span>
                  {profile.username}
                </p>
              </>
            }
          </div>
        </div>
       : 
        <p className="loading">Loading..</p>
      
  );
};

export default UserInfo;

