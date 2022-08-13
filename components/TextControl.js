import React from 'react';

const TextControl = (props) => {
  const { label, type = 'text', value, onChange, ...other } = props;
  const name = label.replace(/ /g, '').toLowerCase();

  const change = (event) => {
    const { value, name } = event.currentTarget;
    onChange(value, name);
  };

  return (
    <div className="flex items-center space-x-2">
      <label className=""
        htmlFor={name}>{`${label}:`}</label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={change}
        value={value}
        className="p-1 rounded-sm"
        {...other}
      />
    </div>
  );
};

export default TextControl;
