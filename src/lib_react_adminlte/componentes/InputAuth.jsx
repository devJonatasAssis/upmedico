import React from 'react';

export default props => (
  <div style={{ display: props.hide ? 'none' : '' }}>
    <div className="form-group has-feedback">
      <input {...props.input}
             className='form-control'
             placeholder={props.placeholder}
             readOnly={props.readOnly}
             type={props.type} />
      <span className={`glyphicon glyphicon-${props.icon}
                        form-control-feedback`} />
    </div>
  </div>
);
