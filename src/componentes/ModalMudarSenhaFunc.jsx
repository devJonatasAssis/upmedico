import React from 'react';
import { toastr } from 'react-redux-toastr';
import Modal from '../lib_react_adminlte/componentes/Modal.jsx';
import GenericUtils from '../lib_react_frontend/utils/GenericUtils.jsx';
import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import ApiceComboEditPanel from '../lib_react_adminlte/componentes/ApiceComboEditPanel.jsx';
import CheckBox from '../lib_react_adminlte/componentes/Checkbox.jsx';
import Api from '../utils/Api.jsx';
import { getColunasFuncionario } from '../lib_react_adminlte/common/Template';

export default class ModalMudarSenhaFunc extends React.Component {

  state = {
    codFuncionario: 0,
    senha: '',
    mostrarSenha: false,
    comboEditFuncDesabilitado: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      codFuncionario: nextProps.codFuncionario,
      comboEditFuncDesabilitado: nextProps.codFuncionario,
    });
  }

  /**
   * Chamado quando o usuário clicar em confirmar.
   */
  async onConfirm() {
    GenericUtils.setElementoCarregando(this.divConteudo, true);    
    const ret = await Api.papito(`
      update:tab_funcionario (cod_funcionario = '${this.state.codFuncionario}') {
        senha -> md5('${this.state.senha}'),
      };
    `);
    GenericUtils.setElementoCarregando(this.divConteudo, false);
    if (!ret.status) {
      return toastr.error('Erro!', 'Não foi possível atualizar a senha!');
    }
    toastr.success('Tudo certo!', 'A senha do funcionário foi alterada!');
    this.modal.hide();
  }

  /**
   * Retorna os botões que ficarão no rodapé do modal:
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
        icon: 'fa-check',
        label: 'Confirmar',
        className: 'btn-success',
        onClick: this.onConfirm.bind(this),
        dismiss: true,
      },
    ];
  }

  /**
   * Abre esse modal.
   */
  show() {
    this.setState({ 
      senha: '',
      mostrarSenha: false,
    });
    this.modal.show();
    setTimeout(() => {
      // this.inputSenha.focus();
    }, 500);
  }

  render() {
    return (
      <Modal title="Mudar senha de funcionário"
             buttons={this.getButtons()}
             ref={e => this.modal = e}>             
        <div className="relative" ref={e => this.divConteudo = e}>
          <ApiceComboEditPanel label="Funcionário:"
                               tabela="tab_funcionario"
                               chave="cod_funcionario"
                               desc="nome_funcionario"
                               disabled={this.state.comboEditFuncDesabilitado}
                               colunas={getColunasFuncionario()}
                               ref={e => this.comboEditFunc = e}
                               value={this.state.codFuncionario}
                               onChange={e => this.setState({ codFuncionario: e.target.value })} 
                               api={Api} />
          <LabeledInput label="Informe a nova senha:" 
                        value={this.state.senha}
                        onChange2={senha => this.setState({ senha })} 
                        type={this.state.mostrarSenha ? '' : 'password'} 
                        ref={e => console.log(e)} />
          <CheckBox text="Mostrar senha" 
                    checked={this.state.mostrarSenha} 
                    onChange={e => this.setState({ mostrarSenha: e.target.checked })} />
        </div>
      </Modal>
    );
  }

}
