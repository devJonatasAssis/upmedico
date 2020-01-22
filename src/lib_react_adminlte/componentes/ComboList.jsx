import React from 'react';
import Combo from './Combo.jsx';

export default (props) => (
  <Combo label={props.label}
         onChange={props.onChange}
         value={props.value}>
    {props.lista.map((x, y) => (
      <option key={y} value={x[props.valor]}>{x[props.campo]}</option>
    ))}
  </Combo>
);

