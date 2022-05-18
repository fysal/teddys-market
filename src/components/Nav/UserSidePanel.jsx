import { useContext } from 'react';
import { auth } from "../../utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { UserContext,OrdersListContext,CartContext } from '../../utils/UserContext';
const UserSidePanel = () => {
  const sideMenu = [
    { name: "my account", path: "/customer/account", icon: "account_circle" },
    { name: "my orders", path: "/customer/orders", icon: "token" },
    { name: "Help center", path: "/", icon: "contact_support" },
    { name: "Order cancellation", path: "/", icon: "disabled_by_default" },
  ];
  const { setCurrentUser } = useContext(UserContext);
  const { setOrdersList} = useContext(OrdersListContext);
  const { setCartItems } = useContext(CartContext)

  const logout = async () => {
      await signOut(auth);
      setCurrentUser(null);
      setOrdersList(null);
      setCartItems({original: null, items: null});
  }

  return (
    <div className={"bg-white rounded my-5"}>
      {sideMenu.map((item, index) => (
        <NavLink exact to={item.path} key={index}>
          <div
            className={`d-flex align-items-center side_menu text-muted small item-${index}`}
          >
            <span className="material-icons-outlined me-2">{item.icon}</span>
            <div className="small text-capitalize">{item.name}</div>
          </div>
        </NavLink>
      ))}
      <div className="border-top px-3 py-2 mt-3 text-muted small">
        <span className="d-flex align-items-center pointer" onClick={()=> logout()}>
          <span className="material-icons-outlined me-2">logout</span>
          <span className="small">Logout</span>
        </span>
      </div>
    </div>
  );
};

export default UserSidePanel;
