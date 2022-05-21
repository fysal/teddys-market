import { useEffect, useMemo } from "react";
import { parsePhoneNumber } from "awesome-phonenumber";
import PhoneInput from "react-phone-input-2";
import clsx from "clsx";
import styles from "../../pages/styles/styles.module.css";

export const MobileMoneyWidget = ({
  phoneNumber,
  setPhoneNumber,
  useDefaultNumber,
  setUseDefaultNumber,
  defaultPhoneNumber,
}) => {
  const phone = parsePhoneNumber(phoneNumber.toString(), "UG");

  useEffect(() => {
    if (useDefaultNumber && phoneNumber !== defaultPhoneNumber) {
      setPhoneNumber(defaultPhoneNumber);
    } 
  }, [useDefaultNumber]);

  return (
    <>
      <h6 className="border-bottom pb-3">Mobile money information</h6>
      <div className="form-check form-switch mt-4">
        <input
          type="checkbox"
          checked={useDefaultNumber}
          className="form-check-input"
          id="default_number"
          onChange={() => setUseDefaultNumber((prevState) => !prevState)}
        />
        <label className="form-label small text-muted" htmlFor="default_number">
          <span>Use default number</span>
        </label>
      </div>
      {useDefaultNumber ? (
        <div className={clsx(styles.phone_number_wrapper, "p-4 small text-muted")}>
          <span>
            +({phone.getCountryCode()}) {phone.getNumber("significant")}
          </span>
        </div>
      ) : (
        <div className="mt-3">
          <h6 className="small text-capitalize">Enter phone number</h6>
          <PhoneInput
            country={"ug"}
            onlyCountries={["ug"]}
            onChange={(phone) => {
              setPhoneNumber(phone);
            }}
          />
        </div>
      )}
    </>
  );
};
