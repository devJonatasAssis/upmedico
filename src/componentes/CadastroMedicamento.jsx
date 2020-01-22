import React from 'react';
import { toastr } from 'react-redux-toastr';

import Api from '../utils/Api';

import { RadioGroup, RadioButton } from '../lib_react_adminlte/componentes/RadioGroup.jsx';
import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import { Column } from '../lib_react_adminlte/componentes/Table';
import ApiceComboEditPanel from '../lib_react_adminlte/componentes/ApiceComboEditPanel';
import { getColunasFuncionario } from '../lib_react_adminlte/common/Template.jsx';
import Cadastro from './Cadastro';

/**
 */
export default class CadastroMedicamento extends React.Component {

  state = {
    registros: [],
    registro: this.getRegistroLimpo(),
    wherePesquisaFuncionario: '',
    tipo: 'D',
    tipo_medicamento: 'N',
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
    return `Tem certeza que deseja excluir o Medicamento: "
            ${this.state.registro.nome_medicamento}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_medicamento: null,
      cod_funcionario: null,
      nome_medicamento: '',
      observacao: '',
      uso: '',
      forma: '',
      quantidade: '',
      posologia_1: '',
      posologia_2: '',
      posologia_3: '',
      posologia_4: '',
      posologia_5: '',
      tp_medicamento: 'N',
      tipo: 'D',
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
    const ret = await Api.getRegistrosPaginacaoCodNomeTabInner('medicamento', 'nome_medicamento', 'cod_medicamento', 'funcionario', 'cod_funcionario', 'nome_funcionario', filtro);
    if (!ret.status) {
      console.log('status ', ret);
      
      return toastr.error('Erro!',
        'Não foi possível buscar os produtos\n' + ret.erro.error_message);
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

    if (this.comboEditPanelFuncionario) {
      this.comboEditPanelFuncionario.limparUltimoCodigoValidado();
    }
  }

  /**
   * Renderiza as colunas que aparecerão no grid da listagem.
   */
  renderColunas() {
    return [
      <Column key={1} field="nome_medicamento"
                      style={{ width:200 + 'px' }} header="Medicamento" />,
      <Column key={2} field="observacao" 
                      style={{ width:100 + 'px' }} header="Observação" />,
      <Column key={3} field="uso"
                      style={{ width:80 + 'px' }} header="Uso" />,
      <Column key={4} field="forma"
                      style={{ width:80 + 'px' }} header="Forma" />,
      <Column key={5} field="quantidade"
                      style={{ width:80 + 'px' }} header="Quantidade" />,
      <Column key={6} field="nome_funcionario"
                      style={{ width:70 + 'px' }} header="Médico" />,
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

            <div className="col-sm-6">
              <RadioGroup title="Tipo"
                          className="mt-10">
                  
                <div className="row">
                  <div className="col-sm-6 col-xs-6">
                    <RadioButton name="tipo"
                                 text="Dispensação"
                                 checked={this.state.registro.tipo === 'D'}
                                 onChange={() => this.setState({ registro: { ...this.state.registro, tipo: 'D' } })} />
                  </div>

                  <div className="col-sm-6 col-xs-6">                  
                    <RadioButton name="tipo"
                                 text="Matéria Prima"
                                 checked={this.state.registro.tipo === 'M'}
                                 onChange={() => this.setState({ registro: { ...this.state.registro, tipo: 'M' } })} />
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="col-sm-6">
              <RadioGroup title="Tipo de Medicamento"
                          className="mt-10">
                  
                <div className="row">
                  <div className="col-sm-6 col-xs-6">
                    <RadioButton name="tp_medicamento"
                                 text="Normal"
                                 checked={this.state.registro.tp_medicamento === 'N'}
                                 onChange={() => this.setState({ registro: { ...this.state.registro, tp_medicamento: 'N' } })} />
                  </div>

                  <div className="col-sm-6 col-xs-6">                  
                    <RadioButton name="tp_medicamento"
                                 text="Agrupamento"
                                 checked={this.state.registro.tp_medicamento === 'A'}
                                 onChange={() => this.setState({ registro: { ...this.state.registro, tp_medicamento: 'A' } })} />
                  </div>
                </div>
              </RadioGroup>
            </div>

          </div>
        </div>

        {/* Linha 2 */}
        <div className="row">
          <div className="row col-sm-12">
            <div className="col-sm-12">
              <ApiceComboEditPanel label={'Funcionário:'}
                                   tabela={'tab_funcionario'}
                                   chave={'cod_funcionario'}
                                   desc={'nome_funcionario'}
                                   where={this.state.wherePesquisaFuncionario}
                                   colunas={getColunasFuncionario()}
                                   value={this.state.registro.cod_funcionario}
                                   onChange={e => this.onChange('cod_funcionario', e.target.value)}
                                   ref={e => this.comboEditPanelFuncionario = e}
                                   api={Api} />
            </div>
          </div>
        </div>

        {/* Linha 3 */}
        <div className="row">
          <div className="row col-sm-12">
            <div className="col-sm-12">
              <LabeledInput label="Medicamento:"
                            value={this.state.registro.nome_medicamento}
                            onChange={this.onChange.bind(this, 'nome_medicamento')} />
            </div>
          </div>
        </div>
        
        {/* Linha 4 */}
        <div className="row">
          <div className="row col-sm-12">
            <div className="col-sm-12">
              <LabeledInput label="Observação:"
                            value={this.state.registro.observacao}
                            onChange={this.onChange.bind(this, 'observacao')} />
            </div>
          </div>
        </div>
        
        {/* Linha 5 */}
        <br />
        <div className="row">
          <div className="row col-sm-12">
            <div className="col-sm-4">
              <LabeledInput label="Uso:"
                            value={this.state.registro.uso}
                            onChange={this.onChange.bind(this, 'uso')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="Forma:"
                            value={this.state.registro.forma}
                            onChange={this.onChange.bind(this, 'forma')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="Quantidade:"
                            value={this.state.registro.quantidade}
                            onChange={this.onChange.bind(this, 'quantidade')} />
            </div>
          </div>
        </div>

        {/* Linha 6 */}
        <br />
        <div className="row">
          <div className="row col-sm-12">
            <div className="col-sm-12 ">
              <LabeledInput label="Posologias (1, 2, 3, 4, 5):"
                            value={this.state.registro.posologia_1}
                            onChange={this.onChange.bind(this, 'posologia_1')} />
                            
              <LabeledInput value={this.state.registro.posologia_2}
                            onChange={this.onChange.bind(this, 'posologia_2')} />

              <LabeledInput value={this.state.registro.posologia_3}
                            onChange={this.onChange.bind(this, 'posologia_3')} />
                            
              <LabeledInput value={this.state.registro.posologia_4}
                            onChange={this.onChange.bind(this, 'posologia_4')} />
                            
              <LabeledInput value={this.state.registro.posologia_5}
                            onChange={this.onChange.bind(this, 'posologia_5')} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Cadastro tabela="tab_medicamento"
        pk="cod_medicamento"
        titulo="Cadastro de Medicamento"
        subTitulo="Configure os seus Medicamentos!"

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

