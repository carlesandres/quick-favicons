import React, { useState } from 'react';
import TextControl from 'components/TextControl';
import Dropdown from 'components/Dropdown';
import IconsDropdown from 'components/IconsDropdown';

const ToolForm = (props) => {

  const iconsDr = <IconsDropdown
    value={props.icon}
    onChange={props.onChangeIcon}
    />;
  const letterControl =
      <TextControl
        label="Letter"
        value={props.letter || ''}
        onChange={props.onChangeLetter}
      />;

  const typeControl = props.type === 'letter' ? letterControl : iconsDr;


  return (
    <div className="section">
      <TextControl
        label="BG color"
        type="color"
        value={props.color}
        onChange={props.onChangeColor}
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

      <Dropdown
        label = 'Types'
        onChange={props.onChangeType}
        value={props.type}
        options={props.types} />

        {typeControl}
    </div>
  );
};

export default ToolForm;
