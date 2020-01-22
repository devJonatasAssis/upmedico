import React from 'react';

export default (props) => (
  <div>
    <label>{props.label}</label>
    <textarea {...props}
              className={'form-control ' + props.classname} />
  </div>
);