import React, { useEffect, useState, useContext } from "react";
import { firebase } from "../utils/firebaseConfig";
import { ref, onValue } from "firebase/database";
import fruitIcon from "../assets/icons/fruits.png";
import vegeIcon from "../assets/icons/vegetables.png";
import offersIcon from "../assets/icons/offers.png";
import ryanIcon from "../assets/icons/ryans.png";
import spiceIcon from "../assets/icons/spice.png";
import stapleIcon from "../assets/icons/staple.png";
import meatFishIcon from "../assets/icons/meat-fish.png";
import cartIcon from "../assets/icons/shopping-bag.png";
import Styles from "./styles/product.module.css";
import clsx from "clsx";
import SpinLoader from "./SpinLoader";
import { UserContext, ProductContext } from "../utils/UserContext";
import { fetchGroceries } from "../utils/userHandler";


import { addToCart } from "../utils/userHandler";

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
  const {groceries, setGroceries} = useContext(ProductContext);
  const [activeGroceryList, setActiveGroceryList] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchGroceries(setGroceries, setFetching);
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
            <ProductCard groceries={activeGroceryList.slice(0, 30)} />
            <div className="text-center">Load more </div>
          </>
        )}
      </div>
    </>
  );
};

export default Products;

export const ProductCard = ({ groceries }) => {
  const [values, setValue] = useState({});
  const { currentUser } = useContext(UserContext);

  const addItemToCart = async (e, product) => {
    e.preventDefault();
    if (currentUser) {
      await addToCart(currentUser, values[product.itemId], product);
    } else {
      //Let the user know
      console.log("You are not loggedin");
    }
  };
  const onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };
  const increment = (id) => {
    if (values.hasOwnProperty(id))
      setValue({ ...values, [id]: parseInt(values[id]) + 1 });
    else setValue({ ...values, [id]: +1 });
  };

  const decrement = (id) => {
    if (values.hasOwnProperty(id)) {
      if (values[id] > 1) {
        setValue({ ...values, [id]: parseInt(values[id]) - 1 });
      }
    }
  };
  return (
    <div className="row mt-4">
      {groceries.map((grocery) => (
        <div key={grocery.itemId} className="col-sm-6 col-md-3">
          <div className={clsx(Styles.product_card, " p-3 text-center mb-4")}>
            <div className="d-flex align-items-center justify-content-between">
              <span className={Styles.new}>New</span>
              <span className={Styles.off}>-20%</span>
            </div>
            <img src={grocery.imageUrl} width="100" className="mb-3" />
            <div className="text-muted small mb-3">{grocery.itemName}</div>

            <div className="small fw-bold">UGX {grocery.itemPrice}</div>
            <div className="small text-capitalize">Per {grocery.unit}</div>
            <div className="small text-capitalize">{grocery.category}</div>
            {grocery.availability === "In Stock" ? (
              <>
                {" "}
                <form
                  className="mt-2"
                  onSubmit={(e) => addItemToCart(e, grocery)}
                >
                  <div className="mb-4 text-center">
                    <input
                      name={grocery.itemId}
                      onChange={onChange}
                      type="hidden"
                      min="1"
                      max="1000"
                      defaultValue="1"
                      className="text-center"
                    />
                    <div className="d-flex align-items-center justify-content-center">
                      <span
                        className="material-icons-outlined border pointer"
                        onClick={() => decrement(grocery.itemId)}
                      >
                        remove
                      </span>
                      <span className={clsx(Styles.qty, " px-3")}>
                        {values[grocery.itemId] ?? 1}
                      </span>
                      <span
                        className="material-icons-outlined border pointer"
                        onClick={() => increment(grocery.itemId)}
                      >
                        add
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={clsx(
                      Styles.btn_add_to_cart,
                      "btn btn-sm rounded-pill px-3 "
                    )}
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <img src={cartIcon} width="13" />
                      <span className={clsx(Styles.btn_text_small, "ms-1")}>
                        Add to cart
                      </span>
                    </div>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-danger fw-bold mt-2 small">Out of stock</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
