import React, { useContext, useEffect, useState } from "react";
import {
  fetchGroceries,
  removeItemFromCart,
  incrementItem,
  decrementItem,
} from "../utils/userHandler";
import { CartContext, ProductContext } from "../utils/UserContext";
import Input from "../components/form/widgets/Input";
import { Link, useHistory } from "react-router-dom";
import style from "./styles/styles.module.css";
import clsx from "clsx";
import SpinLoader from "../components/SpinLoader";
import MessageAlert from '../components/alerts/MessageAlert';
import ErrorAlert from '../components/alerts/ErrorAlert';
import firebaseErrorHandler from "../utils/firebaseErrorHandler";

const CartPage = () => {
  const [fetching, setFetching] = useState(false);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { groceries, setGroceries } = useContext(ProductContext);
  const [deliveryMethod, setDeliveryMethod] = useState({
    type: "Standard delivery (10000)",
    amount:  10000});
  const [subTotal, setsubTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const currencyFormatter = Intl.NumberFormat("en-us", {
    currency: "UGX",
    style: "currency",
  });


  const history = useHistory();

  useEffect(() => {
    document.querySelector("body").classList.add("body_gray");
    return () => {
      document.querySelector("body").classList.remove("body_gray");
    };
  }, []);

  useEffect(() => {
    if (groceries.length === 0) fetchGroceries(setGroceries, setFetching);
  }, []);

  useEffect(() => {
    if (cartItems?.items?.length > 0) setsubTotal(computeTotal());
  }, [cartItems.items]);

  useEffect(()=>{
    computeFinalTotal();
  },[cartItems,deliveryMethod])

  useEffect(() => {
computeTotal()
  },[cartItems])


  const computeTotal = () => {
    let subTotal = 0;
    cartItems?.items?.forEach((item) => (subTotal += item.itemTotal));
    return subTotal;
  };


  const computeFinalTotal = () => {
    const total =  computeTotal() + deliveryMethod.amount;
    setFinalTotal(total);
  }

const onDeliveryMethodChange = (e) => {
  if(e.target.value === "Standard delivery (10000)")
   setDeliveryMethod({type: "Standard delivery (5000)", amount : 10000});
   else setDeliveryMethod({type : "Standard delivery", amount :10000 })
}

  const goToCheckout = () => {
    history.push("/checkout", {
      cartItems: cartItems.items,
      originalCart : cartItems.original,
      subTotal,
      deliveryMethod,
      finalTotal
    });
  };

  const onRemoveCartItem = async (cartId, itemId) => {
    const response = await removeItemFromCart(cartId, itemId);
    if(response.status === "successful") setMessage(response.message);
    else{
      const errorMessage = firebaseErrorHandler(response.code);
      setError(errorMessage);
    }
  }
  return (
    <div className="container">
      <div className={clsx(style.cart_wrapper)}>
        <div className="row">
          <div className="col-sm-12 col-md-8 px-5 pt-3 pb-4">
            {groceries.length === 0 || !cartItems.items ? (
              <div className="d-flex align-items-center justify-content-center">
                <SpinLoader text="Loading. Please wait" />
              </div>
            ) : (
              <>
                {message && (
                  <MessageAlert message={message} setMessage={setMessage} />
                )}
                {error && (
                  <ErrorAlert errorMessage={error} setError={setError} />
                )}
                <div
                  className={clsx(
                    style.headers,
                    "d-flex align-items-start justify-content-between mt-4 mb-3"
                  )}
                >
                  <h6>Shopping Cart</h6>{" "}
                  <span className="small">{cartItems.items.length} Items</span>
                </div>
                {cartItems.items.length > 0 ? (
                  <>
                    <table className="table cart_table ">
                      <thead>
                        <tr>
                          {[
                            "Product details",
                            "Quantity",
                            "Price",
                            "Sub Total",
                            "",
                          ].map((item, index) => (
                            <th
                              scope="col"
                              key={index}
                              className="small text-muted"
                            >
                              {item}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.items.map((item) => (
                          <tr key={item.cartId}>
                            <td className="d-flex align-items-start">
                              <img
                                width="50"
                                className="mx-2"
                                src={
                                  groceries.filter(
                                    (grocery) => grocery.itemId === item.itemId
                                  )[0]?.imageUrl
                                }
                              />
                              <div className="d-flex flex-column">
                                {" "}
                                <div className="small">
                                  {
                                    groceries.filter(
                                      (grocery) =>
                                        grocery.itemId === item.itemId
                                    )[0]?.itemName
                                  }
                                </div>
                                <div className="small text-muted ">
                                  {
                                    groceries.filter(
                                      (grocery) =>
                                        grocery.itemId === item.itemId
                                    )[0]?.availability
                                  }
                                </div>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div className="small text-muted d-flex align-items-center justify-content-between">
                                <span
                                  className={clsx(
                                    "material-icons-outlined pointer",
                                    style.btn_cart
                                  )}
                                  onClick={() =>
                                    decrementItem(item.itemOwner, item.itemId)
                                  }
                                >
                                  remove
                                </span>

                                <span>{item.itemCount}</span>
                                <span
                                  className={clsx(
                                    "material-icons-outlined pointer",
                                    style.btn_cart
                                  )}
                                  onClick={() =>
                                    incrementItem(item.itemOwner, item.itemId)
                                  }
                                >
                                  add
                                </span>
                              </div>
                            </td>
                            <td>
                              {" "}
                              <div className="small text-muted">
                                {currencyFormatter.format(item.itemPrice)}
                              </div>
                            </td>
                            <td>
                              <div className="small text-muted">
                                {currencyFormatter.format(item.itemTotal)}
                              </div>
                            </td>
                            <td className="">
                              {" "}
                              <span
                                className="material-icons-outlined text-muted pointer"
                                style={{ fontSize: "16px" }}
                                onClick={() =>
                                  onRemoveCartItem(item.itemOwner, item.itemId)
                                }
                              >
                                close
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <div className="d-flex align-items-center justify-content-between flex-column">
                    <lord-icon
                      src="https://cdn.lordicon.com/slkvcfos.json"
                      trigger="loop"
                      colors="primary:#121331,secondary:#8dca57"
                      style={{ width: "250px", height: "250px" }}
                    ></lord-icon>
                    <div className="small text-muted">Your cart is empty</div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className={clsx("col-sm-12 col-md-4 ", style.cart_sum)}>
            <div className="card_sum p-3">
              <div
                className={clsx(
                  style.headers,
                  "d-flex align-items-start mt-4 mb-4"
                )}
              >
                <h6>Order Summery</h6>
              </div>

              <div className="d-flex align-items-center justify-content-between small mb-4">
                <span>Items {cartItems.items?.length}</span>
                <span>
                  <span>Total </span>
                  <span>
                    {cartItems.items && currencyFormatter.format(subTotal)}
                  </span>
                </span>
              </div>
              <h6 className="mb-2 small">Delivery</h6>
              <select
                name="delivery"
                style={{ fontSize: "12px" }}
                className="form-select"
                onChange={onDeliveryMethodChange}
              >
                {["Standard delivery (10000)"].map(
                  (item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                )}
              </select>
              <div className="mt-3">
                <label className="text-uppercase small mb-2">Promo code</label>
                <Input name="promocode" />
                <button
                  className={clsx(style.promoBtn, "btn btn-sm rounded-0")}
                >
                  <span className="small text-uppercase"> Apply</span>
                </button>
              </div>

              <div className="text-uppercase mt-4 border-top pt-3">
                <div
                  className="d-flex align-items-center justify-content-between mb-3 text-muted"
                  style={{ fontSize: "13px" }}
                >
                  <span className="text-capitalize">Delivery charge</span>
                  <span className="">
                    {currencyFormatter.format(deliveryMethod.amount)}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-3 fw-bold small">
                  <span className="text-uppercase small">total cost</span>
                  <span>
                    {cartItems.items && currencyFormatter.format(finalTotal)}
                  </span>
                </div>
                <div className="d-grid gap-2">
                  <button
                    onClick={goToCheckout}
                    className="btn btn-sm btn-primary rounded-0"
                  >
                    <span className="text-uppercase small  square">
                      checkout
                    </span>
                  </button>
                </div>
              </div>
              <Link to="/" className={style.back_link}>
                <div className="d-flex align-items-center mt-3 mb-4">
                  <span
                    className="material-icons-outlined me-2"
                    style={{ fontSize: "15px" }}
                  >
                    arrow_back
                  </span>
                  <span className="small">Continue shopping</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
