import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {

const [loggedInUser, setLoggedInUser] = useState(false);


  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
export default UserContext;