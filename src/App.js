import "./App.css";
import MainRoutes from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainRoutes} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
