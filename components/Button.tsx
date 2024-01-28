import React from 'react';

const Button = (props) => {
  return (
    <div onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Button;
