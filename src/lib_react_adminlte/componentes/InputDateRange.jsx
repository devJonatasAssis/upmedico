import React from 'react';
import $ from 'jquery';
import Input from './Input.jsx';

/**
 * Componente padrão de escolher data dentro de um período especificado.
 */
export default class InputDateRange extends React.Component {

  static uniqueId = 0;

  constructor() {
    super();
    this.id = 'date-input-range-' + (InputDateRange.uniqueId++);
  }

  /**
   * @override
   */
  componentDidMount() {
    // Configura o datepicker:
    const options = {
      opens: 'right',
      locale: {
        format: 'DD/MM/YYYY',
        monthNames: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
      },
    };

    $('#' + this.id).daterangepicker(options, async (startDate, endDate) => {
      this.props.sendData({ startDate, endDate });
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.label && <label htmlFor={this.props.name}>{this.props.label}</label>}
        <div className="input-group">
          <Input {...this.props}
                 id={this.id}
                 style={this.props.style}
                 className={'pull-right ' + this.props.inputClassName} />
        </div>
      </div>
    );
  }

}
