import clsx from "clsx";
import greenBg from "../assets/icons/green-strip.png";
import styles from "./styles/strip.module.css";
import basket from "../assets/images/basket.png";
import { useMediaQuery } from "react-responsive";

const GiftStrip = () => {
  const isBigScreen = useMediaQuery({ query :'(min-width : 767px)'})
  return (
    <div
      className={clsx(styles.strip)}
      style={{ backgroundImage: `url(${greenBg})` }}
    >
      <div
        className={clsx(
          "container text-white",
          isBigScreen &&
            "d-flex align-items-center justify-content-between  flex-wrap"
        )}
      >
        <div>
          <span className={styles._50perc}>50% </span>
          <span className={clsx(styles.off, "text-white text-uppercase")}>
            Off
          </span>
        </div>
        <div className={clsx(styles.shop, "text-uppercase")}>shop now</div>

        <div className={clsx(styles.popul)}>
          Popular and {isBigScreen && <br /> } Trending Products
        </div>
        <div className={clsx(styles.img_wrap, "flex-1")}>
          <img src={basket} className={clsx(styles.img)} />
        </div>
      </div>
    </div>
  );
};

export default GiftStrip;
