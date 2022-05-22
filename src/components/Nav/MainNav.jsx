import React, { useContext, useState, useEffect } from "react";
import styles from "./styles/styles.module.css";
import clsx from "clsx";
import logo from "../../assets/logo/teddy-logo.png";
import {
  CartContext,
  OrdersListContext,
  UserContext,
} from "../../utils/UserContext";
import { Link, NavLink, useHistory } from "react-router-dom";
import { auth } from "../../utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { getUserData } from "../../utils/userHandler";
import Cart from "../Cart";
import { push } from "firebase/database";

const MainNav = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      getUserData(currentUser.uid, currentUser, setCurrentUser);
    }
  }, [currentUser?.displayName]);

  const onSearch = () => {
    if (searchText !== "") {
      history.push({
        pathname: "/products",
        search: `?query=${searchText.trim()}`,
      });
      setSearchText("");
    }
  };
  const onChange = (e) => setSearchText(e.target.value);

  return (
    <div className={clsx(styles.header)}>
      <div className={clsx(styles.container, "row py-2 align-items-center")}>
        <div className="col-sm-12 col-md-2">
          <Link to="/">
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
              onChange={onChange}
              value={searchText}
            />
            <span
              onClick={() => onSearch()}
              className={clsx(
                styles.btnSearch,
                "material-icons-outlined ms-2 pointer"
              )}
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
            <Cart currentUser={currentUser} />
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
              <div
                className={clsx(
                  styles.user_dropdown,
                  showDropdown && styles.show
                )}
              >
                <UserDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;

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
