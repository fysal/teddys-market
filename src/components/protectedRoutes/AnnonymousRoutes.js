import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";

const AnnonymousRoutes = ({ component: Component, ...rest }) => {
  const context = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (context.currentUser) return <Redirect to="/" />;
        else return <Component {...props} />;
      }}
    />
  );
};

export default AnnonymousRoutes;
