import React from 'react';
import { toastr } from 'react-redux-toastr';
import { Table, Column } from '../lib_react_adminlte/componentes/Table.jsx';
import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import ApiceComboEditPanel from '../lib_react_adminlte/componentes/ApiceComboEditPanel.jsx';
import Checkbox from '../lib_react_adminlte/componentes/Checkbox.jsx';
import Combo from '../lib_react_adminlte/componentes/Combo.jsx';
import Cadastro from './Cadastro.jsx';
import Api from '../utils/Api.jsx';

export default class CadastroFormaPagComanda extends React.Component {

  state = {
    registros: [],
    registro: this.getRegistroLimpo(),
  };

  onChange(prop, event) {
    this.setState({
      registro: {
        ...this.state.registro,
        [prop]: event.target ? event.target.value : event,
      },
    });
  }

  async onTableActionClick(actionId) {
    const codigo = this.state.itemSelecionado.cod_forma_pagamento_comanda;
    if (actionId === 'desativar-ativar') {
      await Api.desativarAtivarPadrao('tab_forma_pagamento_comanda', codigo, 
          'nome_forma_pagamento_comanda');
      this.cadastro.getWrappedInstance().carregarRegistros();
      this.setState({ itemSelecionado: null });
    }
  }

  getTableColor() {
    return [{
      condition: {
        status_ativo: 'N',
      },
      backgroundColor: 'rgba(255, 0, 0, .8)',
      color: 'white',
    }];
  }

  /**
   * Retorna a mensagem de confirmação ao excluir.
   */
  getMsgExcluir() {
    return `Tem certeza que deseja excluir a forma de pagamento 
        "${this.state.registro.nome_forma_pagamento_comanda}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_forma_pagamento_comanda: '',
      nome_forma_pagamento_comanda: '',
      status_cheque: '',
      status_troco: '',
      status_fatura: '',
      qtde_dias: '',
      cod_operadora_cartao: '',
      status_cartao: '',
      nfce_tpag: '',
      status_ativo: '',
      status_garcom_automatico: '',
      seq: '',        
    };
  }

  /**
   * Retorna as ações da tabela.
   */
  getTableActions() {
    return [
      {
        className: 'btn-danger',
        icone: 'fa-times',
        label: 'Desativar/Ativar',
        id: 'desativar-ativar',
        disabled: !this.state.itemSelecionado,
        tipo: Table.ACAO_CABECALHO,
      },
    ];
  }

  /**
   * Retorna a lista de registros para o cadastro.
   * @param {string} filtro O Filtro superior da tela.
   */
  async getRegistros(filtro) {
    const ret = await Api.papito(`
      find:tab_forma_pagamento_comanda {
        status_troco,
        status_troco_formatado (@IF $status_cheque eq 'N' || 'Não' || 'Sim'),
        cod_forma_pagamento_comanda,
        nome_forma_pagamento_comanda,
        status_cheque,
        status_cheque_formatado (@IF $status_cheque eq 'N' || 'Não' || 'Sim'),
        status_fatura,
        status_fatura_formatado (@IF $status_fatura eq 'N' || 'Não' || 'Sim'),
        qtde_dias,
        cod_operadora_cartao,
        status_cartao,
        status_cartao_formatado (@IF $status_cartao eq 'N' || 'Não' || 'Sim'),
        nfce_tpag,
        status_ativo,    
        status_ativo_formatado (@IF $status_ativo eq 'N' || 'Não' || 'Sim'),  
        status_garcom_automatico, 
        status_garcom_automatico_formatado (@IF $status_garcom_automatico eq 'N' || 'Não' || 'Sim'),     
        seq,        
        . tab_operadora_cartao cod_operadora_cartao {
          nome_operadora_cartao,
        },
      };
    `);
    if (!ret.status) {
      return toastr.error('Erro!', ret.erro.error_message);
    }    
    ret.dados = ret.dados.filter(x => (
      x.nome_forma_pagamento_comanda.indexOf(filtro) >= 0
    ));
    return ret;
  }

  /**
   * Retorna o registro.
   */
  getRegistro() {
    const copy = Object.assign({}, this.state.registro);
    delete copy.status_troco_formatado;
    delete copy.status_cheque_formatado;
    delete copy.status_fatura_formatado;
    delete copy.status_ativo_formatado;
    delete copy.status_cartao_formatado;
    delete copy.status_garcom_automatico_formatado;
    delete copy.tab_operadora_cartao;
    return copy;
  }

  /**
   * Limpa o registro atual.
   */
  limparRegistro() {
    this.setState({
      registro: this.getRegistroLimpo(),
      itemSelecionado: null,
    });
  }

  /**
   * Renderiza as colunas que aparecerão no grid da listagem.
   */
  renderColunas() {
    return [
      <Column key={0} field="seq" header="Sequência" />,
      <Column key={1} field="nome_forma_pagamento_comanda" 
          header="Forma de Pagamento" />,
      <Column key={2} field="status_troco_formatado" header="Troco?" />,
      <Column key={3} field="status_cheque_formatado" header="Cheque?" />,
      <Column key={4} field="status_cartao_formatado" header="Cartão?" />,
      <Column key={5} field="tab_operadora_cartao.nome_operadora_cartao" 
          header="Operadora de Cartão" />,
      <Column key={6} field="status_fatura_formatado" header="Fatura?" />,
      <Column key={8} field="qtde_dias" header="Qtde Dias" />,
      <Column key={9} field="status_ativo_formatado" header="Ativo?" />,
      <Column key={10} field="status_garcom_automatico_formatado" header="Informa Garçom?" />,
    ];
  }

  /**
   */
  renderColunasOperadoraCartao() {
    return [
      <Column key={0} field="cod_operadora_cartao" header="Código" />,
      <Column key={0} field="nome_operadora_cartao" header="Nome" />,
    ];
  }

  /**
   * Renderiza o formulário de inclusão/alteração.
   */
  renderForm() {
    return (
      <div>

        {/* Primeira linha */}
        <div className="row">
          <div className="col-sm-3">
            <LabeledInput label="Sequência de exibição:"
                          value={this.state.registro.seq}
                          onChange={this.onChange.bind(this, 'seq')} 
                          type="number" />
          </div>
          <div className="col-sm-6">
            <LabeledInput label="Forma de pagamento"
                          value={this.state.registro.nome_forma_pagamento_comanda}
                          onChange={this.onChange.bind(this, 'nome_forma_pagamento_comanda')} />
          </div>
        </div>

        {/* Segunda linha: */}
        <div className="row d-flex mt-10">
          {/* Primeira coluna: */}
          <div className="flex-wrap pl-15 cb-top-25px">
            <div className="d-flex flex-col">
              <div className="flex">
                <Checkbox checked={this.state.registro.status_cartao === 'S'}
                        onChange={e => this.onChange('status_cartao', e.target.checked ? 'S' : 'N')}
                        text="É Cartão?" className="inline mr-10" />
                <Checkbox checked={this.state.registro.status_troco === 'S'}
                        onChange={e => this.onChange('status_troco', e.target.checked ? 'S' : 'N')}
                        text="É Troco?" className="inline mr-10" />
                <Checkbox checked={this.state.registro.status_cheque === 'S'}
                        onChange={e => this.onChange('status_cheque', e.target.checked ? 'S' : 'N')}
                        text="É Cheque?" className="inline mr-10" />
                <Checkbox checked={this.state.registro.status_fatura === 'S'}
                        onChange={e => this.onChange('status_fatura', e.target.checked ? 'S' : 'N')}
                        text="É Fatura?" className="inline mr-10" />
              <Checkbox checked={this.state.registro.status_garcom_automatico === 'S'}
                      onChange={e => this.onChange('status_garcom_automatico', 
                                                    e.target.checked ? 'S' : 'N')}
                      text="Garçom automático?" className="inline mr-10" />
              </div>
            </div>
          </div>

          {/* Segunda coluna: */}
          <div className="row col-sm-6">
            <div className="col-sm-5">
              <LabeledInput label="Qtde dias:"
                            value={this.state.registro.qtde_dias}
                            onChange={this.onChange.bind(this, 'qtde_dias')} 
                            type="number" />
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-sm-5">
            <Combo value={this.state.registro.nfce_tpag}
                   onChange={this.onChange.bind(this, 'nfce_tpag')}>
              <option value="1">01-Dinheiro</option>
              <option value="2">02-Cheque</option>
              <option value="3">03-Cartão de Crédito</option>
              <option value="4">04-Cartão de Débito</option>
              <option value="5">05-Crédito Loja</option>
              <option value="10">10-Vale Alimentação</option>
              <option value="11">11-Vale Refeição</option>
              <option value="12">12-Vale Presente</option>
              <option value="13">13-Vale Combustível</option>
              <option value="99">99-Outros</option>
            </Combo>
          </div>
        </div>    

        <div className="row mt-5">
          <div className="col-sm-5">
            <ApiceComboEditPanel label="Operadora cartão de crédito (Não obrigatório):"
                                tabela="tab_operadora_cartao"
                                chave="cod_operadora_cartao"
                                desc="nome_operadora_cartao"
                                colunas={this.renderColunasOperadoraCartao()}
                                ref={e => this.comboEditOperadora = e}
                                value={this.state.registro.cod_operadora_cartao}
                                onChange={this.onChange.bind(this, 'cod_operadora_cartao')} 
                                api={Api} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Cadastro tabela="tab_forma_pagamento_comanda"
                pk="cod_forma_pagamento_comanda"
                titulo="Cadastro de Forma de pagamento"
                subTitulo="Configure as suas formas de pagamento!"

                tableSelecionavel
                itemSelecionadoTable={this.state.itemSelecionado}
                onSelecionarItemTable={e => this.setState({ itemSelecionado: e })}
                onTableActionClick={this.onTableActionClick.bind(this)}
                tableColor={this.getTableColor()}

                renderForm={this.renderForm.bind(this)}
                renderColunas={this.renderColunas.bind(this)}

                tableActions={this.getTableActions()}
                getMsgExcluir={this.getMsgExcluir.bind(this)}
                getRegistros={this.getRegistros.bind(this)}
                getRegistro={this.getRegistro.bind(this)}
                setRegistro={(item) => this.setState({ registro: item })}

                limparRegistro={this.limparRegistro.bind(this)}
                ref={e => this.cadastro = e} />
    );
  }

}

