import React from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';

/**
 * Classe de input group básico padrão.
 * É um input acoplado de um botão no lado direito.
 */
export default class InputGroup extends React.Component {

  render() {
    return (
      <div className="input-group" >
        <Input value={this.props.value}
               onChange={this.props.onChange}
               placeholder={this.props.placeholder} 
               onKeyEnter={this.props.onKeyEnter}
               ref={this.props.inputRef} />
        <div className="input-group-btn">
          <Button icon={this.props.buttonIcon}
                  label={this.props.buttonLabel}
                  className={'btn-primary ' + this.props.buttonClassName} 
                  onClick={this.props.onClick} />
        </div> 
      </div>
    );
  }

}
