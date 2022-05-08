import React, { useEffect, useState, useContext } from "react";
import { getCartItems } from "../utils/userHandler";
import styles from "./Nav/styles/styles.module.css";
import clsx from "clsx";
import shopping_cart from "../assets/icons/shopping-cart.png";
import { CartContext } from '../utils/UserContext';
import { NavLink } from 'react-router-dom';

const Cart = ({ currentUser }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  useEffect(() => {
    if (currentUser) getCartItems(currentUser?.uid, setCartItems);
    else setCartItems([])
  }, [currentUser]);
  return (
      <NavLink to="/cart">
          <div className="float-start d-flex align-items-center flex-2">
      <span className={clsx(styles.cart_, "position-relative")}>
        <img src={shopping_cart} width="20" />
        <span
          className={clsx(
            styles.count,
            "d-flex align-items-center justify-content-center text-white rounded-circle"
          )}
        >
          {cartItems?.length}
        </span>
      </span>
      <span className={clsx(styles.catx, "ms-3")}>My Cart</span>
    </div></NavLink>
    
  );
};

export default Cart;
