import clsx from "clsx";
import React from "react";

const Input = ({ type = "text", placeholder, label, id, onChange, name, size,required=false, disabled, value }) => {
  return (
    <div className={clsx("col-sm-12",size)}>
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
        value={value}
      />
    </div></div>
  );
};

export default Input;
