import { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { CartContext, UserContext } from "../utils/UserContext";
import { addToCart } from "../utils/userHandler";
import Styles from './styles/product.module.css';
import cartIcon from "../assets/icons/shopping-bag.png";
import clsx from "clsx";

const ProductCard = ({ groceries }) => {
  const [values, setValue] = useState({});
  const { currentUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);

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
    <div className="row mt-4">
      {groceries
        .sort((a, b) => a.itemName.toLowerCase().localeCompare(b.itemName.toLowerCase()))
        .map((grocery) => (
          <div key={grocery.itemId} className="col-sm-6 col-md-3">
            <div className={clsx(Styles.product_card, " p-3 text-center mb-4")}>
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
  );
};


export default ProductCard;