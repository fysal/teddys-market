import clsx from "clsx";
import React,{useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import style from './styles/styles.module.css';
const Checkout = ({location}) => {
  console.log(location.state)
  const {subTotal, finalTotal, deliveryMethod, cartItems} = location.state;

  const currencyFormatter = Intl.NumberFormat('en-us',{style:"currency", currency: "UGX"});
   const history = useHistory();
    useEffect(() => {
      if(!location.state.hasOwnProperty("cartItems") || cartItems.length < 1)
      return history.push("/cart")
      
      document.querySelector("body").classList.add("body_gray");
      return () => {
        document.querySelector("body").classList.remove("body_gray");
      };
    }, []);
  return (
    <div className="container">
      <div className={clsx(style.cart_wrapper)}>
        <div className="row">
          <div className="col-sm-12 col-md-8 px-5 pt-3 pb-5">
            <h6
              className={clsx(
                style.headers,
                "d-flex align-items-start mt-4 mb-4"
              )}
            >
              Checkout
            </h6>
            payment method Billing address
          </div>
          <div
            className={clsx(
              "col-sm-12 col-md-4 px-5 pt-3 pb-5",
              style.cart_sum
            )}
          >
            <h6
              className={clsx(
                style.headers,
                "d-flex align-items-start mt-4 mb-4"
              )}
            >
              Order summery
            </h6>
            <div className="d-flex align-items-center justify-content-between mb-3 small">
              <span>Subtotal</span>
              <span>{currencyFormatter.format(subTotal)}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3 small">
              <span>Delivery fee</span>
              <span>{currencyFormatter.format(deliveryMethod.amount)}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3 small">
              <span>Discount</span>
              <span>UGX 0</span>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3 small fw-bold">
              <span>Total</span>
              <span>{currencyFormatter.format(finalTotal)}</span>
            </div>
            <div className="d-grid gap-2 mb-4 mt-4">
              <button className="btn btn-primary btn-sm text-uppercase">
                Place order
              </button>
            </div>
            <Link to="/cart" className={style.back_link}>
              <div className="d-flex align-items-center mt-3 mb-4">
                <span
                  className="material-icons-outlined me-2"
                  style={{ fontSize: "15px" }}
                >
                  arrow_back
                </span>
                <span className="small">Back to cart</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
