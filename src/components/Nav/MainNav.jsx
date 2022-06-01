import React, { useContext, useState, useEffect } from "react";
import styles from "./styles/styles.module.css";
import { getUserData } from '../../utils/userHandler'
import clsx from "clsx";
import { UserContext } from "../../utils/UserContext";
import SearchBar from "./widgets/SearchBar";
import LogoWidget from "./widgets/Logo.widget";
import UserAccountWidget from "./widgets/UserAccount.widget";
import Cart from "../Cart";


const MainNav = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
     useEffect(() => {
       if (currentUser) {
         getUserData(currentUser.uid, currentUser, setCurrentUser);
       }
     }, [currentUser?.displayName]);

  return (
    <div className={clsx(styles.header)}>
      <div className={clsx(styles.container, "row py-2 align-items-center")}>
        <div className="col-sm-12 col-md-2">
          <LogoWidget />
        </div>
        <div className="col-sm-12 col-md-5 ">
          <SearchBar />
        </div>
        <div className="col-sm-12 col-md-2">
          <div className={clsx(styles.contact, "d-flex align-items-center flex-wrap")}>
            <span className={clsx(styles.callBtn, "material-icons-outlined")}>
              phone_in_talk
            </span>
            <div className="ms-2">
              <div className={clsx(styles.call_, "text-uppercase text-muted")}>
                call us now
              </div>
              <div className={styles.call}>0772 879 984</div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3 ">
          <div className="d-flex align-items-center">
      <Cart currentUser={currentUser} />
          <UserAccountWidget currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
