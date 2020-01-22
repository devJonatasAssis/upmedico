import React from 'react';
import { toastr } from 'react-redux-toastr';

import Api from '../utils/Api';

import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import { Column } from '../lib_react_adminlte/componentes/Table';
import Cadastro from './Cadastro';

import ComboList from '../lib_react_adminlte/componentes/ComboList.jsx';

/**
 */
export default class CadastroCidade extends React.Component {

  state = {
    registros: [],
    estados: [],
    registro: this.getRegistroLimpo(),
  };
  
  componentDidMount() {
    this.getListaEstados();
  }

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
    });
  }

  /**
   * Retorna a mensagem de confirmação ao excluir
   */
  getMsgExcluir() {
    return `Tem certeza que deseja excluir a Cidade: "
            ${this.state.registro.cidade}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_cidade: null,
      cidade: '',
      cod_ibge: 0,
      cod_estado: null,
    };
  }

  /**
   * Retorna a Lista de Estados para o Combo
   */
  async getListaEstados() {
    const ret = await Api.getRegistrosCodNome('cod_estado', 'estado', 'tab_estado'); 
    if (!ret.status) {
      console.log('status ', ret);
      
      return toastr.error('Erro!',
        'Não foi possível buscar os Registros ->\n' + ret.erro.error_message);
    }
    
    this.setState({ estados: ret.dados });
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
    const ret = await Api.getRegistrosPaginacaoCodNomeTabInner('cidade', 'cidade', 'cod_cidade', 'estado', 'cod_estado', 'estado', filtro);
    if (!ret.status) {
      console.log('status ', ret);
      
      return toastr.error('Erro!',
        'Não foi possível buscar os Registros\n' + ret.erro.error_message);
    }
    this.setState({ registros:ret.dados });
    return ret;
  }

  /**
   * Retorna o registro atual que está sendo editado/incluido/deletado. É o mesmo
   * registro do nosso state, porém vamos retornar ele de forma pura, sem as propriedades
   * obsoletas que pegamos do backend.
   * @returns {Object} O objeto com apenas as propriedades de sua tabela preenchidas.
   */
  getRegistro() {
    const copiaLimpa = this.getRegistroLimpo();
    const novoRegistro = {};
    for (const key in copiaLimpa) {
      if (copiaLimpa.hasOwnProperty(key)) {
        novoRegistro[key] = this.state.registro[key];
      }
    }

    return novoRegistro;
  }

  limparRegistro() {
    this.setState({
      registro: this.getRegistroLimpo(),
    });
  }

  /**
   * Renderiza as colunas que aparecerão no grid da listagem.
   */
  renderColunas() {
    return [
      <Column key={1} field="cod_cidade"
                      style={{ width:60 + 'px' }} header="Código" />,
      <Column key={2} field="cidade" 
                      style={{ width:180 + 'px' }} header="Cidade" />,
      <Column key={3} field="estado"
                      style={{ width:150 + 'px' }} header="Estado" />,
      <Column key={4} field="cod_ibge"
                      style={{ width:80 + 'px' }} header="Cód. IBGE" />,
    ];
  }

  /**
   * Renderiza o formulário de inclusão/alteração.
   */
  renderForm() {
    return (
      <div>
        {/* Linha 1 */}
        <div className="row">
          <div className="row col-sm-12">

            <div className="col-sm-2">
              <LabeledInput label="Código:"
                            disabled
                            value={this.state.registro.cod_cidade}
                            onChange={this.onChange.bind(this, 'cod_cidade')} />
            </div>
          
            <div className="col-sm-5">
              <LabeledInput label="Cidade:"
                            value={this.state.registro.cidade}
                            onChange={this.onChange.bind(this, 'cidade')} />
            </div>
          
            <div className="col-sm-2">
              <LabeledInput label="IBGE:"
                            type="number"
                            value={this.state.registro.cod_ibge}
                            onChange={this.onChange.bind(this, 'cod_ibge')} />
            </div>

            <div className="col-sm-3">
              <ComboList value={this.state.registro.cod_estado}
                        lista={this.state.estados}
                        campo='estado'
                        label='Estado:'
                        valor='cod_estado'
                        onChange={this.onChange.bind(this, 'cod_estado')} />
            </div>

          </div>
        </div>

      </div>
    );
  }

  render() {
    return (
      <Cadastro tabela="tab_cidade"
        pk="cod_cidade"
        titulo="Cadastro de Cidade"
        subTitulo="Configure as suas Cidades!"

        paginavel

        renderForm={this.renderForm.bind(this)}
        renderColunas={this.renderColunas.bind(this)}

        getMsgExcluir={this.getMsgExcluir.bind(this)}
        getRegistros={this.getRegistros.bind(this)}
        getRegistro={this.getRegistro.bind(this)}
        setRegistro={(item) => this.setState({ registro: item })}

        limparRegistro={this.limparRegistro.bind(this)}
        ref={e => this.cadastro = e} />
    );
  }

}

