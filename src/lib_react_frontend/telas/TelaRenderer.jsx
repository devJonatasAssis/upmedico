import React from 'react';
import {Growl} from 'primereact/components/growl/Growl';
import Dialog from '../../lib_react_prime/componentes/Dialog.jsx';

import shortid from 'shortid';
import _ from 'lodash';

/**
 * Responsável pela renderização de tudo que deve ficar absolutamente
 * no topo da aplicação, seja dialogs ou growls.
 */
export default (class TelaRenderer extends React.Component {

  constructor() {
    super();
    this.state = {
      ...this.state,
      dialogs: [],
    };

    global.addDialog = this.addDialog.bind(this);
    global.removeDialog = this.removeDialog.bind(this);
    global.dismissAllDialogs = this.dismissAllDialogs.bind(this);
  }

  /**
   * Adiciona um novo dialog para ser renderizado pelo sistema,
   * @param {Class} type A Classe do dialog a ser criado
   * @param {object} props os props que o dialog receberá.
   */
  addDialog(type, props) {
    const el = React.createElement(type, {
      key: shortid.generate(),
      ...props,
    });
    this.setState({ dialogs: [...this.state.dialogs, el], });
  }

  /**
   * Remove todos os dialogs do sistema
   */
  dismissAllDialogs() {
    _.map(this.state.dialogs, (x) => {
      if (x.props.onDismiss) {
        x.props.onDismiss();
      }
    });
    this.setState({ dialogs: [], });
  }

  /**
   * Remove um dialog em específico do sistema, o id é o id passado para o props
   * do dialog.
   * @param {*} id O Id passado no props.id do dialog.
   */
  removeDialog(id) {
    const dialog = _.find(this.state.dialogs, (x) => {
      return x.props.id === id;
    });
    if (dialog && dialog.props.onDismiss) {
      dialog.props.onDismiss();
    }
    this.setState({ 
      dialogs: _.filter(this.state.dialogs, (x) => {
        return x.props.id !== id;
      })
    });
  }
  
  render() {
    return (
      <div>
        {this.state.dialogs}
        <div style={{position: 'absolute', zIndex: '99999999999'}}>
          <Growl ref={e => global.growl = e} sticky={true} />   
        </div>
      </div>
    );
  }

});