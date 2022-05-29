import clsx from "clsx";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles/styles.module.css";
import { UserContext } from "../utils/UserContext";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumber } from "awesome-phonenumber";
import CreditCardWidget from "../components/checkout_widgets/CreditCardWidget";
import { collectFunds, checkTransaction } from "../utils/paymentHandler";
import {
  storeOrder,
  deleteCart,
  updateUserLocation,
} from "../utils/userHandler";
import { MobileMoneyWidget } from "../components/checkout_widgets/MobileMoneyWidget";
import randomString from '../utils/randomString';
 


const Checkout = ({ location }) => {
  const apiKey = process.env.REACT_APP_GOOGLEL_API_KEY;
  const { subTotal, finalTotal, deliveryMethod, cartItems, originalCart } =
    location.state;
  const { currentUser } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState(
    currentUser?.phoneNumber || null
  );
  const [error, setError] = useState("");
  const [paymentOption, setPaymentOPtion] = useState("mobile money");
  const [useDefaultNumber, setUseDefaultNumber] = useState(true);
  const [loading, setLoading] = useState(false);
  const [creditCardInformation, setCreditCardInformation] = useState({
    cardHolder: null,
    cardNumber: null,
    expMonth: null,
    expYear: null,
    cvc: null,
  });
  const currencyFormatter = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "UGX",
  });
  const history = useHistory();

  const external_reference = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");

  useEffect(() => {
    if (!location.state.hasOwnProperty("cartItems") || cartItems.length < 1)
      return history.push("/cart");

    setPhoneNumber(currentUser.phoneNumber);

    document.querySelector("body").classList.add("body_gray");
    return () => {
      document.querySelector("body").classList.remove("body_gray");
    };
  }, []);

  const phone = parsePhoneNumber(phoneNumber.toString(), "UG");



  const makePayment = async (e) => {
    e.preventDefault();
    if(!currentUser.latLng){
      return setError("Enable location in your browser");
    }
    const data = {
      msisdn: phoneNumber,
      amount: finalTotal,
      external_reference,
      narration: "Grocery payment",
    };
    setLoading(true);
    const response = await collectFunds(JSON.stringify(data));

    if (response.code > 199 && response.code < 300) {
      let transStatus = "pending";
      let transResponse = null;

      while (transStatus === "pending" || transStatus === "indeterminate") {
        transResponse = await processTransaction(response.transactionReference);
        transStatus = transResponse.data.transactionStatus.toLowerCase();
      }
      if (transStatus === "succeeded") {
        const hour = new Date().getHours() % 12;
        const amPm = hour >= 12 ? "am" : "pm";
        const date = new Date().getDate() + "/" + new Date().getMonth() + "/"+
          new Date().getFullYear() +
          " " +
          hour +
          ":" +
          new Date().getMinutes() +
          " " +
          amPm;
        const orderId = randomString();
        const payload = {
          Actions: [
            {
              date,
              itemId: 0,
              message: "We are confirming your order",
              status: "pending",
            },
          ],
          Cart: originalCart,
          Payment: response,
          Transaction: transResponse.data,
          address: currentUser.address,
          date,
          deliveryFee: deliveryMethod.amount,
          imageUrl: "default",
          orderId ,
          order_code: randomString().substring(0,9),
          payment_method: paymentOption,
          phoneNumber,
          status: "complete",
          subTotal: subTotal + " Ush",
          totalFee: finalTotal + " Ush",
          transactionReference: transResponse.data.transactionReference,
          transactionStatus: transResponse.data.transactionStatus,
          userId: currentUser.userId,
          userName: currentUser.displayName,
        };
        //store order
        await storeOrder(orderId, payload);

        //empty user cart.
        await deleteCart(currentUser.userId);

        setLoading(false);

        //redirect to success page
        history.push("/transaction-complete", { tag: "success" });
      } else {
        //display error message and return to page
        setError(
          "Transaction failed. \n Contact administrator for more assistance"
        );
        return setLoading(false);
      }
    } else {
      if (response.hasOwnProperty("msisdn")) {
        setLoading(false);
        return setError(
          "Phone number is invalid.\nPlease check number and try again "
        );
      } 
      else if(response.hasOwnProperty("amount")){
        setLoading(false);
        return setError(response.amount[0]);
      }
      else {
        setLoading(false);
        return setError("Something wrong. If this error persists please contact the administrator")
      }
    }
  };

  const processTransaction = async (reference) => {
    const response = await checkTransaction(reference);
    return response;
  };

  const getLocation = async () => {
    const geoLoc = navigator.geolocation.getCurrentPosition(showPosition);
    console.log(geoLoc)
  }
  async function showPosition(position) {
  //Adding to the location 
   const latLng = `${position.coords.latitude} , ${position.coords.longitude}`;
   await updateUserLocation(currentUser?.userId, latLng);
  }

  useEffect(() => {
    if (currentUser && !currentUser.latLng)
      if (navigator.geolocation) {
        getLocation();
      }

  },[navigator.geolocation])
    
  return (
    <>
      {loading && <LoadingWidget />}
      <div className="container">
        <div className={clsx(styles.cart_wrapper)}>
          <div className="row">
            <div className="col-sm-12 col-md-8 px-5 pt-3 pb-5">
              {error && <div className="alert alert-danger">{error}</div>}
              <h6
                className={clsx(
                  styles.headers,
                  "d-flex align-items-start mt-4 mb-4"
                )}
              >
                Checkout
              </h6>
              <div className="d-flex align-items-center">
                {" "}
                {[
                  { name: "mobile money", icon: "payments", id: 1 },
                  { name: "credit card", icon: "credit_card", id: 2 },
                  // {
                  //   name: "cash on delivery",
                  //   icon: "account_balance_wallet",
                  //   id: 3,
                  // },
                ].map((option) => (
                  <div
                    className={clsx(
                      styles.p_card,
                      paymentOption === option.name
                        ? styles.p_card_active
                        : null,
                      "d-flex align-items-center small me-3 py-3 px-4 pointer"
                    )}
                    onClick={() => setPaymentOPtion(option.name)}
                    key={option.id}
                  >
                    <span className="material-icons-outlined me-2">
                      {option.icon}
                    </span>
                    <span className="small text-capitalize">{option.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                {paymentOption === "mobile money" ? (
                  <MobileMoneyWidget
                    defaultPhoneNumber={currentUser?.phoneNumber}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    useDefaultNumber={useDefaultNumber}
                    setUseDefaultNumber={setUseDefaultNumber}
                  />
                ) : paymentOption === "credit card" ?  (
                  <CreditCardWidget
                    setCreditCardInformation={setCreditCardInformation}
                  />
                ) :  null}
              </div>

              <div className={clsx("mt-5 small text-capitalize")}>
                <h6 className="border-bottom pb-3 text-capitalize">
                  Billing address
                </h6>
                <div className={clsx(styles.billing_address, "p-3")}>
                  <div
                    className={clsx(styles.billing_address, "small fw-bold")}
                  >
                    {currentUser.displayName}
                  </div>
                  <div>{currentUser.address}</div>
                  <div>{currentUser.adminArea}</div>
                  <div>{currentUser.locality}</div>
                  <div>{currentUser.email}</div>
                  <div>
                    +{phone.getCountryCode()} {phone.getNumber("significant")}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                "col-sm-12 col-md-4 px-5 pt-3 pb-5",
                styles.cart_sum
              )}
            >
              <h6
                className={clsx(
                  styles.headers,
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
                <button
                  className="btn btn-primary btn-sm text-uppercase"
                  onClick={makePayment}
                >
                  Place order
                </button>
              </div>
              <Link to="/cart" className={styles.back_link}>
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
    </>
  );
};

export default Checkout;

export const LoadingWidget = () => {
  return (
    <div className="overlay d-flex align-items-center justify-content-center">
      <div className="bg-white text-center p-5 rounded-2">
        <lord-icon
          src="https://cdn.lordicon.com/nkmsrxys.json"
          trigger="loop"
          colors="primary:#121331,secondary:#8dca57"
          style={{ width: "250px", height: "250px" }}
        ></lord-icon>
        <h3 className="mb-3">Processing</h3>

        <div className="small mt-4"> Please wait</div>
      </div>
    </div>
  );
};


