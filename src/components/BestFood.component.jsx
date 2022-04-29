import clsx from "clsx";
import React from "react";
import bgSerpia from "../assets/images/bg-serpia.png";
import giftBag from '../assets/images/giftbag.png';
import styles from './styles/strip.module.css'
import a from '../assets/icons/a.png';
import s from '../assets/icons/s.png';
import p from '../assets/icons/p.png';
import n from '../assets/icons/n.png';

const BestFoodComponent = () => {
  const data = [
    {
      num: "01.",
      title: "always fresh",
      icon: a,
      info: `Maximus, purus quis tincidunt semper, felis tellus mole stie nulla, in finibus erat magna et tortor phasellus a magna lobortis`,
    },
    {
      num: "02.",
      title: "super healthy",
      icon: s,
      info: `Maximus, purus quis tincidunt semper, felis tellus mole stie nulla, in finibus erat magna et tortor phasellus a magna lobortis`,
    },
    {
      num: ".03",
      title: "premium quality",
      icon: p,
      info: `Maximus, purus quis tincidunt semper, felis tellus mole stie nulla, in finibus erat magna et tortor phasellus a magna lobortis`,
    },
    {
      num: ".04",
      title: "100% natural",
      icon: n,
      info: `Maximus, purus quis tincidunt semper, felis tellus mole stie nulla, in finibus erat magna et tortor phasellus a magna lobortis`,
    },
  ];

  return (
    <div
      className={clsx(styles.bestFood,"pb-5")}
      style={{ backgroundImage: `url(${bgSerpia})` }}
    >
      <div className="text-center">
        <h4 className="text-capitalize">We grow best food</h4>
        <p className="small">
          Lorem ipsum dolor sit amet, consectetur elit sed do eiusmod tempor
          incididunt
        </p>
      </div>
      <div className="row container pb-5">
        <div className="col-sm-12 col-md-4">
          {data.slice(0, 2).map((item, index) => (
            <div key={index} className="d-flex align-items-start text-start">
              <img src={item.icon} width="40" className="mt-2" />
              <div className="ms-3 mb-3">
                <div className={styles.num}>{item.num}</div>
                <div
                  className={clsx(styles.title, "text-uppercase fw-bold fs-5")}
                >
                  {item.title}
                </div>
                <div className={clsx(styles.info)}>{item.info}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-sm-12 col-md-4 d-flex align-items-center justify-content-center">
          <img src={giftBag} width="60%" />
        </div>
        <div className="col-sm-12 col-md-4">
          {data.slice(2, 4).map((item, index) => (
            <div key={index} className="d-flex align-items-start text-end">
              <div className="me-3 mb-3">
                <div className={styles.num}>{item.num}</div>
                <div
                  className={clsx(styles.title, "text-uppercase fw-bold fs-5")}
                >
                  {item.title}
                </div>
                <div className={clsx(styles.info)}>{item.info}</div>
              </div>
              <img src={item.icon} width="40" className="mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestFoodComponent;
