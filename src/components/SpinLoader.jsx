import React from 'react'

const SpinLoader = ({ text = "Loading. Please wait...", padding = "py-5", margin="my-s" }) => {
  return (
  <div className={`d-flex align-items-center justify-content-center flex-column ${padding} ${margin}`}>
      <div
        className="spinner-border spinner-border-md "
        style={{ color: "#8DCA57" }}
        role="status"
      ></div>
      <div className="small text-muted mt-3">{text}</div>
    </div>
  );
};

export default SpinLoader;