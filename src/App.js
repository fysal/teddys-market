import "./App.css";
import MainRoutes from "./pages";
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  UserContext,
  CartContext,
  ProductContext,
  OrdersListContext,
} from "./utils/UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfig";
import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState({ original: null, items: [] });
  const [groceries, setGroceries] = useState([]);
  const [ordersList, setOrdersList] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <CartContext.Provider value={{ cartItems, setCartItems }}>
          <OrdersListContext.Provider value={{ ordersList, setOrdersList }}>
            <Router>
              <Switch>
                <ProductContext.Provider value={{ groceries, setGroceries }}>
                  <Switch>
                    <Route path="/" component={MainRoutes} />
                    <Route path="/cart" component={MainRoutes} />
                    <Route path="/checkout" component={MainRoutes} />
                    <Route
                      path="/transaction-complete"
                      component={MainRoutes}
                    />
                    <Route
                      path="/customer/order/details"
                      componet={MainRoutes}
                    />
                    <Route path="/products" component={MainRoutes} />
                  </Switch>
                </ProductContext.Provider>
                <Route path="/user" component={MainRoutes} />
                <Route path="/customer/account" component={MainRoutes} />
                <Route path="/customer/orders" component={MainRoutes} />
                <Route path="/customer/order/track" component={MainRoutes} />
                <Route component={MainRoutes} />
              </Switch>
            </Router>
          </OrdersListContext.Provider>
        </CartContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
