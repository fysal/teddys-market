import { Route} from "react-router-dom";
import Home from './Home'
import MainLayout from '../layouts/MainLayout'
import AuthForm from "../components/form/widgets/Auth.form";
import AnnonymousRoutes from "../components/protectedRoutes/AnnonymousRoutes";


const MainRoutes = () => {
  return (
    <MainLayout>
      <Route exact path="/" component={Home} />
      <AnnonymousRoutes path="/user" component={AuthForm} />
    </MainLayout>
  );
};

export default MainRoutes;
