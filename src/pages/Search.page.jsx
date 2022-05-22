import React, { useEffect, useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../utils/UserContext";
import SelectFilter from "../components/form/widgets/SelectFilter";
import { fetchGroceries } from "../utils/userHandler";
import SpinLoader from "../components/SpinLoader";
import NoResults from "../components/NoResults.component";

const Search = ({ location }) => {
  const { groceries, setGroceries } = useContext(ProductContext);
  const [groceryList, setGroceryList] = useState(groceries);
  const [fetching, setFetching] = useState(false);

  const filterList = [
    "Vegetables",
    "Fruits",
    "Meats and Fish",
    "Offers",
    "Ryans Garden",
    "Cooking Essentials",
    "Staples Food",
  ];

  useEffect(() => {
    document.querySelector("body").classList.add("body_gray");
    document.querySelector(".main-menu").style = "position:sticky;top:0";
    
    return () => {
      document.querySelector("body").classList.remove("body_gray");
      document.querySelector(".main-menu").style = "position:relative;";
    };
  }, []);

  useEffect(() => {
    if (groceries.length < 1) {
      setFetching(true);
      fetchGroceries(setGroceries, setFetching);
    } else setGroceryList(groceries);
  }, [groceries]);

  useEffect(() => {
      window.scrollTo(0, 0);
    if (location.search !== "") {
      const searchText = location.search.split("=")[1];
      const searchResult = groceries.filter((grocery) =>
        grocery.itemName.toLowerCase().includes(searchText.toLowerCase())
      );

      setGroceryList([...searchResult]);
    }
  }, [location.search]);

  const filterByCategory = (e) => {
    console.log(e.target.value);
    if (groceries.length > 0) {
      let result = "";
      switch (e.target.value.toLowerCase()) {
        case "vegetables":
          result = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("vegetables")
          );
          return setGroceryList([...result]);
        case "fruits":
          result = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("fruits")
          );
          return setGroceryList([...result]);
        case "meats and fish":
          result = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("meats")
          );
          return setGroceryList([...result]);
        case "offers":
          result = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("offers")
          );
          return setGroceryList([...result]);
        case "ryans garden":
          result = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("ryans garden")
          );
          return setGroceryList([...result]);
        case "cooking essentials":
          result = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("cooking")
          );
          return setGroceryList([...result]);

        case "staples food":
          result = groceries.filter((grocery) =>
            grocery.category.toLowerCase().includes("more groceries")
          );
          return setGroceryList([...result]);

        default:
          return setGroceryList([...groceries]);
      }
    }
  };
  const resetList = () => {
    setGroceryList([...groceries]);
  };

  return (
    <div className="container py-5">
      {!fetching ? (
        <div className="">
          <div className="bg-white rounded-2">
            <div className="d-flex align-items-center justify-content-between   border-bottom pt-3 px-4">
              <h5 className="">All Products</h5>
                <SelectFilter
                  placeholder="Filter by category"
                  size="col-md-4"
                  list={filterList}
                  onChange={filterByCategory}
                />
              <button
                className="btn btn-sm btn-danger float-end"
                onClick={resetList}
              >
                <span className="small">Clear search</span>
              </button>
            </div>

            <div className="mt-2 px-4 pt-2 pb-4">
                {groceryList.length > 0 ?  <ProductCard groceries={groceryList} /> : <NoResults />}
             
            </div>
          </div>
        </div>
      ) : (
        <SpinLoader />
      )}
    </div>
  );
};

export default Search;
