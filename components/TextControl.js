import React from 'react';

const TextControl = (props) => {
  const { label, type='text' } = props;
  const name = label.replace(/ /g, '').toLowerCase();

  const onChange = (event) => {
    const { value, name } = event.currentTarget;
    props.onChange(value, name);
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
      `}</style>
        <div className="control">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={props.value}
        />
        </div>
    </div>
  );
};

export default TextControl;
