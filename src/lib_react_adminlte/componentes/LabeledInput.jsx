import React from 'react';
import Input from './Input.jsx';

export default props => (
  <div>
    <label htmlFor={props.name}>{props.label}</label>
    <Input value={props.value}
           onChange={props.onChange}
           onChange2={props.onChange2}
           placeholder={props.placeholder}
           readOnly={props.readOnly}
           disabled={props.disabled}
           type={props.type}
           min={props.min}
           ref={props.inputRef}
           max={props.max}
           onKeyEnter={props.onKeyEnter}
           className={props.className}
           ref={props.ref}
           uppercase={props.uppercase} />
  </div>
);
