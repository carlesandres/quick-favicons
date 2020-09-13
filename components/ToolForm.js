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
    </div>
  );
};

export default ToolForm;
