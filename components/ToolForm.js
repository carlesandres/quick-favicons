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
    <div className="section text-lg bg-blue-300 p-2">
      <div className="flex mb-2">
        <TextControl
          label="BG color"
          type="color"
          value={props.color}
          onChange={props.onChangeColor}
        />
        <TextControl
          label="FG color"
          type="color"
          value={props.fgcolor}
          onChange={props.onChangeFGColor}
        />
      </div>
      <TextControl
        label="Border-radius (1-500)"
        type="number"
        min="0"
        max="500"
        step="5"
        value={props.radius || 0}
        onChange={props.onChangeRadius}
      />
      <div className="flex">
        <Dropdown
          label = 'Motif'
          onChange={props.onChangeType}
          value={props.type}
          options={props.types} />

        {typeControl}
      </div>
    </div>
  );
};

export default ToolForm;
