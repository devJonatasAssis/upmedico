import React from 'react';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';

import Api from '../utils/Api';
import { inverteData } from '../utils/funcoesGenericas';

import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import InputMask from '../lib_react_adminlte/componentes/InputMask.jsx';
import ApiceComboEditPanel from '../lib_react_adminlte/componentes/ApiceComboEditPanel.jsx';
import InputCalc from '../lib_react_adminlte/componentes/InputCalc.jsx';
import Button from '../lib_react_adminlte/componentes/Button.jsx';
import { getColunasCompraProduto,
         getColunasCompraFornecedor } from '../lib_react_adminlte/common/Template';
import { Column, Table } from '../lib_react_adminlte/componentes/Table';
import Cadastro from './Cadastro';

/**
 */
export default class MovimentoCompra extends React.Component {

  state = {
    itens: [],
    registros: [],
    cod_fornecedor: 0,
    unidade_medida: '',
    vr_item: '',
    qtde_item: '',
    vr_total_item: '',
    vr_desconto: '',
    vr_acrescimo: '',
    status_fechado: 'N',
    registro: this.getRegistroLimpo(),
    itemEditando: null,
  };

  /**
   * Chamado quando algum campo mudar seu valor no formulário.
   * @param {string} prop O Campo que mudou o valor
   * @param {any} value O Valor que será colocado no campo.
   */
  onChange(prop, value) {
    this.setState({
      registro: {
        ...this.state.registro,
        [prop]: value.target ? value.target.value : value,
      },
    }, () => {
      if (['vr_desconto', 'vr_acrescimo'].indexOf(prop) >= 0) {
        this.calculaValorTotal();
      }
    });
  }

  /**
   * Chamado quando for realizado um click em um dos botões de ação da tabela de ITENS.
   * @param {any} actionId o Id da coluna clicada
   * @param {object} item O Registro clicado
   */
  onTableActionClick(actionId, item) {
    if (actionId === 'excluir') {
      const indice = this.state.itens.findIndex(e => e === item);
      this.state.itens.splice(indice, 1);
      this.setState({ itens: this.state.itens });
    } else if (actionId === 'editar') {
      this.setState({ 
        cod_produto: item.cod_produto,
        vr_item: item.vr_item,
        qtde_item: item.qtde_item,
        vr_total_item: item.vr_total_item,
        unidade_medida: item.unidade_medida,
        itemEditando: item,
      });
    } else if (actionId === 'abrir') { // Método para o botão Abrir  da compra
      const compra = item;      
      Api.abrirFecharCompra(compra.cod_compra, 'N');
      this.cadastro.getWrappedInstance().carregarRegistros();
    }
  }

  /**
   * Retorna a mensagem de confirmação ao excluir
   */
  getMsgExcluir() {
    return `Tem certeza que deseja excluir a Compra: "
            ${this.state.registro.cod_compra}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_compra: null,
      cod_fornecedor: 0,
      dt_cadastro: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      dt_fechamento: null,
      vr_total: 0,
      vr_desconto: 0,
      vr_acrescimo:0,
      obs_compra: '',
      status_fechado: 'N',
    };
  }

  /**
   * Retorna a lista de registros para o cadastro.
   * @param {string} f O Filtro superior da tela.
   */
  async getRegistros(f, range) {
    const filtro = {
      de: range.from,
      ate: range.to,
      filtroStr: f,
    };
    const ret = await Api.getRegistrosPaginacaoCodNomeTab('compra', 
                                                          'cod_compra',
                                                          'cod_compra',
                                                          filtro);
    if (!ret.status) {
      console.log('status ', ret);
      
      return toastr.error('Erro!',
        'Não foi possível buscar os Registros\n' + ret.erro.error_message);
    }
    for (const compra of ret.dados) {
      (compra.dt_fechamento) ?
      compra.dt_fechamento = moment(new Date(compra.dt_fechamento)).format('DD/MM/YYYY HH:mm:ss') :
      null;
      (compra.dt_cadastro) ?
      compra.dt_cadastro = moment(new Date(compra.dt_cadastro)).format('DD/MM/YYYY HH:mm:ss') :
      null;
    }
    this.setState({ registros:ret.dados });
    return ret;
  }

  async setRegistro(compra) {
    const ret = await Api.getCompraItens(compra.cod_compra);
    if (ret && ret.status) {
      compra.itens = ret.dados;
    } else {
      compra.itens = [];
    }
    this.setState({ itens: compra.itens, registro: compra });

    const r = document.getElementById('cad-compra');
    if (r) {
      r.style.pointerEvents = compra.status_fechado === 'S' ? 'none' : '';
    }
  }

  /**
   * Retorna o registro atual que está sendo editado/incluido/deletado. É o mesmo
   * registro do nosso state, porém vamos retornar ele de forma pura, sem as propriedades
   * obsoletas que pegamos do backend.
   * @returns {Object} O objeto com apenas as propriedades de sua tabela preenchidas.
   */
  getRegistro() { // SALVAR
    const copiaLimpa = this.getRegistroLimpo();
    const novoRegistro = {};
    for (const key in copiaLimpa) {
      if (copiaLimpa.hasOwnProperty(key)) {
        novoRegistro[key] = this.state.registro[key];
      }
    }
    novoRegistro.dt_cadastro = inverteData(novoRegistro.dt_cadastro, false);
    const dtFechamento = novoRegistro.dt_fechamento;
    (dtFechamento) ? novoRegistro.dt_fechamento = inverteData(dtFechamento, false) : dtFechamento;
    novoRegistro.itens = this.state.itens;
    return novoRegistro;
  }

  getTableActions() {
    return [
      {
        className: 'btn-success',
        icone: 'fa-pencil',
        id: 'editar',
        disabled: this.state.itemEditando,
        tipo: Table.ACAO_TABELA,
      },
      {
        className: 'btn-danger',
        icone: 'fa-trash-o',
        id: 'excluir',
        disabled: this.state.itemEditando,
        tipo: Table.ACAO_TABELA,
      },
    ].concat(this.props.tableActions || []);
  }

  validar(compra) {    
    if (compra && compra.status_fechado === 'S') {
      toastr.error('Atenção!',
      'Não é possível excluir Compra Fechada!');
      return false;
    }
    return true;
  }

  limparRegistro() {
    this.setState({
      registro: this.getRegistroLimpo(),
    });
    this.setState({ 
      itens: [],
      itemEditando: null, 
      cod_produto: '',
      vr_item: '',
      qtde_item: '',
      vr_total_item: '',
      unidade_medida: '',
    });

    if (this.comboEditPanelProduto) {
      this.comboEditPanelProduto.limparUltimoCodigoValidado();
    }
    if (this.comboEditPanelFornecedor) {
      this.comboEditPanelFornecedor.limparUltimoCodigoValidado();
    }
  }

  calculaValorTotal() {
    const itens = this.state.itens;
    let valor = 0;
    for (const item of itens) {
      valor += item.vr_total_item;
    }
    valor = (valor + this.state.registro.vr_acrescimo) - this.state.registro.vr_desconto;
    this.setState({ 
      registro: {
        ...this.state.registro,
        vr_total: valor,
      },
    });
  }

  validaCamposItem() {
    if (!this.state.cod_produto) {
      toastr.error('Atenção', 'Produto Inválido');
      return false;
    } else if (!this.state.vr_item) {
      toastr.error('Atenção', 'Informe o valor do Produto');
      return false;
    } else if (!this.state.qtde_item) {
      toastr.error('Atenção', 'Informe a quantidade de Produtos');
      return false;
    } 
    return true;
  }

  adicionarItem() {
    if (!this.validaCamposItem()) {
      return;
    }
    const itens = this.state.itens;
    if (this.state.itemEditando) {
      const indice = itens.findIndex(e => e === this.state.itemEditando);
      itens[indice] = {
        nome_produto: this.comboEditPanelProduto.getDesc(),
        cod_produto: this.state.cod_produto,
        vr_item: this.state.vr_item,
        qtde_item: this.state.qtde_item,
        vr_total_item: this.state.vr_total_item,
        unidade_medida: this.state.unidade_medida,
      };
    } else {
      itens.push({
        nome_produto: this.comboEditPanelProduto.getDesc(),
        cod_produto: this.state.cod_produto,
        vr_item: this.state.vr_item,
        qtde_item: this.state.qtde_item,
        vr_total_item: this.state.vr_total_item,
        unidade_medida: this.state.unidade_medida,
      });
    }
    this.setState({ 
      itens,
      itemEditando: null,
      cod_produto: '',
      vr_item: '',
      qtde_item: '',
      vr_total_item: '',
      unidade_medida: '',
    }, () => {
      this.calculaValorTotal();
    });
  }
  
  calculaValor() {
    this.setState({
      vr_total_item: Number(this.state.qtde_item) * Number(this.state.vr_item),
    });
  }

  async fecharCompra() {
    await this.cadastro.getWrappedInstance().salvar(async (codCompra) => {
    await Api.abrirFecharCompra(codCompra, 'S', this.state.itens);
    });
  }

  tableActions() {
    return [
      {
        className: 'btn-warning',
        icone: 'fa-unlock',
        id: 'abrir',
        tipo: Table.ACAO_TABELA,
      },
    ];
  }

  async carregaProduto(e) {
    this.setState({ cod_produto: e.target.value });
    const ret = await Api.produtoCompra(e.target.value);
    if (ret.status && ret.dados) {
      this.setState({
        unidade_medida: ret.dados.unidade_medida,
        vr_item: ret.dados.vr_produto,
      });
    } else {
      this.setState({
        unidade_medida : '',
        vr_item: '',
      });
    }
  }

  /**
   * Renderiza as colunas que aparecerão no grid da listagem.
   */
  renderColunas() {
    return [
      <Column key={1} field="cod_compra"
                      style={{ width:60 + 'px' }} header="Código" />,
      <Column key={2} field="dt_cadastro" 
                      style={{ width:100 + 'px' }} header="Dt. Cadastro" />,
      <Column key={3} field="dt_fechamento" 
                      style={{ width:100 + 'px' }} header="Dt. Fechamento" />,
      <Column key={4} field="vr_total" 
                      style={{ width:100 + 'px' }} header="Valor Total" />,
    ];
  }

  /**
   * Renderiza o formulário de inclusão/alteração.
   */
  renderForm() {
    return (
      <div id="cad-compra">

        {/* Linha 1 */}
        <div className="row">
          <div className="row col-sm-12">

            <div className="col-sm-2">
              <LabeledInput label="Código:"
                            disabled
                            value={this.state.registro.cod_compra}
                            onChange={this.onChange.bind(this, 'cod_compra')} />
            </div>

            <div className="col-sm-7">
              <ApiceComboEditPanel label="Fornecedor:"
                                   tabela="tab_funcionario"
                                   chave="cod_funcionario"
                                   desc="nome_funcionario"
                                   where=" tp_usuario = 3 "
                                   colunas={getColunasCompraFornecedor()}
                                   value={this.state.registro.cod_fornecedor}
                                   onChange={this.onChange.bind(this, 'cod_fornecedor')}
                                   api={Api}
                                   ref={e => this.comboEditPanelFornecedor = e} />
            </div>

            <div className="col-sm-3">  
              <InputMask label="Dt. Fechamento:"
                         data
                         disabled
                         value={this.state.registro.dt_fechamento}
                         onChange={this.onChange.bind(this, 'dt_fechamento')} />
            </div>

          </div>
        </div>
        {/* Linha 1 */}

        {/* Linha 2 */}
        <div className="row">
          <div className="row col-sm-12">

            <div className="col-sm-3">  
              <InputCalc label="Valor Desconto:"
                        value={this.state.registro.vr_desconto}
                        onChange={this.onChange.bind(this, 'vr_desconto')} />
            </div>

            <div className="col-sm-3">  
              <InputCalc label="Valor Acrescimo:"
                        value={this.state.registro.vr_acrescimo}
                        onChange={this.onChange.bind(this, 'vr_acrescimo')}  />
            </div>

            <div className="col-sm-3">  
              <InputCalc label="Valor Total:"
                        disabled
                        permitirNegativo
                        value={this.state.registro.vr_total}
                        onChange={this.onChange.bind(this, 'vr_total')} />
            </div>

            <div className="col-sm-3">
              <LabeledInput label="Observação:"
                            value={this.state.registro.obs_compra}
                            onChange={this.onChange.bind(this, 'obs_compra')} />
            </div>

          </div>
        </div>
        {/* Linha 2 */}

        <div className="m-10 pt-10 light-upper-border" />

        {/* Linha 3 */}
        <div className="row">
          <div className="row col-sm-12">

            <div className="col-sm-10">
              <ApiceComboEditPanel label="Produto:"
                                   tabela="tab_produto"
                                   chave="cod_produto"
                                   desc="nome_produto"
                                   colunas={getColunasCompraProduto()}
                                   value={this.state.cod_produto}
                                   onChange={this.carregaProduto.bind(this)}
                                   api={Api}
                                   ref={e => this.comboEditPanelProduto = e} />
            </div>

            <div className="col-sm-2">
              <LabeledInput label="Uni. Medida:"
                            value={this.state.unidade_medida}
                            onChange={e => this.setState({ unidade_medida: e.target.value })} />
            </div>

          </div>
        </div>
        {/* Linha 3 */}

        {/* Linha 4 */}
        <div className="row">
          <div className="row col-sm-12">

            <div className="col-sm-3">  
              <InputCalc label="Valor Item:"
                        value={this.state.vr_item}
                        onChange={e => { this.setState({ vr_item: e },
                                                       this.calculaValor.bind(this)); }} />
            </div>

            <div className="col-sm-3">
              <LabeledInput label="Qtde Item:"
                            type="number"
                            min="0"
                            value={this.state.qtde_item}
                            onChange={e => { this.setState({ qtde_item: e.target.value },
                                                           this.calculaValor.bind(this)); }} />
            </div>

            <div className="col-sm-3">  
              <InputCalc label="Valor Total Item:"
                         disabled
                         value={this.state.vr_total_item}
                         onChange={e => this.setState({ vr_total_item: e })} />
            </div>

            <div className="col-sm-3">  
            <Button className="mt-5 ml-5 btn-success"
                    onClick={this.adicionarItem.bind(this)}
                    icon="fa-plus" />
            </div>

          </div>
        </div>
        {/* Linha 4 */}

        {/* Linha 5 */}
        <div>
          <Table data={this.state.itens}
                 title="Itens"
                 actions={this.getTableActions()}
                 onActionClick={this.onTableActionClick.bind(this)}
                 ref={e => this.table = e} >
            <Column key={1} field="cod_produto"
                            style={{ width:60 + 'px' }} header="Cód. Produto" />
            <Column key={10} field="nome_produto"
                            style={{  }} header="Produto" />
            <Column key={2} field="vr_item" 
                            style={{ width:100 + 'px' }} header="Vr. Item" />
            <Column key={3} field="qtde_item" 
                            style={{ width:100 + 'px' }} header="Qtde Item" />
          </Table>
        </div>
        {/* Linha 5 */}

        <div>
          <Button className="mt-5 ml-5 btn-success"
          label="Fechar"
          onClick={this.fecharCompra.bind(this)}
          icon="fa-check" />
        </div>
      
      </div>
      
    );
  }

  render() {
    return (
      <Cadastro tabela="tab_compra"
        pk="cod_compra"
        titulo="Movimento de Compra"
        subTitulo="Compras!"

        paginavel

        renderForm={this.renderForm.bind(this)}
        renderColunas={this.renderColunas.bind(this)}

        getMsgExcluir={this.getMsgExcluir.bind(this)}
        getRegistros={this.getRegistros.bind(this)}
        getRegistro={this.getRegistro.bind(this)}
        setRegistro={this.setRegistro.bind(this)}

        onTableActionClick={this.onTableActionClick.bind(this)}

        validar={this.validar.bind(this)}
        tableActions={this.tableActions()}

        limparRegistro={this.limparRegistro.bind(this)}
        ref={e => this.cadastro = e} />
    );
  }

}

