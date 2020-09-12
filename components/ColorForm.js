import React from 'react';
import TextControl from '../components/TextControl';

const ColorForm = (props) => {
  return (
    <div>
      <TextControl
        label="BG color"
        type="color"
        value={props.color}
        onChange={props.onChange}
      />

    </div>
  );
};

export default ColorForm;
