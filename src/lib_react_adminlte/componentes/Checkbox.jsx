import React from 'react';
import Input from './Input.jsx';

/**
 * Componente padrão de checkbox.
 */
export default class Checkbox extends React.Component {

  static inputId = 0;

  constructor() {
    super();
    this.id = 'checkbox-' + Checkbox.inputId++;
  }

  render() {
    return (
      <div className={'checkbox ' + this.props.className}>
        <label htmlFor={this.id} className={`${this.props.inline ? 'checkbox-inline' : ''}`}>
          <Input type="checkbox" 
                 id={this.id}
                 onChange={this.props.onChange} 
                 checked={this.props.checked}  />
          {this.props.text}
        </label>
      </div>
    );
  }
}
