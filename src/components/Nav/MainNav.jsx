import React, { useContext, useState } from "react";
import styles from "./styles/styles.module.css";
import clsx from "clsx";
import logo from "../../assets/logo/teddy-logo.png";
import shopping_cart from "../../assets/icons/shopping-cart.png";
import { UserContext } from "../../utils/UserContext";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../utils/firebaseConfig";
import { signOut } from "firebase/auth";


const MainNav = () => {
  const userContext = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className={clsx(styles.header)}>
      <div className={clsx(styles.container, "row py-2 align-items-center")}>
        <div className="col-sm-12 col-md-2">
          <Link exact to="/">
            <div className={styles.logo}>
              <img src={logo} width="70" />
            </div>
          </Link>
        </div>
        <div className="col-sm-12 col-md-5 ">
          <div
            className={clsx(
              styles.nav_search,
              "d-flex align-center justify-content-start flex-1"
            )}
          >
            <input
              placeholder="Search..."
              className={clsx(styles.input, "ms-2")}
            />
            <span
              className={clsx(styles.btnSearch, "material-icons-outlined ms-2")}
            >
              search
            </span>
          </div>
        </div>
        <div className="col-sm-12 col-md-2">
          <div className={clsx(styles.contact, "d-flex align-items-center")}>
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
            <div className="float-start d-flex align-items-center flex-2">
              <span className={clsx(styles.cart_, "position-relative")}>
                <img src={shopping_cart} width="20" />
                <span
                  className={clsx(
                    styles.count,
                    "d-flex align-items-center justify-content-center text-white rounded-circle"
                  )}
                >
                  0
                </span>
              </span>
              <span className={clsx(styles.catx, "ms-3")}>My Cart</span>
            </div>
            <div
              className="d-flex align-items-center ms-3 pointer position-relative"
              onClick={() => setShowDropdown((preState) => !preState)}
            >
              <span
                className="material-icons-outlined "
                style={{ fontSize: "30px", opacity: ".6" }}
              >
                <span className="material-symbols-outlined">
                  account_circle
                </span>
              </span>
              <span
                className="ms-2 small"
                style={{ fontWeight: "500", opacity: ".7" }}
              >
                Account
              </span>
              <span className="material-icons-outlined text-muted">
                {!showDropdown ? "expand_more" : "expand_less"}
              </span>
              <div
                className={clsx(
                  styles.user_dropdown,
                  showDropdown && styles.show
                )}
              >
                <UserDropdown context={userContext} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;

export const UserDropdown = ({ context }) => {
  const logOut = async() => {
      await signOut(auth);
      context.setCurrentUser(null);
  }
  return (
    <div className="d-flex align-items-start flex-column bg-white usr_drop">
      <div className="p-3 w-100">
        {context.currentUser === null ? (
          <NavLink to="/user" className="btn btn-sm btn-primary w-100">
            Sign In
          </NavLink>
        ) : (
          <button className="btn btn-sm btn-primary w-100" onClick={logOut}>
            Sign Out
          </button>
        )}
      </div>
      <div className="dropdown-divider"></div>
      <div className="text-secondary px-3 py-2">
        <div className="d-flex align-items-center mb-2">
          <span className="material-icons-outlined">person</span>
          <span className={clsx("ms-2", styles.dropdownItems)}>My account</span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <span className="material-icons-outlined">token</span>
          <span className={clsx("ms-2", styles.dropdownItems)}>My orders</span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <span className="material-icons-outlined">group</span>
          <span className={clsx("ms-2", styles.dropdownItems)}>
            Create account
          </span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <span className="material-icons-outlined">help</span>
          <span className={clsx("ms-2", styles.dropdownItems)}>
            Help center
          </span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <span className="material-icons-outlined">block</span>
          <span className={clsx("ms-2", styles.dropdownItems)}>
            Order cancellation
          </span>
        </div>
      </div>
    </div>
  );
};
