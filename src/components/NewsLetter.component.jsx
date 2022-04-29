import clsx from "clsx";
import React from "react";
import Greenleaf from "../assets/images/green-leaf.png";
import Styles from "./styles/strip.module.css";

const NewsLetter = () => {
  return (
    <div
      className={Styles.newsl}
      style={{ backgroundImage: `url(${Greenleaf})` }}
    >
      <div className="container py-5">
        <div className={clsx(Styles.newsletter, "bg-white py-5 my-5")}>
          <h4 className="tit text-center">Sign up for Newsletters</h4>
          <p className={clsx(Styles.ifn, "text-center pb-3")}>
            Sign up for newsletter to receive special offers and exclisive news
          </p>
          <div
            className={clsx(
              Styles.newsletter_wrapper,
              "d-flex align-items-center ps-2  rounded-pill"
            )}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className={clsx(Styles.input_news_letter, "ms-3 w-100")}
            />
            <button
              className={clsx(
                Styles.newsLetterBtn,
                "btn btn-sm text-white rounded-pill py-2 px-3"
              )}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
