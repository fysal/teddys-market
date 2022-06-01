import { useState, useContext } from "react";
import Input from "./Input";
import SelectFilter from "./SelectFilter";
import { regex } from "../../../utils/regex.expression";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SpinLoader from "../../SpinLoader";
import errorHandler from "../../../utils/firebaseErrorHandler";
import {  loginWithEmailAndPassword, signupUserWithEmailAndPassword } from "../../../utils/userHandler";
import regionsList from "../../../utils/regionsList.json"
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../../../utils/UserContext";
import countries from "../../../utils/countries.json";
import clsx from "clsx";

const AuthForm = ({location}) => {
  console.log(location)
  const isLogginState  = location.state;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isLoggingIn, setIsLoggingIn] = useState(
    isLogginState === null ? true : isLogginState
  );
  const [loadingState, setLoadingState] = useState(false);
  const [formData, setFormData] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    phoneNumber: null,
    adminArea: null,
    locality: null,
    countryName: null,
    address: null,
  });

  const isBigScreen = useMediaQuery({ query : '(min-width: 800px)'})
  const [formError, setFormError] = useState("");
  const onChange = (e) => {
    setFormError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (formData.email === null || formData.email === "")
      return setFormError("Email is required");

    if (!formData.email.match(regex))
      return setFormError("Invalid email provided");
    if (formData.password === null || formData.password === "")
      return setFormError("Password is required");
    if (!isLoggingIn) {
      if (formData.password === null || formData.password === "")
        return setFormError("Password is required");

      if (formData.password.length < 8)
        return setFormError("Password should be 8 characters or more");
      if (formData.password !== formData.confirmPassword)
        return setFormError("Passwords do not match");
      if (formData.phoneNumber === null || formData.phoneNumber === "")
        return setFormError("Phone number is required");
      if (formData.address === null || formData.adress === "")
        return setFormError("Address can not be empty");
      if (formData.countryName === null || formData.countryName === "")
        return setFormError("Nationality field is required");
      if (formData.adminArea === null || formData.adminArea === "")
        return setFormError("Region is required");
    }
    setLoadingState(true);
    if (isLoggingIn) {
      let response = await loginWithEmailAndPassword(formData,currentUser, setCurrentUser);
      if(response.status === "success"){

      }else{
        let errorMessage = errorHandler(response.code);
        setFormError(errorMessage);
      }
    
    } else {

      let response = await signupUserWithEmailAndPassword(formData);

      if(response.status === "success"){

      }else{
        let errorMessage = errorHandler(response.errorCode);
        setFormError(errorMessage);
      }
      

    }
    setLoadingState(false);
  };
  return (
    <div
      className={clsx(
        "form_wrapper p-5 m-auto text-center",
        isBigScreen && "w-50"
      )}
    >
      {formError !== "" && (
        <div className="alert alert-danger alert-dismissible fade show">
          {formError}
          <button
            onClick={() => setFormError("")}
            type="button"
            className="btn-close small text-primary"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <h2 className="mb-4">{isLoggingIn ? "Sign In" : "Sign Up"}</h2>
        {loadingState && (
          <SpinLoader
            text={
              (isLoggingIn ? "Loading!" : "Creating account!") + " Please wait"
            }
            padding="py-2"
            margin="py-2"
          />
        )}

        <Input
          type="email"
          placeholder="Enter email"
          id="email"
          name="email"
          required
          onChange={onChange}
          disabled={loadingState}
        />
        <Input
          type="password"
          placeholder="Enter password"
          name="password"
          id="password"
          required
          onChange={onChange}
          disabled={loadingState}
        />
        {!isLoggingIn && (
          <>
            <Input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={onChange}
              required={true}
              disabled={loadingState}
            />
            <Input
              name="userName"
              placeholder="Enter full name"
              onChange={onChange}
              id="fullname"
              required={true}
              disabled={loadingState}
            />
            <div className="mb-3">
              {" "}
              <PhoneInput
                inputProps={{ required: true }}
                searchClass="form-control phone"
                country={"ug"}
                disabled={loadingState}
                required
                value={formData.phoneNumber}
                onChange={(phone) =>
                  setFormData({ ...formData, phoneNumber: phone })
                }
              />
            </div>
            <Input
              name="address"
              placeholder="Ex. Stretcher Rd, Ntinda, Kampala"
              onChange={onChange}
              id="fullname"
              required={true}
              disabled={loadingState}
            />
            <SelectFilter
              list={regionsList}
              name="adminArea"
              placeholder="Select region"
              id="adminarea"
              disabled={loadingState}
              onChange={onChange}
            />
            <SelectFilter
              list={countries.map((c) => c.name)}
              onChange={onChange}
              name="countryName"
              placeholder="Nationality"
              id="country"
              disabled={loadingState}
            />
            <Input
              placeholder="Enter location"
              onChange={onChange}
              name="locality"
              id="locality"
              disabled={loadingState}
            />
          </>
        )}
        <div className="d-grid gap-2">
          <button
            className="btn btn-md btn-primary mb-3 full"
            disabled={loadingState}
          >
            {isLoggingIn ? "Sign in" : "Sign up"}
          </button>
        </div>

        <div>
          {isLoggingIn ? (
            <span
              className="small text-muted pointer"
              onClick={() => setIsLoggingIn(false)}
            >
              Dont have an account ? Sign up
            </span>
          ) : (
            <span
              className="small text-muted pointer"
              onClick={() => setIsLoggingIn(true)}
            >
              Already have an account ? Sign In
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
