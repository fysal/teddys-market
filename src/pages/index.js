import { Route } from "react-router-dom";
import Home from './Home'
import MainLayout from '../layouts/MainLayout'

const MainRoutes = () => {
  return (
    <MainLayout>
      <Route exact path="/" component={Home} />
    </MainLayout>
  );
};

export default MainRoutes;
