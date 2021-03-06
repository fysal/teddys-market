import { Route, Switch} from "react-router-dom";
import Home from './Home'
import MainLayout from '../layouts/MainLayout'
import AuthForm from "../components/form/widgets/Auth.form";
import AnnonymousRoutes from "../components/protectedRoutes/AnnonymousRoutes";
import CartPage from "./Cart.page";
import Checkout from "./Checkout.page";
import ProtectedRoutes from "../components/protectedRoutes/ProtectedRoutes";
import TransactionComplete from "./TransactionCompleted.page";
import MyAccount from "./MyAccount.page";
import Orders from "./Orders.page";
import OrderDetails from "./OrderDetails.page";
import TrackOrder from "./TrackOrder.page";
import ProductsPage from "./Products.page";
import PageNotFound from "./PageNotFound.page";


const MainRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <AnnonymousRoutes path="/user" component={AuthForm} />
        <ProtectedRoutes path="/cart" component={CartPage} />
        <ProtectedRoutes path="/checkout" component={Checkout} />
        <ProtectedRoutes
          path="/transaction-complete"
          component={TransactionComplete}
        />
        <ProtectedRoutes path="/customer/account" component={MyAccount} />
        <ProtectedRoutes path="/customer/orders" component={Orders} />
        <ProtectedRoutes
          path="/customer/order/details"
          component={OrderDetails}
        />
        <ProtectedRoutes path="/customer/order/track" component={TrackOrder} />
        <Route path="/products" component={ProductsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </MainLayout>
  );
};

export default MainRoutes;
