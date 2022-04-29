import React from 'react'
import Input from '../form/widgets/Input';
import styles from './styles/styles.module.css';
import clsx from 'clsx';
import logo from '../../assets/logo/teddy-logo.png';
import shopping_cart from '../../assets/icons/shopping-cart.png';

const MainNav = () => {
  return (
    <div className={clsx(styles.header)}>
      <div className={clsx(styles.container, "row py-2 align-items-center")}>
        <div className="col-sm-12 col-md-2">
          <div className={styles.logo}>
            <img src={logo} width="70" />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 ">
          <div
            className={clsx(
              styles.nav_search,
              "d-flex align-center justify-content-start flex-1"
            )}
          >
            <input placeholder="Search..." className={clsx(styles.input,"ms-2")} />
            <span
              className={clsx(styles.btnSearch, "material-icons-outlined ms-2")}
            >
              search
            </span>
          </div>
        </div>
        <div className="col-sm-12 col-md-2">
          <div className={clsx(styles.contact, "d-flex align-items-center")}>
            <span className={clsx(styles.callBtn, "material-icons-outlined")}>
              phone_in_talk
            </span>
            <div className="ms-2">
              <div className={clsx(styles.call_, "text-uppercase text-muted")}>
                call us now
              </div>
              <div className={styles.call}>0772 879 984</div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-2">
          <div className="d-flex align-items-center">
            <span className={clsx(styles.cart_, "position-relative")}>
              <img src={shopping_cart} width="20" />
              <span
                className={clsx(
                  styles.count,
                  "d-flex align-items-center justify-content-center text-white rounded-circle"
                )}
              >
                0
              </span>
            </span>
            <span className={clsx(styles.catx, "ms-3 ddfdf")}>My cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNav