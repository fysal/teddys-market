import React from "react";

const Input = ({ type = "text", placeholder, label, id, onChange, name, required=false, disabled }) => {
  return (
    <div className="form-group mb-3">
      {label && <label className="form-label" htmlFor={id}>{label}</label>}
      <input
        className="form-control"
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
