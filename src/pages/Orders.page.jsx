import React, { useContext, useEffect } from "react";
import { OrdersListContext, UserContext } from "../utils/UserContext";
import { fetchUserOrders } from "../utils/userHandler";
import Moment from "react-moment";
import giftBag from "../assets/images/giftbag.png";
import SpinLoader from "../components/SpinLoader";
import { Link } from "react-router-dom";
import { useState } from "react";
import UserSidePanel from '../components/Nav/UserSidePanel';

const Orders = () => {
  const { currentUser } = useContext(UserContext);
  const { ordersList, setOrdersList } = useContext(OrdersListContext);
  const [showTrackDetails, setShowTrackDetails] = useState(false);

  const currencyFormatter = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "UGX",
  });
  useEffect(() => {
    if (currentUser && currentUser.userId)
      if (!ordersList) fetchUserOrders(currentUser.userId, setOrdersList);
  }, [currentUser?.userId]);

  useEffect(() => {
    document.querySelector("body").classList.add("body_gray");
    return () => {
      document.querySelector("body").classList.remove("body_gray");
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <UserSidePanel />
        </div>
        <div className="col-sm-12 col-md-9">
          <div className="order_inner bg-white my-5 rounded border">
            <h6 className="border-bottom px-4 p-3 mb-3">My orders</h6>
            <div className="p-3">
              {!ordersList ? (
                <SpinLoader />
              ) : ordersList.length === 0 ? (
                <div className="text-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/jvucoldz.json"
                    trigger="hover"
                    colors="primary:#121331,secondary:#8dca57"
                    style={{ width: "200px", height: "200px" }}
                  ></lord-icon>
                  <div className="text-muted small mb-4">
                    There are no orders
                  </div>
                  <Link
                    to="/"
                    className="d-flex align-items-center justify-content-center mb-5 "
                    style={{ color: "#8DCA57" }}
                  >
                    <span
                      className="material-icons-outlined"
                      style={{ fontSize: "18px" }}
                    >
                      arrow_back
                    </span>
                    <span className="small fw-bold">Shop Now</span>
                  </Link>
                </div>
              ) : (
                ordersList?.map((order) => (
                  <div
                    key={order.orderId}
                    className="d-flex align-item-center justify-content-between border rounded p-3 mb-3"
                  >
                    <div className="d-flex align-items-center">
                      <img width="80" height="100" src={giftBag} />
                      <div className="ms-3">
                        <div className="text-muted small">
                          Order id : {order?.orderId}
                        </div>
                        <div className="small mt-2">
                          <span className="bg-warning  small py-1 px-2 rounded-1 text-capitalize ">
                            {order?.Actions[order?.Actions?.length - 1]?.status}
                          </span>
                        </div>
                        <div className="small mt-2 text-muted">
                          <span className="fw-bold">Method :</span>{" "}
                          <span className="text-capitalize text-muted">
                            {order.payment_method}
                          </span>
                        </div>
                        <div className="small mt-1">
                          Total :{" "}
                          {currencyFormatter.format(
                            Number(order?.totalFee.replace(/[^0-9]+/g, ""))
                          )}{" "}
                        </div>
                        {/* <div className="small">on {order.date}</div> */}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="small mb-3 text-muted">
                        {
                          <Moment
                            date={order.date
                              .split(" ")
                              .reverse()[2]
                              .split("/")
                              .reverse()
                              .join("-")}
                            format="DD MMM YYYY"
                          />
                        }
                      </div>
                      <Link
                        to={{
                          pathname: "/customer/order/details",
                          state: { ...order },
                        }}
                      >
                        {" "}
                        <span className="btn-primary btn-sm small">
                          <span className="small">See Details</span>
                        </span>
                      </Link>
                      <div className="text-capitalize small mt-4">
                        <Link
                          to={{
                            pathname: "/customer/order/track",
                            state: order.Actions,
                          }}
                        >
                          {" "}
                          <span className="btn btn-sm btn-outline-secondary">
                            <span className="small">track order</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
