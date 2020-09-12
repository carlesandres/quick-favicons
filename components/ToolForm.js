import React from 'react';
import ColorForm from '../components/ColorForm';


const ToolForm = (props) => {
  return (
    <div>
      <ColorForm
        color={props.color}
      onChange={props.onChangeColor}/>
    </div>
  );
};

export default ToolForm;
