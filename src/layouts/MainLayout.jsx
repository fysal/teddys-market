import React from "react";
import MainNav from "../components/Nav/MainNav";
import Footer from '../components/Footer.component'
const MainLayout = ({ children }) => {
  return (
    <>
      <div className="main-menu"> <MainNav/></div>
      <div className="main">{children}</div>
      <div className="footer"><Footer/></div>
    </>
  );
};

export default MainLayout;
