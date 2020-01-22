import React from 'react';
import Button from './Button.jsx';

export default class Modal extends React.Component {

  // Id sequencial para não repetir o ID no dom node:
  static seqId = 0;

  constructor() {
    super();
    this.uniqueId = 'modal-' + Modal.seqId++;
  }

  /**
   * Mostra esse dialog na tela
   */
  show() {
    window.$('#' + this.uniqueId).modal('show');
  }

  /**
   * Esconde esse dialog da tela
   */
  hide() {
    window.$('#' + this.uniqueId).modal('hide');
  }

  render() {
    return (
      <div className="modal fade"
           id={this.uniqueId}
           tabIndex="-1"
           role="dialog"
           data-backdrop="static"
           data-keyboard="false">

        <div className="modal-dialog" role="document">
          <div className="modal-content">

            {/* Cabeçalho */}
            <div className="modal-header">
              <Button className="close"
                      data-dismiss="modal"
                      icon='fa-times' />
              <h4 className="modal-title" id="myModalLabel">
                {this.props.title || 'Sem título'}
              </h4>
            </div>

            {/* Corpo: */}
            <div className="modal-body">
              {this.props.children}
            </div>

            {/* Rodapé: */}
            <div className="modal-footer">
              {this.props.buttons.map(x => (
                <Button className={x.className}
                        key={x.label}
                        icon={x.icon}
                        onClick={() => {
                          if (x.onClick) x.onClick();
                          if (x.dismiss) this.hide();
                        }}
                        label={x.label} />
              ))}
            </div>

          </div>
        </div>

      </div>
    );
  }

}
