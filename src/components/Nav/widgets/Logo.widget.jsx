import React from 'react';
import logo from "../../../assets/logo/teddy-logo.png";
import { Link } from 'react-router-dom';
import styles from '../styles/styles.module.css';

const LogoWidget = () => {
  return (
    <Link to="/">
      <div className={styles.logo}>
        <img src={logo} width="70" />
      </div>
    </Link>
  );
}

export default LogoWidget;