import React from 'react';
import CurrencyInput from 'react-currency-input';

/**
 * Componente padrão de calc da Ápice.
 */
export default class InputCalc extends React.Component {

  /**
   * Chamado quando o input mudou.
   */
  onChange(valorTexto, valorFloat) {
    if (this.props.onChange) {
      let value = valorFloat;

      if (this.props.max && valorFloat > this.props.max) {
        value = (this.props.max);
      } else if (this.props.min && valorFloat < this.props.min) {
        value = (this.props.min);
      } 

      this.props.onChange(value);
    }
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <CurrencyInput value={this.props.value}
                       onChange={this.onChange.bind(this)}
                       onBlur={this.props.onBlur}
                       disabled={this.props.disabled}
                       precision={this.props.precision}
                       allowNegative={this.props.permitirNegativo}
                       decimalSeparator=","
                       thousandSeparator={this.props.percentage ? '' : '.'}
                       className="form-control mb-5" />
      </div>
    );
  }

}
