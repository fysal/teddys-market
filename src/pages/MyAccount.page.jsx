import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import Input from "../components/form/widgets/Input";
import countries from "../utils/countries.json";
import PhoneInput from "react-phone-input-2";
import SelectFilter from "../components/form/widgets/SelectFilter";
import { updateUserData, updateUserPicture } from "../utils/userHandler";
import regionsList from "../utils/regionsList.json";
import firebaseErrorHandler from "../utils/firebaseErrorHandler";
import MessageAlert from "../components/alerts/MessageAlert";
import ErrorAlert from "../components/alerts/ErrorAlert";
import SpinLoader from "../components/SpinLoader";
import ReactLoading from "react-loading";

const MyAccount = () => {
  const { currentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(currentUser);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState({ status: false, progress: 0 });
  const [error, setError] = useState(null);
  // console.log(JSON.stringify(currentUser));
  useEffect(() => {
    setUserData(currentUser);
  }, [currentUser]);

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updateUserData(currentUser.userId, userData);
    console.log(response);
    if (response.status === "successful") {
      setMessage("Account updated successfully");
    } else {
      const erroMessage = firebaseErrorHandler(response.code);
      setError(erroMessage);
    }
    setLoading(false);
    return;
  };
  const onUploadChange = async (e) => {
    const image = e.target.files[0];
    if (image) {
      let response = await updateUserPicture(
        userData.userId,
        image,
        setUploading
      );

      if (response.status === "failed") {
        let errorMessage = firebaseErrorHandler(response.code);
        return setError(errorMessage);
      }else{
        return setMessage("Picture uploaded successfully")
      }
    }
  };

  return (
    <div className="container py-4">
      {uploading.status && (
        <div className="progress w-75 m-auto">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: uploading.progress + "%" }}
            aria-valuenow="100"
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {uploading.progress} %
          </div>
        </div>
      )}

      {message && (
        <div className="w-75 m-auto">
          <MessageAlert message={message} setMessage={setMessage} />
        </div>
      )}
      {error && (
        <div className="w-75 m-auto">
          <ErrorAlert errorMessage={error} setError={setError} />
        </div>
      )}

      {userData ? (
        <div className="border rounded w-75 m-auto mt-4">
          <h6 className="border-bottom px-4 py-2 mb-3">Edit my account</h6>
          <div className="px-4">
            <div className="d-flex align-items-center">
              <img
                className="rounded-circle me-3"
                width="80"
                height="80"
                src={
                  userData?.imageUrl === "default"
                    ? "https://bit.ly/38qcnCL"
                    : userData?.imageUrl
                }
              />
              <label className="btn btn-secondary btn-sm me-2" htmlFor="avatar">
                <span className="small">Upload</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="hide-input"
                id="avatar"
                disabled={uploading.status}
                onChange={(e) => onUploadChange(e)}
              />
              <label className="btn btn-outline-secondary btn-sm me-5">
                <span className="small">Remove</span>
              </label>
              {uploading.status ||
                (loading && (
                  <ReactLoading
                    type="bars"
                    width={30}
                    height={30}
                    color="#25441B82"
                  />
                ))}
            </div>
            <div className="border-top mt-3 pt-3 row">
              <Input
                label="Display name"
                name="displayName"
                id="displayName"
                placeholder="Enter full name"
                onChange={onChange}
                value={userData?.displayName || ""}
                size="col-md-6"
                required
                disabled={loading}
              />
              <div className="col-sm-12 col-md-6">
                <label className="form-label">Phone</label>
                <PhoneInput
                  country={"ug"}
                  onlyCountries={["ug"]}
                  value={userData?.phoneNumber}
                  disabled={loading}
                  onChange={(phone) => {
                    setUserData({ ...userData, phoneNumber: phone });
                  }}
                />
              </div>{" "}
              <SelectFilter
                name="countryName"
                id="country"
                label="Country Name"
                value={userData?.countryName}
                list={countries.map((country) => country.name)}
                placeholder={userData?.countryName}
                size="col-md-6"
                onChange={onChange}
                required
                disabled={loading}
              />
              <SelectFilter
                name="adminArea"
                id="adminArea"
                label="Region"
                list={regionsList}
                size="col-md-6"
                value={userData?.adminArea}
                onChange={onChange}
                required
                disabled={loading}
              />
              <Input
                id="address"
                name="address"
                onChange={onChange}
                required
                value={userData?.address || ""}
                placeholder="Ex. Ntinda, Stratcher road"
                size="col-md-6"
                label="Address"
                disabled={loading}
              />
              <Input
                id="locality"
                name="locality"
                onChange={onChange}
                required
                value={userData?.locality || ""}
                placeholder="Enter your locality"
                size="col-md-6"
                label="Locality"
                disabled={loading}
              />
            </div>
            <div className="d-flex align-items-center justify-content-end mb-4">
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary btn-sm ms-3"
                disabled={loading}
                onClick={(e) => onSubmit(e)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SpinLoader />
      )}
    </div>
  );
};

export default MyAccount;
