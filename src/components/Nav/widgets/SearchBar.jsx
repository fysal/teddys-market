import { useState } from "react";
import clsx from "clsx";
import React from "react";
import styles from "../styles/styles.module.css";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const onSearch = () => {
    if (searchText !== "") {
      history.push({
        pathname: "/products",
        search: `?query=${searchText.trim()}`,
      });
      setSearchText("");
    }
  };
  const onChange = (e) => setSearchText(e.target.value);
  return (
    <div
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
      <span
        onClick={() => onSearch()}
        className={clsx(
          styles.btnSearch,
          "material-icons-outlined ms-2 pointer"
        )}
      >
        search
      </span>
    </div>
  );
};

export default SearchBar;
