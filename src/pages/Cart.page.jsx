import React, { useContext, useEffect, useState } from "react";
import { fetchGroceries } from "../utils/userHandler";
import { CartContext, ProductContext } from "../utils/UserContext";
import Input from "../components/form/widgets/Input";
import { Link, useHistory } from "react-router-dom";
import style from "./styles/styles.module.css";
import clsx from "clsx";


const CartPage = () => {
  const [fetching, setFetching] = useState(false);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { groceries, setGroceries } = useContext(ProductContext);
  const [delivery, setDelivery] = useState({ name: null, value: null });

  const currencyFormatter = Intl.NumberFormat("en-us", {
    currency: "UGX",
    style: "currency",
  });

  const history = useHistory();

  useEffect(() => {
    if (groceries.length === 0) {
      fetchGroceries();
    }
    document.querySelector("body").classList.add("body_gray");
    return () => {
      document.querySelector("body").classList.remove("body_gray");
    };
  }, []);

  const fetchGroceries = async () => {
    setFetching(true);
    await fetchGroceries(setGroceries, setFetching);
    setFetching(false);
  };

  const computeTotal = () => {
    let grandTotal = 0;
    cartItems.forEach((item) => (grandTotal += item.itemTotal));

    return grandTotal;
  };

  const goToCheckout = () => {
    history.push('/checkout',cartItems)
  }

  return (
    <div className="container">
      <div className={clsx(style.cart_wrapper)}>
        <div className="row">
          <div className="col-sm-12 col-md-8 px-5 pt-3 pb-4">
            <div
              className={clsx(
                style.headers,
                "d-flex align-items-start justify-content-between mt-4 mb-3"
              )}
            >
              <h6>Shopping Cart</h6>{" "}
              <span className="small">{cartItems.length} Items</span>
            </div>
            {cartItems.length > 0 ? (
              <>
                <table className="table cart_table">
                  <thead>
                    <tr>
                      {[
                        "Product details",
                        "Quantity",
                        "Price",
                        "Sub Total",
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
                    {cartItems.map((item) => (
                      <tr key={item.cartId}>
                        <td className="d-flex align-items-start">
                          <img
                            width="50"
                            className="me-2"
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
                                  (grocery) => grocery.itemId === item.itemId
                                )[0]?.itemName
                              }
                            </div>
                            <div className="small text-muted ">
                              {
                                groceries.filter(
                                  (grocery) => grocery.itemId === item.itemId
                                )[0]?.availability
                              }
                            </div>
                          </div>
                        </td>
                        <td>
                          {" "}
                          <div className="small text-muted">
                            <span className="labls">X</span> {item.itemCount}
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              "Cart is empty"
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
                <span>Items {cartItems?.length}</span>
                <span>
                  <span>Total </span>
                  <span>
                    {cartItems && currencyFormatter.format(computeTotal())}
                  </span>
                </span>
              </div>
              <h6 className="mb-2 small">Delivery</h6>
              <select
                name="delivery"
                style={{ fontSize: "12px" }}
                className="form-select"
                onChange={(e) => console.log(e.target)}
              >
                {[
                  { name: "Standard delivery (5000)", value: 5000 },
                  { name: "Express delivery (10000)", value: 1000 },
                ].map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                ))}
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
                <div className="d-flex align-items-center justify-content-between mb-3 fw-bold small">
                  <span className="text-uppercase small">total cost</span>
                  <span>
                    {cartItems && currencyFormatter.format(computeTotal())}
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
                <div className="d-flex align-items-center mt-3">
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
