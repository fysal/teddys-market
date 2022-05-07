const SelectFilter = ({ list, name, id, placeholder, disabled, onChange}) => {
  return (
    <div className="mb-3">
      <select className="form-select" id={id} name={name} required disabled={disabled} onChange={onChange}>
          {placeholder && <option value="">{placeholder}</option>}
        {list.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
