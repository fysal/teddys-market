import { Link } from "react-router-dom";
import styles from './styles/product.module.css';
const FloatingCart = () => {


  return (
    <Link to="/cart" className={"floating_cart"}>
      <div className="d-flex align-items-center justify-content-center flex-row">
        <span className="material-symbols-outlined">add_shopping_cart</span>
        <span className="small">View cart</span>
      </div>
    </Link>
  );
};

export default FloatingCart;
