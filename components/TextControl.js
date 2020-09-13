import React from 'react';

const TextControl = (props) => {
  const { label, type='text', value, onChange, ...other } = props;
  const name = label.replace(/ /g, '').toLowerCase();

  const change = (event) => {
    const { value, name } = event.currentTarget;
    onChange(value, name);
  }

  return (
    <div>
      <style jsx>{`
        label {
        margin-right: 10px;
        }

        .control {
          padding-bottom: 20px;
        }

        input {
          font-family: inherit;
          font-size: inherit;
        }
      `}</style>
        <div className="control">
          <label htmlFor={name}>{`${label}:`}</label>
        <input
          type={type}
          name={name}
          onChange={change}
          value={value}
          {...other}
        />
        </div>
    </div>
  );
};

export default TextControl;
