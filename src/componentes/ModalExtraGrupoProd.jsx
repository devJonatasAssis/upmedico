import React from 'react';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';
import { Table, Column } from '../lib_react_adminlte/componentes/Table.jsx';
import Modal from '../lib_react_adminlte/componentes/Modal.jsx';
import Button from '../lib_react_adminlte/componentes/Button.jsx';
import Api from '../utils/Api.jsx';


export default class ModalExtraGrupProd extends React.Component {

  state = {
    extrasNaoVinc: [],
    extrasVinc: [],
    extraVinc: null,
    extraNaoVinc: null,
  }

  onClickMudarExtra(tipo) {
    if (tipo === 1 /* Vincular */) {
      const extra = _.remove(this.state.extrasNaoVinc, (x) =>
          x.cod_extra === this.state.extraNaoVinc.cod_extra);
      this.state.extrasVinc.push(extra[0]);
      this.setState({ extraNaoVinc: null, extrasVinc: [...this.state.extrasVinc] });
    } else {
      const extra = _.remove(this.state.extrasVinc, (x) =>
          x.cod_extra === this.state.extraVinc.cod_extra);
      this.state.extrasNaoVinc.push(extra[0]);
      this.setState({ extraVinc: null, extrasNaoVinc: [...this.state.extrasNaoVinc] });
    }
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
        onClick: this.confirmar.bind(this),
        dismiss: true,
      },
    ];
  }

  async confirmar() {
    const ret = await Api.setGrupoProdutoExtras(this.props.codGrupoProduto, this.state.extrasVinc);
    if (!ret) {
      return toastr.error('Atenção!', 'Não foi possível recuperar informações dos extras!');
    }
    this.hide();
  }

  async carregarExtras() {
    const ret = await Api.getGrupoProdutoExtras(this.props.codGrupoProduto);
    if (!ret) {
      return toastr.error('Atenção!', 'Não foi possível recuperar informações dos extras!');
    }
    this.setState({
      extrasVinc: ret.dados.extrasVinculados,
      extrasNaoVinc: ret.dados.extrasNaoVinculados,
    });
    return true;
  }

  async show() {
    if (await this.carregarExtras()) {
      this.modal.show();
    }
  }

  hide() {
    this.modal.hide();
  }

  renderSeparator() {
    return (
      <div className="light-side-border flex-wrap d-flex flex-col"
           style={{ marginRight: '10px',
           justifyContent: 'center',
                    marginLeft: '10px' }}>
        <div className="flex" style={{ verticalAlign: 'middle', justifyContent: 'center' }}>
          <Button icon="fa-arrow-right"
                  className="btn-primary btn-flat"
                  disabled={!this.state.extraNaoVinc}
                  onClick={this.onClickMudarExtra.bind(this, 1)} />
          <Button icon="fa-arrow-left"
                  className="btn-primary btn-flat"
                  disabled={!this.state.extraVinc}
                  onClick={this.onClickMudarExtra.bind(this, 2)} />
        </div>
      </div>
    );
  }

  renderTable(header, lista, nomeItem) {
    return (
      <Table hideActions header={header}
             data={lista}
             selectable
             onSelectItem={e => this.setState({ [nomeItem]: e })}
             selectedItem={this.state[nomeItem]}>
        <Column key={0} field="nome_extra" header="Extra" />
      </Table>
    );
  }

  render() {
    return (
      <Modal title="Extras"
             buttons={this.getButtons()}
             ref={e => this.modal = e}>
        <div className="d-flex flex-row">
          {this.renderTable('Não adicionados', this.state.extrasNaoVinc, 'extraNaoVinc')}
          {this.renderSeparator()}
          {this.renderTable('Adicionados', this.state.extrasVinc, 'extraVinc')}
        </div>
      </Modal>
    );
  }

}
