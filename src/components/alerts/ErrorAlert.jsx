import React, { useEffect } from "react";

const ErrorAlert = ({ errorMessage, setError }) => {
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [errorMessage]);

  return (
    <div
      className="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      {errorMessage}
      <button
        onClick={()=>setError(null)}
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default ErrorAlert;
