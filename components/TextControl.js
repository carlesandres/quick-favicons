import React from 'react';

const TextControl = (props) => {
  const { label, type='text' } = props;
  const name = label.replace(/ /g, '').toLowerCase();

  const onChange = (event) => {
    const { value, name } = event.currentTarget;
    props.onChange(name, value);
  }

  return (
    <div>
      <label htmlFor={name}>{label}</label>
        <input type={type}
          name={name}
          onChange={onChange}
          value={props.value}
        />
    </div>
  );
};

export default TextControl;
