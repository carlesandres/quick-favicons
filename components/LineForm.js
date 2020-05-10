import React from 'react';
import TextControl from '../components/TextControl';

const LineForm = (props) => {
  const onChange = (name, value) => {
    console.log('name', name);
    console.log(value);
  };


  return (
    <div>
      <TextControl
        label="start X"
        onChange={onChange}
      />

    </div>
  );
};

export default LineForm;
