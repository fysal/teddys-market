import React from 'react'

const SpinLoader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column py-5 my-5">
      <div
        className="spinner-border spinner-border-md "
        style={{ color: "#8DCA57" }}
        role="status"
      ></div>
      <div className="small text-muted mt-3">Loading. Please wait...</div>
    </div>
  );
}

export default SpinLoader;