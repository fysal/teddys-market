import React, { useEffect, useState, useContext } from "react";
import fruitIcon from "../assets/icons/fruits.png";
import vegeIcon from "../assets/icons/vegetables.png";
import offersIcon from "../assets/icons/offers.png";
import ryanIcon from "../assets/icons/ryans.png";
import spiceIcon from "../assets/icons/spice.png";
import stapleIcon from "../assets/icons/staple.png";
import meatFishIcon from "../assets/icons/meat-fish.png";
import Styles from "./styles/product.module.css";
import clsx from "clsx";
import SpinLoader from "./SpinLoader";
import { ProductContext } from "../utils/UserContext";
import { fetchGroceries } from "../utils/userHandler";

import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import NoResults from "./NoResults.component";

const Products = () => {
  const tabs = [
    { title: "vegetables", icon: vegeIcon, id: 0 },
    { title: "fruits", icon: fruitIcon, id: 1 },
    { title: "Meats and fish", icon: meatFishIcon, id: 2 },
    { title: "offers", icon: offersIcon, id: 3 },
    { title: "Ryans garden", icon: ryanIcon, id: 4 },
    { title: "Cooking essentials", icon: spiceIcon, id: 5 },
    { title: "staples food", icon: stapleIcon, id: 6 },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const { groceries, setGroceries } = useContext(ProductContext);
  const [activeGroceryList, setActiveGroceryList] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (groceries.length < 1) {
      setFetching(true);
      fetchGroceries(setGroceries, setFetching);
    }
  }, []);

  useEffect(() => {
    let activeList = [];
    if (groceries.length > 0) {
      switch (activeTab) {
        case 0:
          activeList = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("vegetables")
          );
          return setActiveGroceryList(activeList);

        case 1:
          activeList = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("fruits")
          );
          return setActiveGroceryList(activeList);

        case 2:
          setActiveGroceryList([]);
          activeList = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("meats")
          );
          return setActiveGroceryList(activeList);
        case 3:
          activeList = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("offers")
          );
          return setActiveGroceryList(activeList);
        case 4:
          activeList = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("ryans garden")
          );
          return setActiveGroceryList(activeList);
        case 5:
          activeList = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("cooking essentials")
          );
          return setActiveGroceryList(activeList);
        case 6:
          activeList = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("more groceries")
          );
          return setActiveGroceryList(activeList);
        default:
          return;
      }
    }
  }, [activeTab, groceries]);
  return (
    <>
      <div className="container text-center mt-5">
        <h4 className="">Discover Our Products</h4>
        <p className="text-muted small">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium.
        </p>
        <div className="d-flex align-items-center justify-content-between mt-5 flex-wrap">
          {tabs.map((tab) => (
            <div
              className={clsx(
                activeTab === tab.id ? Styles.activeTab : "",
                Styles.tab,
                "d-flex align-items-center justify-content-center flex-column pb-2 pointer"
              )}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <img src={tab.icon} width="100px" />
              <div className="small text-capitalize">{tab.title}</div>
            </div>
          ))}
        </div>
        {fetching === true ? (
          <SpinLoader />
        ) : (
          <>
            {activeGroceryList.length === 0 ? (
              <NoResults />
            ) : (
              <ProductCard groceries={activeGroceryList.slice(0, 30)} />
            )}
            <div className="text-center">
              <Link
                to="/products"
                className="btn btn-sm btn-primary text-uppercase"
              >
                <span className="small">View all products</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
