import React from 'react';
import ContentWrapper from '../lib_react_adminlte/componentes/ContentWrapper.jsx';
import ModalMudarSenhaFunc from './ModalMudarSenhaFunc.jsx';
import Button from '../lib_react_adminlte/componentes/Button.jsx';

export default class UtilMudarSenha extends React.Component {
 
  mudarSenha(actionId) {
    console.log(this.ModalMudarSenhaFunc);
      this.ModalMudarSenhaFunc.show();
  }

  render() {
    return (
      <ContentWrapper title="Alterar Senha"
                      small="Altere a sua senha!">

                   
                  <Button className="mt-10 btn-default"
                          label="Mudar Senha"
                          id="mudar-senha"
                          onClick={this.mudarSenha()}
                          icon="fa-times" />


        {/* className: 'btn-primary',
        icone: 'fa-lock',
        label: 'Mudar senha',
        disabled: !this.state.itemSelecionado,
        tipo: Table.ACAO_CABECALHO, */}

        <ModalMudarSenhaFunc titulo="Pesquisa de registros"
                              ref={e => this.modalMudarSenha = e} 
                              codFuncionario={1} />
        
      </ContentWrapper> 
    );
  }

}
