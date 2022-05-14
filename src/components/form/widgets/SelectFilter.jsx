import clsx from "clsx";

const SelectFilter = ({
  list,
  name,
  id,
  placeholder,
  disabled,
  onChange,
  value = null,
  label,
  size = "col-md-12",
}) => {
  return (
    <div className={clsx("mb-3 col-sm-12", size)}>
      {label && <label className="form-label">{label}</label>}
      <select
        className="form-select"
        id={id}
        name={name}
        required
        disabled={disabled}
        onChange={onChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {list.map((item, index) => (
          <option key={index} value={item} selected={value === item ? "selected" : null}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
