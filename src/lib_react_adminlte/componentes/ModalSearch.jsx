import React from 'react';
import Modal from './Modal.jsx';
import InputGroup from './InputGroup.jsx';
import { Table } from './Table.jsx';
import GenericUtils from '../../lib_react_frontend/utils/GenericUtils';

export default class ModalSearch extends React.Component {

  state = {
    pesquisa: '',
    itemSelecionado: null,
    registros: [],
  }

  /**
   * Chamado quando o usuário clicar em confirmar.
   */
  onConfirm() {
    this.setState({ pesquisa: '' });
    if (this.props.onConfirm) {
      this.props.onConfirm(this.state.itemSelecionado);
    }
    this.hide();
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
        onClick: () => this.hide(),
      },
      {
        icon: 'fa-check',
        label: 'Confirmar',
        className: 'btn-success',
        onClick: this.onConfirm.bind(this),
      },
    ];
  }

  /**
   * Retorna o objeto de Api para uso no backend.
   */
  getApi() {
    if (this.props.api) {
      return this.props.api;
    }
    throw new Error('API não especificada para o componente ModalSearch!');
  }

  hide() {
    this.modal.hide();
    this.setState({ registros: [] });
  }

  /**
   * Executa a pesquisa, filtrando os registros de acordo.
   */
  async carregarRegistros(callback) {
    GenericUtils.setElementoCarregando(this.divTable, true);
    const Api = this.getApi();

    const where = this.props.getWhere ? this.props.getWhere(this.state.pesquisa) : '';
    const ret = await Api.buscar(this.props.tabela, this.state.pesquisa, where);
    if (!ret.status) {
      // TO-DO error
      GenericUtils.setElementoCarregando(this.divTable, false);
      return;
    }
    this.setState({ registros: ret.dados }, () => {
      GenericUtils.setElementoCarregando(this.divTable, false);
      if (typeof callback === 'function') {
        callback();
      }
    });
  }

  /**
   * Seleciona um registro através do campo.
   */
  selecionarRegistroByCampo(campo, valor) {
    for (const reg of this.state.registros) {
      if (reg[campo] === valor) {
        this.setState({ itemSelecionado: reg });
        return;
      }
    }

    this.setState({ itemSelecionado: null });
  }

  /**
   * Abre esse modal.
   * @param {function} callback Callback ativado depois que carregou os registros.
   */
  show(callback) {
    this.modal.show();
    this.carregarRegistros(callback);
    setTimeout(() => {
      this.input.focus();
    }, 500);
  }

  render() {
    return (
      <Modal title={this.props.titulo}
             buttons={this.getButtons()}
             ref={e => this.modal = e}>

        <InputGroup placeholder="Digite seu filtro"
                    buttonIcon="fa-check"
                    buttonLabel="Pesquisar"
                    onClick={this.carregarRegistros.bind(this)}
                    onKeyEnter={this.carregarRegistros.bind(this)}
                    value={this.state.pesquisa}
                    inputRef={e => this.input = e}
                    onChange={e => this.setState({ pesquisa: e.target.value })} />

        <div className="relative"
             ref={e => this.divTable = e}>
          <Table hideActions
                 selectable
                 data={this.state.registros}
                 selectedItem={this.state.itemSelecionado}
                 onSelectItem={e => this.setState({ itemSelecionado: e })}
                 onDoubleClick={() => {
                   this.onConfirm();
                   this.modal.hide();
                 }}>
            {this.props.renderColunas()}
          </Table>
        </div>

      </Modal>
    );
  }

}
