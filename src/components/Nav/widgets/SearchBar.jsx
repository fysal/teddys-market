import { useState } from "react";
import clsx from "clsx";
import React from "react";
import styles from "../styles/styles.module.css";
import { useHistory } from "react-router-dom";


const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const onSearch = (e) => {
    e.preventDefault();
    if (searchText !== "") {
      history.push({
        pathname: "/products",
        search: `?query=${searchText.trim()}`,
      });
      setSearchText("");
    }
    document.querySelector(".search-drop").classList.remove("show");
  };
  const onChange = (e) => setSearchText(e.target.value);
  return (
    <form
      onSubmit={(e) => onSearch(e)}
      className={clsx(
        styles.nav_search,
        "d-flex align-center justify-content-start flex-1"
      )}
    >
      <input
        placeholder="Search..."
        className={clsx(styles.input, "ms-2")}
        onChange={onChange}
        value={searchText}
      />
      <button
        type="submit"
        className={clsx(
          styles.btnSearch,
          "material-icons-outlined ms-2 pointer"
        )}
        style={{border:"medium none", color:"#fff"}}
      >
        search
      </button>
    </form>
  );
};

export default SearchBar;
