import clsx from "clsx";
import greenBg from "../assets/icons/green-strip.png";
import styles from "./styles/strip.module.css";
import basket from "../assets/images/basket.png";

const GiftStrip = () => {
  return (
    <div
      className={clsx(styles.strip)}
      style={{ backgroundImage: `url(${greenBg})` }}
    >
      <div className="container d-flex align-items-center justify-content-between text-white">
        <div>
          <span className={styles._50perc}>50% </span>
          <span className={clsx(styles.off, "text-white text-uppercase")}>
            Off
          </span>
        </div>
        <div className={clsx(styles.shop, "text-uppercase")}>shop now</div>

        <div className={clsx(styles.popul)}>Popular and <br/> Trending Products</div>
        <div className={clsx(styles.img_wrap, "flex-1")}>
          <img src={basket} className={clsx(styles.img)} />
        </div>
      </div>
    </div>
  );
};

export default GiftStrip;
