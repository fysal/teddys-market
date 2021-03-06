import { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { CartContext, UserContext } from "../utils/UserContext";
import { addToCart } from "../utils/userHandler";
import Styles from './styles/product.module.css';
import cartIcon from "../assets/icons/shopping-bag.png";
import clsx from "clsx";
import { Link } from "react-router-dom";

const ProductCard = ({ groceries }) => {
  const [values, setValue] = useState({});
  const { currentUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);
  const [showAlert, setShowAlert] = useState(false);
  
  const addItemToCart = async (e, product) => {
    e.preventDefault();
    if (currentUser) {
      await addToCart(currentUser, values[product.itemId], product, toast);
    } else {
      toast.error("You have to be logged in to add products to the cart", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setShowAlert(true)
    }
  };
  const onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };
  const increment = (id) => {
    if (values.hasOwnProperty(id))
      setValue({ ...values, [id]: parseInt(values[id]) + 1 });
    else setValue({ ...values, [id]: +2 });
  };

  const decrement = (id) => {
    if (values.hasOwnProperty(id)) {
      if (values[id] > 1) {
        setValue({ ...values, [id]: parseInt(values[id]) - 1 });
      }
    }
  };
  const itemInCart = (id) => {
    if (!cartItems.items) return false;
    const itemExists = cartItems.items.find((item) => item.itemId === id);
    return itemExists;
  };
  return (
    <>
      {showAlert && <AlertPopupWidget setShowAlert={setShowAlert} />}
      <div className="row mt-4">
        {groceries
          .sort((a, b) =>
            a.itemName.toLowerCase().localeCompare(b.itemName.toLowerCase())
          )
          .map((grocery) => (
            <div key={grocery.itemId} className="col-sm-6 col-md-4 col-lg-3">
              <div
                className={clsx(Styles.product_card, " p-3 text-center mb-4")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <span className={Styles.new}>New</span>
                  <span className={Styles.off}>-20%</span>
                </div>
                <img src={grocery.imageUrl} width="100" className="mb-3" />
                <div className="text-muted small mb-3">{grocery.itemName}</div>

                <div className="small fw-bold">UGX {grocery.itemPrice}</div>
                <div className="small text-capitalize">Per {grocery.unit}</div>
                {/* <div className="small text-capitalize">{grocery.category}</div> */}
                {grocery.availability === "In Stock" ? (
                  <>
                    <form
                      className="mt-2"
                      onSubmit={(e) => addItemToCart(e, grocery)}
                    >
                      <div className="mb-4 text-center">
                        <input
                          name={grocery.itemId}
                          onChange={onChange}
                          type="hidden"
                          min="1"
                          max="1000"
                          defaultValue="1"
                          className="text-center"
                        />
                        <div className="d-flex align-items-center justify-content-center">
                          <span
                            className="material-icons-outlined border pointer"
                            onClick={() => decrement(grocery.itemId)}
                          >
                            remove
                          </span>
                          <span className={clsx(Styles.qty, " px-3")}>
                            {values[grocery.itemId] ?? 1}
                          </span>
                          <span
                            className="material-icons-outlined border pointer"
                            onClick={() => increment(grocery.itemId)}
                          >
                            add
                          </span>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={itemInCart(grocery.itemId)}
                        className={clsx(
                          Styles.btn_add_to_cart,
                          "btn btn-sm rounded-pill px-3 "
                        )}
                      >
                        <div className="d-flex align-items-center justify-content-center">
                          <img src={cartIcon} width="13" />
                          <span className={clsx(Styles.btn_text_small, "ms-1")}>
                            {itemInCart(grocery.itemId)
                              ? "Added to cart"
                              : "Add to cart"}
                          </span>
                        </div>
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-danger fw-bold mt-2 small">
                    Out of stock
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};


export default ProductCard;


export const AlertPopupWidget = ({setShowAlert}) => {
  return (
    <div
      className={clsx(
        Styles.overlay_pop,
        "d-flex align-items-center justify-content-center flex-column"
      )}
    >
      <div
        className={clsx(
          Styles.alert_inner,
          "bg-white m-auto p-4 position-relative rounded"
        )}
      >
        <span className={clsx("material-symbols-outlined pointer", Styles.close_btn)}
        style={{fontSize: "18px"}}
         onClick={()=> setShowAlert(false)}>
          close
        </span>
        <div className={clsx(Styles.alert_title, "text-capitalize mb-2")}>Best deals!</div>
        <div className="small text-muted">Get acces to great deals, discounts and offers</div>
        <div className="d-flex align-items-center justify-content-between flex-column ">
          <Link
            to={{ pathname: "/user", state: true }}
            className="btn btn-primary btn-sm px-3 rounded-0 w-100 mt-3 text-capitalize"
          >
            Sign in
          </Link>
          <Link
            to={{ pathname: "/user", state: false }}
            className="btn btn-outline-secondary  btn-sm px-3 rounded-0 w-100 mt-3 text-capitalize"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}