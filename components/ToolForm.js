import React from 'react';
import TextControl from 'components/TextControl';

const ToolForm = (props) => {
  return (
    <div className="section">
      <TextControl
        label="BG color"
        type="color"
        value={props.color}
        onChange={props.onChangeColor}
      />
      <TextControl
        label="Letter"
        value={props.letter || ''}
        onChange={props.onChangeLetter}
      />
      <TextControl
        label="Border-radius (1-500)"
        type="number"
        min="0"
        max="500"
        step="5"
        value={props.radius || 0}
        onChange={props.onChangeRadius}
      />
    </div>
  );
};

export default ToolForm;
