const Dropdown = (props) => {
  const { label, value, onChange, ...other } = props;
  const name = label.replace(/ /g, '').toLowerCase();
  const renderOptions = props.options.map( op =>  {
    return (
      <option key={op}
        value={op}>{op}</option>
    );
  });

  return (
    <div className="control">
      <label htmlFor={name}>{`${label}:`}</label>
      <select
        defaultValue={value}
        onChange={onChange} >
        {renderOptions}
      </select>
    </div>
  );
};

export default Dropdown;
