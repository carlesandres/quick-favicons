const Dropdown = (props) => {
  const { label, value, onChange } = props;
  const name = label.replace(/ /g, '').toLowerCase();
  const renderOptions = props.options.map(op => {
    return (
      <option key={op}
        value={op}>{op}</option>
    );
  });

  return (
    <div className="control mr-4">
      <label
        className="font-bold mr-2"
        htmlFor={name}>{`${label}:`}</label>
      <select
        defaultValue={value}
        onChange={onChange} >
        {renderOptions}
      </select>
    </div>
  );
};

export default Dropdown;
