import React from 'react';

const TextControl = (props) => {
  const { label, type = 'text', value, onChange, ...other } = props;
  const name = label.replace(/ /g, '').toLowerCase();

  const change = (event) => {
    const { value, name } = event.currentTarget;
    onChange(value, name);
  };

  return (
    <div className="mr-8">
      <label className="mr-2 font-bold"
        htmlFor={name}>{`${label}:`}</label>
      <input
        type={type}
        name={name}
        onChange={change}
        value={value}
        {...other}
      />
    </div>
  );
};

export default TextControl;
