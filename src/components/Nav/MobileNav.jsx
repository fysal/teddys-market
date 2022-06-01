import { useContext, useState, useEffect } from "react";
import LogoWidget from "./widgets/Logo.widget";
import styles from "./styles/styles.module.css";
import UserAccountWidget from "./widgets/UserAccount.widget";
import { UserContext } from "../../utils/UserContext";
import { getUserData } from "../../utils/userHandler";
import Cart from "../Cart";
import clsx from "clsx";
import SearchBar from './widgets/SearchBar'

const MobileNav = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid, currentUser, setCurrentUser);
    }
  }, [currentUser?.displayName]);

  const toggleSearchBar = ()=> {
      document.querySelector(".search-drop").classList.toggle("show")
  }
  return (
    <>
      <div className={clsx(styles.header, "position-relative")}>
        <div className={"container py-2"}>
          <div className="d-flex align-item-center justify-content-between">
            <LogoWidget />
            <div className="d-flex align-items-center">
              <Cart currentUser={currentUser} />
              <UserAccountWidget currentUser={currentUser} />
              <span
                className="material-symbols-outlined ms-4 rounded-circle p-1 pointer"
                onClick={() => toggleSearchBar()}
                style={{
                  backgroundColor: "#FF9C00",
                  fontSize: "18px",
                }}
              >
                search
              </span>
            </div>
          </div>
        </div>
        <div className="search-drop">
          <div className="container d-flex align-items-center justify-content-end">
            <div className="flex-1 w-75 me-4">
              <SearchBar />
            </div>
            <span
              className="material-symbols-outlined pointer"
              onClick={() => {
                document.querySelector(".search-drop").classList.remove("show");
              }}
            >
              close
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
