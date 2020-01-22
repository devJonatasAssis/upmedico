import React from 'react';

export default class Input extends React.Component {

  componentDidMount() {
    window.$(this.input).keyup((event) => {
      if (event.keyCode === 13 && this.onKeyEnter) {
        this.onKeyEnter();
      }
    });
  }

  /**
   * Chamado quando o componente de input perder o foco.
   */
  onBlur() {
    if (this.props.type === 'number') {
      // Se for número, vamos tratar o minimo e o máximo.
      const num = Number(this.props.value);
      if (this.props.min && num < Number(this.props.min)) {
        this.triggerChange(this.props.min);
      }
      else if (this.props.max && num > Number(this.props.max)) {
        this.triggerChange(this.props.max);
      }
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  /**
   * Evento chamado quando o componente de input é mudado.
   */
  onChange(e) {
    if (this.props.uppercase === undefined || this.props.uppercase === true) {
      e.target.value = !global.inputLowercase ? e.target.value.toUpperCase() : e.target.value;
    }
    if (this.props.onChange) {
      this.props.onChange(e);
    }
    if (this.props.onChange2) {
      this.props.onChange2(e.target.value);
    }
  }

  /**
   * Retorna o classname.
   */
  getClassName() {
    let classNames = '';
    const isFormControl = (
      !this.props.type ||
      this.props.type === 'input' ||
      this.props.type === 'password' ||
      this.props.type === 'number'
    );
    if (isFormControl) {
      classNames += ' form-control ';
    }
    if (this.props.uppercase === undefined || this.props.uppercase === true) {
      classNames += !global.inputLowercase ? ' text-uppercase ' : ' ';
    }
    classNames += this.props.className;
    return classNames;
  }

  /**
   * Ativa o onChange de quem está ouvindo.
   */
  triggerChange(value) {
    if (this.props.onChange) {
      this.props.onChange({ target: { value } });
    }
  }

  /**
   * Foca esse input.
   */
  focus() {
    this.input.focus();
    this.input.setSelectionRange(0, this.input.value.length);
  }

  render() {
    const { onKeyEnter, uppercase, onChange2, ...rest } = this.props;
    this.onKeyEnter = onKeyEnter;
    return (
      <input {...rest}
             style={this.props.style}
             ref={e => this.input = e}
             onChange={this.onChange.bind(this)}
             onBlur={this.onBlur.bind(this)}
             className={this.getClassName()} />
    );
  }
}