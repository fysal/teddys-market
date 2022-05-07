import "./App.css";
import MainRoutes from "./pages";
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext, CartContext } from "./utils/UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfig";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <CartContext.Provider value={{cartItems, setCartItems}}>
          <Router>
            <Switch>
              <Route path="/" component={MainRoutes} />
              <Route path="/user" component={MainRoutes} />
            </Switch>
          </Router>
        </CartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
