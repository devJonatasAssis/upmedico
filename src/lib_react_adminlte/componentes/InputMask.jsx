import React from 'react';
import InputMask from 'react-input-mask';

/**
 * @param TipoDaMascara cpf / cnpj / data / telefone / cep
 * @param {String} separadorMascara Informar o tipo do separador de Mascara / Default: "_"
 * @param {String} label Atribui uma Label para o campo InputMask
 */
export default class InputMascara extends React.Component {

  getMascara() {
    if (this.props.cpf) {
      return '999.999.999-99';
    }

    if (this.props.cnpj) {
      return '99.999.999/9999-99';
    }

    if (this.props.data) {
      return '99/99/9999';
    }
    
    if (this.props.dataHora) {
      return '99/99/9999 99:99';
    }

    if (this.props.telefone) {
      return '(99)99999-9999';
    }
    if (this.props.cep) {
      return '99999-999';
    }
  }

  getPlaceholder() {
    if (this.props.cpf) {
      return 'Ex: 000.000.000-00';
    }

    if (this.props.cnpj) {
      return 'Ex: 00.000.000/0000-00';
    }

    if (this.props.data) {
      return 'Ex: 00/00/0000';
    }

    if (this.props.dataHora) {
      return 'Ex: 00/00/0000 00:00';
    }

    if (this.props.telefone) {
      return 'Ex: (00)00000-0000';
    }

    if (this.props.cep) {
      return 'Ex: 00000-000';
    }
  }

  getIconMask() {
    if (this.props.telefone) {
      return (
        <div className="input-group-addon"> <i className="fa fa-phone" /> </div>
      );
    }

    if (this.props.data || this.props.dataHora) {
      return (
        <div className="input-group-addon"> <i className="fa fa-calendar" /> </div>
      );
    }
  }

  getGrupoClass() {
    if (this.props.data  || this.props.dataHora || this.props.telefone) {
      return "input-group";
    }
  }

  render() {
    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className={this.getGrupoClass()}>
          {this.getIconMask()}
          <InputMask {...this.rest}
            style={this.props.style}
            className={'form-control ' + this.className}
            ref={e => this.inputMask = e}
            mask={this.getMascara()}
            disabled={this.props.disabled}
            placeholder={this.getPlaceholder()}
            maskChar={this.props.separadorMascara}
            value={this.props.value}
            onChange={this.props.onChange} />
        </div>
      </div>
    );
  }
}