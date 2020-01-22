import React from 'react';
import $ from 'jquery';
import Input from './Input.jsx';

/**
 * Componente padrão de escolher data.
 */
export default class DateInput extends React.Component {

  static uniqueId = 0;

  constructor() {
    super();
    this.id = 'date-input-' + (DateInput.uniqueId++);
  }

  /**
   * @override
   */
  componentDidMount() {
    // Configura o datepicker:
    const options = {
      format: 'dd/mm/yyyy',
      todayHighlight: true,
      autoclose: true,
      forceParse: true,
      onSelect: this.triggerOnChange.bind(this),
    };
    $('#' + this.id).datepicker(options);
  }

  /**
   * Chamado quando o usuário sai do campo.
   */
  onBlur() {
    try {
      $.datepicker.parseDate('dd/mm/yy', this.props.value);
    } catch (e) {
      // Data inválida.
      this.triggerOnChange('');
    }
  }

  /**
   * Ativa o onchange do input.
   */
  triggerOnChange(value) {
    this.props.onChange({
      target: { value },
    });
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="input-group date">
          <div className="input-group-addon">
            <i className="fa fa-calendar" />
          </div>
          <Input {...this.props}
                id={this.id}
                className="pull-right"
                onBlur={this.onBlur.bind(this)} />
        </div>
      </div>
    );
  }

}
