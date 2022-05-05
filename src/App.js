import "./App.css";
import MainRoutes from "./pages";
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext } from "./utils/UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebaseConfig";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Router>
          <Switch>
            <Route path="/" component={MainRoutes} />
            <Route path="/user" component={MainRoutes} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
