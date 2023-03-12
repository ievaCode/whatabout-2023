import { Outlet } from "react-router-dom";
import UserInfo from "./UserInfo";

import Header from "../header/Header";

import "./user-layout-styles/userLayoutStyles.scss"

const UserLayout = () => {

  return (
    <>
      <Header />
      <main>
        <UserInfo />
        <Outlet />
      </main>
    </>     
  );
}
 
export default UserLayout;