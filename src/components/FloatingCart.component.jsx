import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext, CartContext } from "../utils/UserContext";
import { useMediaQuery } from 'react-responsive';
const FloatingCart = () => {
  const { cartItems } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
 const isBigScreen = useMediaQuery({ query : '(min-width:800px)'})
  return (
    <>
      {currentUser && cartItems?.items?.length > 0 && isBigScreen && (
        <Link to="/cart" className={"floating_cart"}>
          <div className="d-flex align-items-center justify-content-center flex-row">
            <span className="material-symbols-outlined">add_shopping_cart</span>
            <span className="small">View cart</span>
          </div>
        </Link>
      )}
    </>
  );
};

export default FloatingCart;
