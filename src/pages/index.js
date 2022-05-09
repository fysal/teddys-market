import { Route} from "react-router-dom";
import Home from './Home'
import MainLayout from '../layouts/MainLayout'
import AuthForm from "../components/form/widgets/Auth.form";
import AnnonymousRoutes from "../components/protectedRoutes/AnnonymousRoutes";
import CartPage from "./Cart.page";
import Checkout from "./Checkout.page";
import ProtectedRoutes from "../components/protectedRoutes/ProtectedRoutes";


const MainRoutes = () => {
  return (
    <MainLayout>
      <Route exact path="/" component={Home} />
      <AnnonymousRoutes path="/user" component={AuthForm} />
      <ProtectedRoutes path="/cart" component={CartPage} />
      <ProtectedRoutes path="/checkout" component={Checkout} />
    </MainLayout>
  );
};

export default MainRoutes;
