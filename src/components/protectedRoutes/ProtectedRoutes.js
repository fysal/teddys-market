import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (currentUser) return <Component {...props} />;
        else return <Redirect to="/" />;
      }}
    />
  );
};

export default ProtectedRoutes;
