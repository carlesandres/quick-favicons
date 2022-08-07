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
    <div className="flex space-x-2">
      <label
        className=""
        htmlFor={name}>{`${label}:`}</label>
      <select
        defaultValue={value}
        onChange={onChange} 
        className="rounded-sm p-1">
        {renderOptions}
      </select>
    </div>
  );
};

export default Dropdown;
