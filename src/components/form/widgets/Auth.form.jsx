import { useState, useContext } from "react";
import Input from "./Input";
import SelectFilter from "./SelectFilter";
import { regex } from "../../../utils/regex.expression";
import { auth } from "../../../utils/firebaseConfig";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SpinLoader from "../../SpinLoader";
import errorHandler from "../../../utils/firebaseErrorHandler";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { UserContext } from "../../../utils/UserContext";
import countries from "../../../utils/countries.json";

const AuthForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(currentUser);
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [loadingState, setLoadingState] = useState(false);
  const [formData, setFormData] = useState({
    email: null,
    password: null,
    confirmPassword: null,
    phoneNumber: null,
  });
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
    }
    setLoadingState(true);
    if (isLoggingIn) {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((user) => setCurrentUser(user))
        .catch((error) => {
          console.log(error.code);
          let errorMessage = errorHandler(error.code);
          setFormError(errorMessage);
        });
    } else {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
        .then((user) => console.log(user))
        .catch((error) => {
          console.log(error);
          let errorMessage = errorHandler(error.code);
          setFormError(errorMessage);
        });
    }
    setLoadingState(false);
  };
  return (
    <div className="form_wrapper p-5 m-auto w-50 text-center">
      {formError !== "" && (
        <div className="alert alert-danger alert-dismissible fade show">
          {formError}
          <button
          onClick={()=>setFormError("")}
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
          onChange={onChange}
          disabled={loadingState}
        />
        <Input
          type="password"
          placeholder="Enter password"
          name="password"
          id="password"
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
              list={[
                "Central Region",
                "Western Region",
                "Eastern Region",
                "Norther Region",
              ]}
              name="adminArea"
              placeholder="Select region"
              id="adminarea"
              disabled={loadingState}
            />
            <SelectFilter
              list={countries.map((c) => c.name)}
              name="countryName"
              placeholder="Nationality"
              id="country"
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
