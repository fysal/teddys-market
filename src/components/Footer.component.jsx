import React from "react";
import Styles from "./styles/strip.module.css";
import bg from "../assets/images/bg-serpia.png";
import f1 from "../assets/icons/f1.png";
import f2 from "../assets/icons/f2.png";
import f3 from "../assets/icons/f3.png";
import call from "../assets/icons/call.png";
import pin from "../assets/icons/pin.png";
import mail from "../assets/icons/mail.png";
import clock from "../assets/icons/clock.png";
import clsx from "clsx";
import paymentsImage from "../assets/images/payments.png";
import googlePlayButton from '../assets/images/google_play_button.png';
import { Link } from "react-router-dom";


const Footer = () => {
  const footerTop = [
    {
      icon: f1,
      title: "Flexible payment",
      text: "With just a press of a button you will be ready to go.",
    },
    {
      icon: f2,
      title: "Delivery at your doorstep",
      text: "Our experienced riders will find you no matter where you are.",
    },
    {
      icon: f3,
      title: "Quality service guaranteed",
      text: "We make a promise to deliver fresh, healthy products.",
    },
  ];
  const customercare = [
    "contact us",
    "help and advice",
    "Shipping and return",
    "terms and conditions",
    "return policy",
  ];
  const information = [
    "My account",
    "payment and return",
    "catalogue online",
    "refund policy",
  ];
  const about = [
    "who we are",
    "corporate resposibility",
    "careers",
    "privacy policy",
  ];
  const contact = [
    { icon: call, text: "(+256 754 498 630)" },
    { icon: mail, text: "info@teddysfreshmarket.com" },
    { icon: pin, text: "Ntind stretcher road" },
    { icon: clock, text: "opening hours: 9:00am - 20:00Pm" },
  ];
  return (
    <>
      <div
        className={Styles.footerTop}
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="container">
          <div className="row">
            {footerTop.map((item, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-4 d-flex align-items-center"
              >
                <img src={item.icon} width="80" />
                <div className="ms-3">
                  <div className={clsx(Styles.footer_title)}>{item.title}</div>
                  <div className={Styles.footer_text}>{item.text}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={clsx(Styles.footerMiddel, "mt-5")}>
            <div className="row">
              <div className="col-sm-6 col-md-3">
                <div className={Styles.footer_title}>customer service</div>
                <ul className=" p-0">
                  {customercare.map((item, index) => (
                    <li
                      key={index}
                      className={clsx(
                        Styles.footer_text,
                        "d-block py-1 text-capitalize"
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-sm-6 col-md-3">
                {" "}
                <div className={Styles.footer_title}>information</div>
                <ul className=" p-0">
                  {information.map((item, index) => (
                    <li
                      key={index}
                      className={clsx(
                        Styles.footer_text,
                        "d-block py-1 text-capitalize"
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-sm-6 col-md-3">
                {" "}
                <div className={Styles.footer_title}>about us</div>
                <ul className=" p-0">
                  {about.map((item, index) => (
                    <li
                      key={index}
                      className={clsx(
                        Styles.footer_text,
                        "d-block py-1 text-capitalize"
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-sm-6 col-md-3">
                {" "}
                <div className={Styles.footer_title}>contact us</div>
                <ul className=" p-0">
                  {contact.map((item, index) => (
                    <li
                      key={index}
                      className={clsx(
                        Styles.footer_text,
                        "d-block py-1 text-capitalize d-flex align-items-center "
                      )}
                    >
                      <span>
                        <img src={item.icon} width="15" />
                      </span>
                      <span className="ms-2">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-3">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="small text-muted">
              Copyright {new Date().getFullYear()} © teddy's freshmarket. All
              rights reserved
            </div>
            <Link
              to={{
                pathname:
                  "https://play.google.com/store/apps/details?id=com.teddys.freshmarket",
              }}
              target="_blank"
            >
              <img src={googlePlayButton} width="110" />
            </Link>
            <img src={paymentsImage} width="310" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
