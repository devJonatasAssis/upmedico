import React from 'react';
import { toastr } from 'react-redux-toastr';

import Api from '../utils/Api';

import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import { Column } from '../lib_react_adminlte/componentes/Table';
import Cadastro from './Cadastro';

/**
 */
export default class CadastroGrauParentesco extends React.Component {

  state = {
    registros: [],
    registro: this.getRegistroLimpo(),
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
    });
  }

  /**
   * Retorna a mensagem de confirmação ao excluir
   */
  getMsgExcluir() {
    return `Tem certeza que deseja excluir o Grau de Parentesco: "
            ${this.state.registro.nome_grau_parentesco}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_grau_parentesco: null,
      nome_grau_parentesco: '',
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
    const ret = await Api.getRegistrosPaginacaoCodNomeTab('grau_parentesco', 'nome_grau_parentesco', 'cod_grau_parentesco', filtro);
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
      <Column key={1} field="cod_grau_parentesco"
                      style={{ width:60 + 'px' }} header="Código" />,
      <Column key={2} field="nome_grau_parentesco" 
                      style={{ width:200 + 'px' }} header="Grau de Parentesco" />,
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
                            value={this.state.registro.cod_grau_parentesco}
                            onChange={this.onChange.bind(this, 'cod_grau_parentesco')} />
            </div>
          
            <div className="col-sm-10">
              <LabeledInput label="Grau de Parentesco:"
                            value={this.state.registro.nome_grau_parentesco}
                            onChange={this.onChange.bind(this, 'nome_grau_parentesco')} />
            </div>

          </div>
        </div>

      </div>
    );
  }

  render() {
    return (
      <Cadastro tabela="tab_grau_parentesco"
        pk="cod_grau_parentesco"
        titulo="Cadastro de Grau de Parentesco"
        subTitulo="Configure os Graus de Parentesco!"

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

