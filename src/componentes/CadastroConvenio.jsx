import React from 'react';
import { toastr } from 'react-redux-toastr';
import { RadioGroup } from '../lib_react_adminlte/componentes/RadioGroup.jsx';
import Checkbox from '../lib_react_adminlte/componentes/Checkbox.jsx';

import Api from '../utils/Api';

import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import { Column } from '../lib_react_adminlte/componentes/Table';
import Cadastro from './Cadastro';

/**
 */
export default class CadastroConvenio extends React.Component {

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
    return `Tem certeza que deseja excluir o Convenio: "
            ${this.state.registro.nome_convenio}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_convenio: null,
      nome_convenio: '',
      registro_ans: '',
      status_emite_tiss: 'N',
      nr_tabela: '',
      cod_tipo_documento_exame_tiss_frente_a4: 0,
      cod_tipo_documento_exame_tiss_verso_a4: 0,
      cod_tipo_documento_exame_tiss_frente_a5: 0,
      cod_tipo_documento_exame_tiss_verso_a5: 0,
      cod_tipo_documento_guia_internacao: 0,
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
    const ret = await Api.getRegistrosPaginacaoCodNomeTab('convenio', 'nome_convenio', 'cod_convenio', filtro);
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
      <Column key={1} field="cod_convenio"
                      style={{ width:60 + 'px' }} header="Código" />,
      <Column key={2} field="nome_convenio" 
                      style={{ width:100 + 'px' }} header="Convenio" />,
      <Column key={3} field="registro_ans" 
                      style={{ width:100 + 'px' }} header="Registro ANS" />,
      <Column key={4} field="status_emite_tiss" 
                      style={{ width:100 + 'px' }} header="Emite TISS" />,
      <Column key={5} field="nr_tabela" 
                      style={{ width:100 + 'px' }} header="Nr. Tabela" />,
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
                            value={this.state.registro.cod_convenio}
                            onChange={this.onChange.bind(this, 'cod_convenio')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="Convenio:"
                            value={this.state.registro.nome_convenio}
                            onChange={this.onChange.bind(this, 'nome_convenio')} />
            </div>

            <div className="col-sm-3">  
              <LabeledInput label="Registro ANS:"
                            value={this.state.registro.registro_ans}
                            onChange={this.onChange.bind(this, 'registro_ans')} />
            </div>

            <div className="col-sm-3">
              <RadioGroup className="mt-10">
                <div className="flex">
                  <Checkbox checked={this.state.registro.status_emite_tiss === 'S'}
                            onChange={e => this.onChange('status_emite_tiss', e.target.checked ? 'S' : 'N')}
                            text="Emite TISS" className="inline mr-10" />  
                </div>
              </RadioGroup>
            </div>

          </div>
        </div>
        {/* Linha 1 */}

        {/* Linha 2 */}
        <div className="row">
          <div className="row col-sm-12">

            <div className="col-sm-4">
              <LabeledInput label="Nr. Tabela:"
                            value={this.state.registro.nr_tabela}
                            onChange={this.onChange.bind(this, 'nr_tabela')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="Exame TISS Frente A4:"
                            type="number"
                            value={this.state.registro.cod_tipo_documento_exame_tiss_frente_a4}
                            onChange={this.onChange.bind(this, 'cod_tipo_documento_exame_tiss_frente_a4')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="Exame TISS Verso A4:"
                            type="number"
                            value={this.state.registro.cod_tipo_documento_exame_tiss_verso_a4}
                            onChange={this.onChange.bind(this, 'cod_tipo_documento_exame_tiss_verso_a4')} />
            </div>

          </div>
        </div>
        {/* Linha 2 */}

        {/* Linha 3 */}
        <div className="row">
          <div className="row col-sm-12">

            <div className="col-sm-4">
              <LabeledInput label="Exame TISS Frente A5:"
                            type="number"
                            value={this.state.registro.cod_tipo_documento_exame_tiss_frente_a5}
                            onChange={this.onChange.bind(this, 'cod_tipo_documento_exame_tiss_frente_a5')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="Exame TISS Verso A5:"
                            type="number"
                            value={this.state.registro.cod_tipo_documento_exame_tiss_verso_a5}
                            onChange={this.onChange.bind(this, 'cod_tipo_documento_exame_tiss_verso_a5')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="Guia Intenação:"
                            type="number"
                            value={this.state.registro.cod_tipo_documento_guia_internacao}
                            onChange={this.onChange.bind(this, 'cod_tipo_documento_guia_internacao')} />
            </div>

          </div>
        </div>
        {/* Linha 3 */}

      </div>
    );
  }

  render() {
    return (
      <Cadastro tabela="tab_convenio"
        pk="cod_convenio"
        titulo="Cadastro de Convenio"
        subTitulo="Configure os seus Convenios!"

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

