import { Route , Switch} from "react-router-dom";
import Home from './Home'
import MainLayout from '../layouts/MainLayout'
import AuthForm from "../components/form/widgets/Auth.form";

const MainRoutes = () => {
  return (
    <MainLayout>
      <Route  exact path="/" component={Home} />
      <Route  path="/user" component={AuthForm} />
    </MainLayout>
  );
};

export default MainRoutes;
