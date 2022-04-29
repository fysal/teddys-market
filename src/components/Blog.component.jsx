import clsx from "clsx";
import React from "react";
import blog1 from "../assets/images/blog1.png";
import blog2 from "../assets/images/blog2.png";
import blog3 from "../assets/images/blog3.png";
import blog4 from "../assets/images/blog4.png";
import Styles from "./styles/strip.module.css";

const BlogComponent = () => {
  const data = [
    {
      title: "Lorem ipsum dolor sit amet ",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ",
      image: blog1,
    },
    {
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ",
      image: blog2,
    },
    {
      title: "Lorem ipsum dolor sit amet ",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ",
      image: blog3,
    },
    {
      title: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ",
      image: blog4,
    },
  ];
  return (
    <>
      <div className="container pb-5">
        <h4 className="text-center py-4">Latest Post</h4>
        <div className="row">
          {data.map((item, index) => (
            <div key={index} className="col-ms-12 col-md-3">
              <img src={item.image} width="100%" />
              <div className={clsx(Styles.blog_title, "fw-bold small pt-3 pb-2")}>
                {item.title}
              </div>
              <div className={clsx(Styles.blog_desc, "text-muted")}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            className={clsx(
              Styles.moreBtn,
              "btn btn-sm  text-uppercase text-white mt-5 px-3"
            )}
          >
            Read more
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogComponent;
