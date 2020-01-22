import React from 'react';
import ReactDOM from 'react-dom';
import InputMask from 'react-input-mask';

/**
 * Componente padrão de escolher data.
 */
export default class InputTime extends React.Component {

  static uniqueId = 0;

  constructor() {
    super();
    this.id = 'time-input-' + (InputTime.uniqueId++);
  }

  /**
   * @override
   */
  componentDidMount() {
    // Configura o datepicker:
    const options = {
      defaultTime: 'current',
      showMeridian: false,
      explicitMode: true,
    };

    const jqueryObject = window.$(`#${this.id}`);
    jqueryObject.timepicker(options)
                  .on('changeTime.timepicker', this.onTimepickerChange.bind(this));

    jqueryObject.on('keydown', (e) => {
      if (e.keyCode == 9) {
        jqueryObject.timepicker('hideWidget');
      }
    });
  }

  /**
   * Ativado quando o horário for mudado pelo timepicker.
   */
  onTimepickerChange(e) {
    const jqueryObject = window.$(`#${this.id}`);

    if (jqueryObject.is(':focus')) {
      // Se estamos focados então sai pra não entrar em loop
      return;
    }

    if (this.props.onChange) {
      this.props.onChange({
        target: { value: e.time.value },
      });
    }
  }

  /**
   * Chamado quando o input é focado pelo usuário, vamos selecionar
   * todo o seu conteúdo.
   */
  onFocus() {
    // eslint-disable-next-line
    ReactDOM.findDOMNode(this.input).setSelectionRange(0, this.input.value.length);
  }

  /**
   * Ativado quando o texto do input for mudado pelo usuario.
   */
  onChange(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    window.$('#' + this.id).timepicker('setTime', e.target.value);
  }

  render() {
    return (
      <div className={this.props.className}>

        <label htmlFor={this.props.name}>{this.props.label}</label>
        
        <div className="input-group bootstrap-timepicker timepicker">
          <div className="input-group-addon">
            <i className="fa fa-clock-o" />
          </div>
          <InputMask {...this.props} 
                     mask="99:99" 
                     maskChar=""
                     onFocus={this.onFocus.bind(this)}
                     onChange={this.onChange.bind(this)}
                     className=" form-control pull-right mb-5 "
                     alwaysShowMask
                     inputRef={e => this.input = e}
                     id={this.id} />
        </div>
      </div>
    );
  }

}
