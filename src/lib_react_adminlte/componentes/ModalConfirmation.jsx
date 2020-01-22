import React from 'react';
import Modal from './Modal.jsx';

export default class ModalConfirmation extends React.Component {

  /**
   * Retorna os botões que ficarão
   * no rodapé do modal:
   */
  getButtons() {
    return [
      {
        icon: 'fa-times',
        label: 'Cancelar',
        className: 'btn-default',
        dismiss: true,
      },
      {
        icon: 'fa-trash',
        label: 'Confirmar',
        className: 'btn-danger',
        onClick: this.props.onConfirm,
        dismiss: true,
      },
    ];
  }

  render() {
    return (
      <Modal title="Atenção!"
             buttons={this.getButtons()}>
        {this.props.message}
      </Modal>
    );
  }

}
