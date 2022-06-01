import React from "react";
import MainNav from "../components/Nav/MainNav";
import Footer from "../components/Footer.component";
import { useMediaQuery } from "react-responsive";
import MobileNav from "../components/Nav/MobileNav";

const MainLayout = ({ children }) => {
  const isBigScreen = useMediaQuery({ query: "(min-width : 1024px)" });
  const isTablet = useMediaQuery({ query: "(min-width : 768px)" });
  const isMobile = useMediaQuery({ query: "( max-width : 600px)" });

  return (
    <>
      <div className="main-menu">{isBigScreen || isTablet ? <MainNav /> : <MobileNav />}</div>
      <div className="main">{children}</div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
