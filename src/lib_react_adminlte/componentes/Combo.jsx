import React from 'react';

export default class Combo extends React.Component {

  static uniqueId = 0;

  constructor() {
    super();
    this.id = 'combo-' + Combo.uniqueId++;
  }

  onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    return (
      <div>
        <label htmlFor={this.id}>{this.props.label}</label>
        <select id={this.id} 
                className='form-control'
                onChange={this.onChange.bind(this)}
                value={this.props.value}>
          <option disabled defaultValue>Selecione uma Opção</option>
          {this.props.children}
        </select>
      </div>
    );
  } 
}
