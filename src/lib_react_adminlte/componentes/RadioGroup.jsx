import React from 'react';
import Input from './Input.jsx';

/**
 * Wrapper de radio group.
 */
export class RadioGroup extends React.Component {

  render() {
    return (
      <div className={'light-full-border ' + this.props.className}>
        <strong>{this.props.title}</strong>
        {this.props.children}
      </div>
    );
  }

}

/**
 * Botão do radio group.
 */
export class RadioButton extends React.Component {

  static inputId = 0;

  constructor() {
    super();
    this.id = 'radio-button-' + RadioButton.inputId++;
  }

  render() {
    return (
      <div className={' radio ' + this.props.divClassName} >
        <label htmlFor={this.id}>
          <Input type="radio"
                 id={this.id}
                 name={this.props.name}
                 checked={this.props.checked}
                 onChange={this.props.onChange}
                 className={this.props.className} />
          {this.props.text}
        </label>
      </div>
    );
  }

}
