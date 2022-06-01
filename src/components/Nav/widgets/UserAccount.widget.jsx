import clsx from "clsx";
import React from "react";
import { useContext, useState, useEffect } from "react";
import styles from "../styles/styles.module.css";
import {
  UserContext,
  CartContext,
  OrdersListContext,
} from "../../../utils/UserContext";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../../../utils/firebaseConfig";
import { signOut } from "firebase/auth";

const UserAccountWidget = ({ currentUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div
      className="d-flex align-items-center ms-3 pointer position-relative"
      onClick={() => setShowDropdown((preState) => !preState)}
    >
      <span
        className="material-symbols-outlined"
        style={{
          fontVariationSettings: "'FILL'0,'wght'200",
          fontSize: "30px",
          opacity: ".8",
        }}
      >
        account_circle
      </span>
      <span
        className="ms-2 small text-capitalize"
        style={{ fontWeight: "500", opacity: ".7" }}
      >
        {currentUser?.displayName
          ? currentUser.displayName.split(" ")[0]
          : "Account"}
      </span>
      <span className="material-icons-outlined text-muted">
        {!showDropdown ? "expand_more" : "expand_less"}
      </span>
      <div className={clsx(styles.user_dropdown, showDropdown && styles.show)}>
        <UserDropdown />
      </div>
    </div>
  );
};

export default UserAccountWidget;

export const UserDropdown = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { setCartItems } = useContext(CartContext);
  const { setOrdersList } = useContext(OrdersListContext);
  const logOut = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setCartItems({ original: null, items: null });
    setOrdersList(null);
  };
  return (
    <div className="d-flex align-items-start flex-column bg-white usr_drop">
      <div className="p-3 w-100">
        {currentUser === null ? (
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
      <div className="text-secondary px-3 py-2 usr_">
        {currentUser !== null && (
          <>
            <NavLink to="/customer/account">
              <div className="d-flex align-items-center mb-2">
                <span className="material-icons-outlined">person</span>
                <span className={clsx("ms-2", styles.dropdownItems)}>
                  My account
                </span>
              </div>
            </NavLink>
            <Link to="/customer/orders">
              <div className="d-flex align-items-center mb-2">
                <span className="material-icons-outlined">token</span>
                <span className={clsx("ms-2", styles.dropdownItems)}>
                  My orders
                </span>
              </div>
            </Link>
          </>
        )}

        {!currentUser && (
          <>
            <NavLink to={{ pathname: "/user", state: false }}>
              <div className="d-flex align-items-center mb-2">
                <span className="material-icons-outlined">group</span>
                <span className={clsx("ms-2", styles.dropdownItems)}>
                  Create account
                </span>
              </div>
            </NavLink>
          </>
        )}
        <NavLink to="/help-center">
          <div className="d-flex align-items-center mb-2">
            <span className="material-icons-outlined">contact_support</span>
            <span className={clsx("ms-2", styles.dropdownItems)}>
              Help center
            </span>
          </div>
        </NavLink>
        <NavLink to="/order-cancellation">
          <div className="d-flex align-items-center mb-2">
            <span className="material-icons-outlined">block</span>
            <span className={clsx("ms-2", styles.dropdownItems)}>
              Order cancellation
            </span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};
