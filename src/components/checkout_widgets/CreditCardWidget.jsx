import clsx from "clsx";
import { useState, useEffect} from "react";
import Input from "../form/widgets/Input";
import SelectFilter from "../form/widgets/SelectFilter";
import months from "../../utils/months.json";
import card_logos from "../../assets/images/card-payment-logos.png";
import styles from "../../pages/styles/styles.module.css";

const CreditCardWidget = ({ setCreditCardInformation }) => {
  const [currentYear, setCurrentYear] = useState([]);
  useEffect(() => {
    let years = [];
    for (let num = 0; num < 5; num++) {
      if (years.length < 1) years.push(new Date().getFullYear());
      else {
        let curYear = years[years.length - 1] + 1;
        years.push(curYear);
      }
    }
    setCurrentYear(years);
  }, []);
  return (
    <div className={clsx(styles.card_Wrapper)}>
      <h6 className="border-bottom pb-2 mb-3 text-capitalize">
        Credit card information
      </h6>
      <Input
        name="card_holder"
        placeholder="As shown on the card"
        label="Name on Card"
        onChange={(e) =>
          setCreditCardInformation((prevState) => ({
            ...prevState,
            cardName: e.target.value,
          }))
        }
        required
      />
      <div className="row">
        <div className="col-sm-6 col-md-8">
          <Input
            name="cardNumber"
            id="cardNumber"
            label="Card Number"
            onChange={(e) =>
              setCreditCardInformation((prevState) => ({
                ...prevState,
                cardNumber: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="col-sm-6 col-md-4 d-flex align-items-center justify-content-center">
          <div className={clsx(styles.cardLogos, "mt-3")}>
            <img src={card_logos} height="50" />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 col-md-8">
          <label className="form-label">Expiration date</label>
          <div className="row">
            <div className="col-sm-6 col-md-6">
              <SelectFilter
                name="expMonth"
                placeholder="Month"
                list={months.map((month) => month.name)}
              />
            </div>
            <div className="col-sm-6 col-md-6">
              {" "}
              <SelectFilter
                name="expYear"
                placeholder="Year"
                list={currentYear}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-4">
          <label className="form-label">CVC</label>
          <Input
            name="cvc"
            onChange={(e) =>
              setCreditCardInformation((prevState) => ({
                ...prevState,
                cvc: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCardWidget;