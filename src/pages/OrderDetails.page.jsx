import { useEffect, useContext } from "react";
import Moment from "react-moment";
import { Link, useHistory } from "react-router-dom";
import UserSidePanel from "../components/Nav/UserSidePanel";
import { UserContext, ProductContext } from "../utils/UserContext";

const OrderDetails = ({ location }) => {
  const order = location.state;
  const history = useHistory();
  const currencyFormatter = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "UGX",
  });
  const { currentUser } = useContext(UserContext);
  const { groceries } = useContext(ProductContext);
  console.log(order);
  useEffect(() => {
    document.querySelector("body").classList.add("body_gray");
    return () => {
      document.querySelector("body").classList.remove("body_gray");
    };
  }, []);

  const productsInOrder = () => {
    const products = [];
    Object.values(order.Cart).forEach((item) => {
      const product = groceries.filter(
        (grocery) => grocery.itemId === item.itemId
      )[0];
      products.push({
        ...product,
        quantity: item.itemCount,
        totalPrice: item.itemTotal,
      });
    });

    return products;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-3">
          <UserSidePanel />
        </div>
        <div className="col-sm-12 col-md-9">
          <div className="order_inner bg-white my-5 rounded border">
            <h6 className="p-3 border-bottom d-flex align-items-center  ">
              <span
                className="material-icons-outlined me-2 pointer"
                style={{ fontSize: "18px" }}
                onClick={() => history.goBack()}
              >
                arrow_back
              </span>
              <span>Order details</span>
            </h6>
            <div className="p-4">
              <div className="border-bottom pb-4">
                <div className="text-muted small">
                  <span className="">Order id:</span> {order.orderId}
                </div>
                <div className="text-muted small ">
                  {Object.keys(order.Cart).length}
                  <span className=""> Items </span>{" "}
                </div>
                <div className="text-muted small ">
                  <span className="">Placed on: </span>
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
                <div className="small text-muted">
                  Total:{" "}
                  {currencyFormatter.format(
                    order.totalFee.replace(/[^0-9]+/g, "")
                  )}
                </div>
              </div>
              <h6 className="small text-uppercase mt-4">items in your order</h6>
              <div className="border rounded-2 p-3">
                <Link
                  to={{
                    pathname: "/customer/order/track",
                    state: order.Actions,
                  }}
                  className="float-end btn-primary small px-2 py-1 rounded-2"
                >
                  Track order
                </Link>
                {productsInOrder().map((product) => (
                  <div className="mb-3">
                    <div
                      className="d-flex align-items-center"
                      key={product.itemId}
                    >
                      <img src={product.imageUrl} width="60" height="60" />
                      <div className="ms-3 small">
                        {product.itemName}
                        <div className="small text-muted">
                          <div> Qty : {product.quantity}</div>
                          <div className="mt-2">
                            {" "}
                            Total :{" "}
                            {currencyFormatter.format(product.totalPrice)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row mt-3 pb-4">
                <div className="col-sm-12 col-md-6">
                  <div class="border rounded-2 ">
                    <h6 className="text-uppercase border-bottom small py-2 px-3">
                      Payment information
                    </h6>
                    <div className="px-3 pb-3 pt-2">
                      <h6 className="small text-capitalize">Payment method</h6>
                      <div className="text-muted small text-capitalize">
                        {order.payment_method}
                      </div>
                      <h6 className="mt-4 small text-capitalize">
                        Payment details
                      </h6>
                      <div className="small text-muted mb-1">
                        Sub total :{" "}
                        {currencyFormatter.format(
                          order.subTotal.replace(/[^0-9]+/g, "")
                        )}
                      </div>
                      <div className="small text-muted mb-1 ">
                        Delivery fee :{" "}
                        {currencyFormatter.format(order.deliveryFee)}
                      </div>
                      <div className="small text-muted mb-1">
                        Discount charge : 0
                      </div>
                      <div className="small  mb-1 mt-3">
                        Total fee :{" "}
                        {currencyFormatter.format(
                          order.totalFee.replace(/[^0-9]+/g, "")
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 ">
                  <div className="border rounded-2 ">
                    <h6 className="text-uppercase border-bottom small py-2 px-3">
                      Delivery information
                    </h6>
                    <div className="px-3 pb-3 pt-2">
                      <h6 className="small text-capitalize">Delivery method</h6>
                      {order.deliveryFee === 5000 ? (
                        <div className="small text-muted">
                          Standard delivery
                        </div>
                      ) : (
                        <div>Express delivery</div>
                      )}
                      <h6 className="small mt-4">Delivery Details</h6>
                      <div className="small text-muted">
                        <div className="mb-1">{currentUser.displayName}</div>
                        <div className="mb-1">{currentUser.email}</div>
                        <div className="mb-1">{currentUser.phoneNumber}</div>
                        <div className="mb-1">{currentUser.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
