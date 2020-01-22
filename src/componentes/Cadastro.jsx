import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Button from '../lib_react_adminlte/componentes/Button.jsx';
import InputGroup from '../lib_react_adminlte/componentes/InputGroup.jsx';
import { Table } from '../lib_react_adminlte/componentes/Table.jsx';
import Api from '../utils/Api.jsx';
import GenericUtils from '../lib_react_frontend/utils/GenericUtils';
import Tabs from '../lib_react_adminlte/template/tab/Tabs.jsx';
import TabHeader from '../lib_react_adminlte/template/tab/TabHeader.jsx';
import TabsHeader from '../lib_react_adminlte/template/tab/TabsHeader.jsx';
import TabsContent from '../lib_react_adminlte/template/tab/TabsContent.jsx';
import TabContent from '../lib_react_adminlte/template/tab/TabContent.jsx';
import ContentWrapper from '../lib_react_adminlte/componentes/ContentWrapper.jsx';
import { selectTab, showTabs } from '../lib_react_adminlte/template/tab/tabActions';

/**
 * Cadastro padrão do sistema, possui 4 abas:
 * - listar
 * - incluir
 * - alterar
 * - excluir
 */
class Cadastro extends React.Component {

  state = {
    filtro: '',
    filtroAplicado: false,

    qtderegistros: 10,
    range: {
      from: 0,
      to: 10,
    },
    registros: [],
  }

  componentDidMount() {
    this.carregarRegistros();
    this.resetarAbas();
  }

  /**
   * Chamado quando for realizado um click em um dos botões de ação da tabela.
   * @param {any} actionId o Id da coluna clicada
   * @param {object} item O Registro clicado
   */
  onTableActionClick(actionId, item) {
    if (actionId === 'excluir') {
      // Exclusão
      if (this.props.validar) {
        if (this.props.validar(item)) {
          this.props.setRegistro(item);
          this.props.dispatch(showTabs('tabDelete'));
          this.props.dispatch(selectTab('tabDelete'));
        }
      } else {        
        this.props.setRegistro(item);
        this.props.dispatch(showTabs('tabDelete'));
        this.props.dispatch(selectTab('tabDelete'));
      }
      return;
    } else if (actionId === 'editar') {
      // Edição
      this.props.setRegistro(item);
      this.props.dispatch(showTabs('tabUpdate'));
      this.props.dispatch(selectTab('tabUpdate'));
      return;
    }

    if (this.props.onTableActionClick) {
      this.props.onTableActionClick(actionId, item);
    }
  }

  getTableActions() {
    const arr =  [
      {
        className: 'btn-success',
        icone: 'fa-pencil',
        id: 'editar',
        tipo: Table.ACAO_TABELA,
      },
    ];
    if (!this.props.excluirDesabilitado) {
      arr.push({
        className: 'btn-danger',
        icone: 'fa-trash-o',
        id: 'excluir',
        tipo: Table.ACAO_TABELA,
      });
    }
    return arr.concat(this.props.tableActions || []);
  }

  /**
   * Reseta as abas ao estado original, ou seja, a listagem e o incluir.
   */
  resetarAbas() {
    this.props.limparRegistro();
    this.props.dispatch(showTabs(['tabList', 'tabCreate']));
    this.props.dispatch(selectTab('tabList'));
  }

  /**
   * Carrega os registros da tabela
   */
  async carregarRegistros() {
    GenericUtils.setElementoCarregando(this.table, true);

    let ret;

    if (this.props.getRegistros) {
      // Estão fazendo a pesquisa por fora
      ret = await this.props.getRegistros(this.state.filtro, this.state.range);
    } else {
      ret = await Api.buscar(this.props.tabela, this.state.filtro, '');
    }

    if (ret.status) {
      this.setState({ registros: ret.dados });
    } else {
      console.log('Cadastro.jsx - Erro', ret);
    }
    this.setState({ filtroAplicado: this.state.filtro });
    GenericUtils.setElementoCarregando(this.table, false);
  }

  /**
   * Salva o registro no banco de dados, caso ele já exista ele é atualizado.
   * Se ele não existir ele é cadastrado.
   */
  async salvar(callbackSalvar) {
    const ret = await Api.salvar(this.props.tabela, this.props.pk, this.props.getRegistro());
    if (!ret.status) {
	    console.log('Cadastro.jsx', ret);
      return toastr.error('Erro!', ret.erro.error_message || ret.erro.sqlMessage);
    }
    if (this.props.onSalvar) {
      await this.props.onSalvar();
    }
    console.log(ret);
    
    typeof callbackSalvar === 'function' && await callbackSalvar(ret.dados);
    this.resetarAbas();
    this.props.limparRegistro();
    this.carregarRegistros();
  }

  /**
   * Exclui o registro no banco de dados
   */
  async excluir() {
    const ret = await Api.excluir(this.props.tabela, this.props.pk, this.props.getRegistro());
    if (!ret.status) {
      return toastr.error('Erro!', ret.erro.error_message);
    }
    this.resetarAbas();
    this.carregarRegistros();
    this.props.limparRegistro();
  }

  onClickPaginacao(id) {
    let from = this.state.range.from;
    let to = this.state.range.to;
    if (id === 'ant') {
      from -= this.state.qtderegistros;
      to -= this.state.qtderegistros;
      if (from <= 0) {
        from = 0;
        to = this.state.qtderegistros;
      }
    } else {
      from += this.state.qtderegistros;
      to += this.state.qtderegistros;
    }
    this.setState({
      range: {
        from,
        to,
      },
    }, this.carregarRegistros.bind(this));
  }

  /**
   * Renderiza a página de listagem do cadastro.
   * Deve ser mandado o prop 'renderColunas' para esse componente.
   */
  renderList() {
    return (
      <div>
        <div className="d-flex flex-row">
          {/* Input de filtro: */}
          <div className="flex ml-5">
            <InputGroup value={this.state.filtro}
                        onChange={e => this.setState({ filtro: e.target.value })}
                        placeholder="Digite seu filtro"
                        buttonLabel="Filtrar!"
                        buttonClassName={'btn-success'}
                        onKeyEnter={this.carregarRegistros.bind(this)}
                        onClick={this.carregarRegistros.bind(this)} />
          </div>
        </div>

        <div className="relative" style={{ overflow: 'auto' }}>
          {/* Tabela de registros: */}
          <Table header="Registros"
                 data={this.state.registros || []}
                 ref={e => this.table = e}
                 tableColor={this.props.tableColor}

                 pagination
                 selectable={this.props.tableSelecionavel}
                 selectedItem={this.props.itemSelecionadoTable}
                 onSelectItem={this.props.onSelecionarItemTable}

                 onActionClick={this.onTableActionClick.bind(this)}
                 actions={this.getTableActions()}>
                 {this.props.renderColunas()}
          </Table>

          {this.props.paginavel && (           
            <div>
              <Button label="Pág. Anterior"
                      icon="fa-arrow-left"
                      className="btn-primary btn-flatx mr-10"
                      onClick={this.onClickPaginacao.bind(this, 'ant')}
                      disabled={this.state.range.from <= 0 || this.state.filtroAplicado} />
              <Button label="Próx. Página"
                      icon="fa-arrow-right"
                      className="btn-primary btn-flatx"
                      onClick={this.onClickPaginacao.bind(this, 'prox')}
                      disabled={this.state.registros
                                  ? this.state.registros.length < this.state.qtderegistros || this.state.filtroAplicado 
                                  : false} />
            </div>
          )}
        </div>
      </div>
    );
  }

  limparRegistros() {
    this.setState({ registros: [] });
  }

  /**
   * Renderiza o formulário de inclusão/alteração.
   */
  renderForm() {
    return (
      <div className="">
        <div className="m-10">
          {this.props.renderForm()}
        </div>
        <div className="m-10 pt-10 light-upper-border">
          <Button className="mt-5 btn-danger"
                  label="Cancelar"
                  onClick={() => {
                    this.resetarAbas();
                    this.carregarRegistros();
                  }}
                  icon="fa-times" />
          <Button className="mt-5 ml-5 btn-success"
                  label="Confirmar"
                  onClick={this.salvar.bind(this)}
                  icon="fa-check" />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="h-100">
        <ContentWrapper title={this.props.titulo}
                        small={this.props.subTitulo} >
          <Tabs>
            {/* Cabeçalhos das abas: */}
            <TabsHeader>
              <TabHeader label='Listar' icon='bars' target='tabList' onClick={this.carregarRegistros.bind(this)} />
              {!this.props.incluirDesabilitado && 
                <TabHeader label='Incluir' icon='plus' target='tabCreate' onClick={this.limparRegistros.bind(this)} />}
              <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
              <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
            </TabsHeader>

            {/* Conteúdo: */}
            <TabsContent>
              <TabContent id='tabList'>
                {/* Aba de lista */}
                {this.renderList()}
              </TabContent>

              <TabContent id='tabCreate'>
                {/* Aba de inclusão */}
                {this.renderForm()}
              </TabContent>

              <TabContent id='tabUpdate'>
                {/* Aba de alteração */}
                {this.renderForm()}
              </TabContent>

              <TabContent id='tabDelete'>
                {/* Aba de exclusão: */}
                <div className="col-sm-12">
                  {this.props.getMsgExcluir()}
                </div>

                <div className="m-10">
                  <Button className="mt-10 btn-default"
                          label="Cancelar"
                          onClick={this.resetarAbas.bind(this)}
                          icon="fa-times" />
                  <Button className="mt-10 ml-5 btn-danger"
                          label="Confirmar"
                          onClick={this.excluir.bind(this)}
                          icon="fa-trash" />
                </div>
              </TabContent>
            </TabsContent>

          </Tabs>
        </ContentWrapper>
      </div>
    );
  }

}

export default connect((state) => ({
  funcionario: state.funcionario,
}), (dispatch) => ({
  dispatch,
}), null, { withRef: true })(Cadastro);
