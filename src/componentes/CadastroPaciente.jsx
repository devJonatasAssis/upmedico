import React from 'react';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import { inverteData, removeCaracteres } from '../utils/funcoesGenericas';

import Api from '../utils/Api.jsx';

import { Column } from '../lib_react_adminlte/componentes/Table.jsx';
import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import InputTextArea from '../lib_react_adminlte/componentes/InputTextArea.jsx';
import InputMask from '../lib_react_adminlte/componentes/InputMask.jsx';
import InputCalc from '../lib_react_adminlte/componentes/InputCalc.jsx';
import ApiceComboEditPanel from '../lib_react_adminlte/componentes/ApiceComboEditPanel.jsx';
import {
  getColunasConvenio,
  getColunasEstadoCivil,
  getColunasEscolaridade,
  getColunasSexo,
  getColunasCidade,
  getColunasBairro,
  getColunasResponsavel,
  getColunasGrauParentesco
} from '../lib_react_adminlte/common/Template';
import Cadastro from './Cadastro.jsx';

import { PageControl, Aba } from '../lib_react_adminlte/componentes/Aba.jsx';

/**
 * Componente de cadastro de Paciente.
 */
export default class CadastroPaciente extends React.Component {

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
   * Retorna a mensagem de confirmação ao excluir.
   */
  getMsgExcluir() {
    return `Tem certeza que deseja excluir o Paciente: "
            ${this.state.registro.nome_paciente}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_paciente: null,
      nome_paciente: '',
      nr_prontuario: 0,
      cod_convenio: 0,
      dt_nascimento: null,
      dt_cadastro: moment(new Date()).format('DD/MM/YYYY HH:mm:ss'),
      idade_anos: 0,
      cod_estado_civil: 0,
      cod_escolaridade: 0,
      cod_sexo: 0,
      altura: 0,
      cpf: '',
      rg: '',
      endereco: '',
      cod_cidade: 0,
      cod_bairro: 0,
      cep: '',
      telefone_1: '',
      telefone_2: '',
      cod_responsavel: 0,
      cod_grau_parentesco: 0,
      responsavel_profissao: '',
      email: '',
      anamnese_paciente: '',
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
    const ret = await Api.getRegistrosPaginacaoCodNomeTabInner('paciente', 'nome_paciente', 'cod_paciente', 'convenio', 'cod_convenio', 'nome_convenio', filtro);
    // const ret = await Api.getRegistrosPaginacaoCodNomeTab('paciente', 'nome_paciente', 'cod_paciente', filtro);
    if (!ret.status) {
      return toastr.error('Erro!',
        'Não foi possível buscar os Registros ->\n' + ret.erro.error_message);
    }

    for (const compra of ret.dados) {
      (compra.dt_cadastro) ?
        compra.dt_cadastro = moment(new Date(compra.dt_cadastro)).format('DD/MM/YYYY HH:mm:ss') :
        null;
      (compra.dt_nascimento) ?
        compra.dt_nascimento = moment(new Date(compra.dt_nascimento)).format('DD/MM/YYYY HH:mm:ss') :
        null;
    }
    this.setState({ registros: ret.dados });
    this.aba.setAbaSelecionada('abaDados');
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
    novoRegistro.cpf = removeCaracteres(novoRegistro.cpf);
    novoRegistro.cep = removeCaracteres(novoRegistro.cep);
    novoRegistro.telefone_1 = removeCaracteres(novoRegistro.telefone_1);
    novoRegistro.telefone_2 = removeCaracteres(novoRegistro.telefone_2);
    novoRegistro.dt_cadastro = inverteData(novoRegistro.dt_cadastro, false);
    const dtNascimento = novoRegistro.dt_nascimento;
    (dtNascimento) ? novoRegistro.dt_nascimento = inverteData(dtNascimento, false) : dtNascimento;
    return novoRegistro;
  }

  /**
   * Limpa o registro atual.
   */
  limparRegistro() {
    this.setState({
      registro: this.getRegistroLimpo(),
    });

    if (this.comboEditPanelConvenio) {
      this.comboEditPanelConvenio.limparUltimoCodigoValidado();
    }
    if (this.comboEditPanelEstCivil) {
      this.comboEditPanelEstCivil.limparUltimoCodigoValidado();
    }
    if (this.comboEditPanelEscolaridade) {
      this.comboEditPanelEscolaridade.limparUltimoCodigoValidado();
    }
    if (this.comboEditPanelSexo) {
      this.comboEditPanelSexo.limparUltimoCodigoValidado();
    }
    if (this.comboEditPanelCidade) {
      this.comboEditPanelCidade.limparUltimoCodigoValidado();
    }
    if (this.comboEditPanelBairro) {
      this.comboEditPanelBairro.limparUltimoCodigoValidado();
    }
    if (this.comboEditPanelResponsavel) {
      this.comboEditPanelResponsavel.limparUltimoCodigoValidado();
    }
    if (this.comboEditPanelGrauParentesco) {
      this.comboEditPanelGrauParentesco.limparUltimoCodigoValidado();
    }
  }

  async validar() {
    const paciente = await Api.validaPaciente(this.registro.cod_paciente);
    console.log(paciente);
    
  }

  /**
   * Renderiza as colunas que aparecerão no grid da listagem.
   */
  renderColunas() {
    return [
      <Column key={0} field="nome_paciente"
        style={{ width: 150 + 'px' }} header="Paciente" />,
      <Column key={1} field="nr_prontuario"
        style={{ width: 80 + 'px' }} header="Prontuário" />,
      <Column key={2} field="nome_convenio"
        style={{ width: 60 + 'px' }} header="Convenio" />,
      <Column key={3} field="telefone_1"
        style={{ width: 120 + 'px' }} header="Telefone" />,
    ];
  }

  /**
   * Renderiza o formulário de inclusão/alteração.
   */
  renderForm() {
    return (
      <div>
        {/* Linha */}
        <div className="row">
          <div className="row col-sm-12">

            <div className="col-sm-2">
              <LabeledInput label="Código:"
                disabled
                value={this.state.registro.cod_paciente}
                onChange={this.onChange.bind(this, 'cod_paciente')} />
            </div>

            <div className="col-sm-6">
              <LabeledInput label="Paciente:"
                value={this.state.registro.nome_paciente}
                onChange={this.onChange.bind(this, 'nome_paciente')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="Prontuário:"
                type="number"
                min="0"
                value={this.state.registro.nr_prontuario}
                onChange={this.onChange.bind(this, 'nr_prontuario')} />
            </div>

          </div>
        </div>
        {/* Linha */}

        {/* Linha */}
        <div className="row">
          <div className="row col-sm-12">

            <div className="col-sm-5">
              <ApiceComboEditPanel label="Convênio:"
                tabela="tab_convenio"
                chave="cod_convenio"
                desc="nome_convenio"
                colunas={getColunasConvenio()}
                value={this.state.registro.cod_convenio}
                onChange={e => this.onChange('cod_convenio', e.target.value)}
                ref={e => this.comboEditPanelConvenio = e}
                api={Api} />
            </div>

          </div>
        </div>
        {/* Linha */}

        <br />

        {/* ==================================================== ABAS ==================================================== */}
        {/* ============================================================================================================== */}

        <PageControl ref={e => this.aba = e}>
          <Aba key="abaDados" icone="building" label="Dados">

            {/* Linha */}
            <div className="row">
              <div className="row col-sm-12">

                <div className="col-sm-4">
                  <ApiceComboEditPanel label="Estado Civil:"
                    tabela="tab_estado_civil"
                    chave="cod_estado_civil"
                    desc="estado_civil"
                    colunas={getColunasEstadoCivil()}
                    value={this.state.registro.cod_estado_civil}
                    onChange={e => this.onChange('cod_estado_civil', e.target.value)}
                    ref={e => this.comboEditPanelEstCivil = e}
                    api={Api} />
                </div>

                <div className="col-sm-4">
                  <ApiceComboEditPanel label="Escolaridade:"
                    tabela="tab_escolaridade"
                    chave="cod_escolaridade"
                    desc="escolaridade"
                    colunas={getColunasEscolaridade()}
                    value={this.state.registro.cod_escolaridade}
                    onChange={e => this.onChange('cod_escolaridade', e.target.value)}
                    ref={e => this.comboEditPanelEscolaridade = e}
                    api={Api} />
                </div>

                <div className="col-sm-4">
                  <ApiceComboEditPanel label="Sexo:"
                    tabela="tab_sexo"
                    chave="cod_sexo"
                    desc="descricao"
                    colunas={getColunasSexo()}
                    value={this.state.registro.cod_sexo}
                    onChange={e => this.onChange('cod_sexo', e.target.value)}
                    ref={e => this.comboEditPanelSexo = e}
                    api={Api} />
                </div>

              </div>
            </div>
            {/* Linha */}

            {/* Linha */}
            <div className="row">
              <div className="row col-sm-12">

                <div className="col-sm-4">
                  <ApiceComboEditPanel label="Cidade:"
                    tabela="tab_cidade"
                    chave="cod_cidade"
                    desc="cidade"
                    colunas={getColunasCidade()}
                    value={this.state.registro.cod_cidade}
                    onChange={e => this.onChange('cod_cidade', e.target.value)}
                    ref={e => this.comboEditPanelCidade = e}
                    api={Api} />
                </div>

                <div className="col-sm-4">
                  <ApiceComboEditPanel label="Bairro:"
                    tabela="tab_bairro"
                    chave="cod_bairro"
                    desc="bairro"
                    colunas={getColunasBairro()}
                    value={this.state.registro.cod_bairro}
                    onChange={e => this.onChange('cod_bairro', e.target.value)}
                    ref={e => this.comboEditPanelBairro = e}
                    api={Api} />
                </div>

              </div>
            </div>
            {/* Linha */}

            {/* Linha */}
            <div className="row">
              <div className="row-sm-12">

                <div className="col-sm-4">
                  <LabeledInput label="Endereço:"
                    value={this.state.registro.endereco}
                    onChange={this.onChange.bind(this, 'endereco')} />
                </div>

                <div className="col-sm-3">
                  <InputMask label="Dt. Nascimento:"
                    data
                    value={this.state.registro.dt_nascimento}
                    onChange={this.onChange.bind(this, 'dt_nascimento')} />
                </div>

                <div className="col-sm-2">
                  <LabeledInput label="Idade:"
                    value={this.state.registro.idade_anos}
                    type="number"
                    min="0"
                    onChange={this.onChange.bind(this, 'idade_anos')} />
                </div>

                <div className="col-sm-3">
                  <InputCalc label="Altura:"
                    value={this.state.registro.altura}
                    onChange={this.onChange.bind(this, 'altura')} />
                </div>

              </div>
            </div>
            {/* Linha */}

            {/* Linha */}
            <div className="row">
              <div className="row-sm-12">

                <div className="col-sm-2">
                  <InputMask label="CPF:"
                    cpf
                    value={this.state.registro.cpf}
                    onChange={this.onChange.bind(this, 'cpf')} />
                </div>

                <div className="col-sm-2">
                  <LabeledInput label="RG:"
                    value={this.state.registro.rg}
                    onChange={this.onChange.bind(this, 'rg')} />
                </div>

                <div className="col-sm-2">
                  <InputMask label="CEP:"
                    cep
                    value={this.state.registro.cep}
                    onChange={this.onChange.bind(this, 'cep')} />
                </div>

                <div className="col-sm-3">
                  <InputMask label="Telefone:"
                    telefone
                    value={this.state.registro.telefone_1}
                    onChange={this.onChange.bind(this, 'telefone_1')} />
                </div>

                <div className="col-sm-3">
                  <InputMask label="Telefone:"
                    telefone
                    value={this.state.registro.telefone_2}
                    onChange={this.onChange.bind(this, 'telefone_2')} />
                </div>

              </div>
            </div>
            {/* Linha */}

            {/* Linha */}
            <div className="row">
              <div className="row-sm-12">

                <div className="col-sm-6">
                  <ApiceComboEditPanel label="Responsavel:"
                    tabela="tab_paciente"
                    chave="cod_paciente"
                    desc="nome_paciente"
                    colunas={getColunasResponsavel()}
                    value={this.state.registro.cod_responsavel}
                    onChange={e => this.onChange('cod_responsavel', e.target.value)}
                    ref={e => this.comboEditPanelResponsavel = e}
                    api={Api} />
                </div>

                <div className="col-sm-6">
                  <ApiceComboEditPanel label="Grau Parentesco:"
                    tabela="tab_grau_parentesco"
                    chave="cod_grau_parentesco"
                    desc="nome_grau_parentesco"
                    colunas={getColunasGrauParentesco()}
                    value={this.state.registro.cod_grau_parentesco}
                    onChange={e => this.onChange('cod_grau_parentesco', e.target.value)}
                    ref={e => this.comboEditPanelGrauParentesco = e}
                    api={Api} />
                </div>

              </div>
            </div>
            {/* Linha */}

            {/* Linha */}
            <div className="row">
              <div className="row-sm-12">

                <div className="col-sm-6">
                  <LabeledInput label="Profição Resp:"
                    value={this.state.registro.responsavel_profissao}
                    onChange={this.onChange.bind(this, 'responsavel_profissao')} />
                </div>

                <div className="col-sm-6">
                  <LabeledInput label="Email:"
                    value={this.state.registro.email}
                    onChange={this.onChange.bind(this, 'email')} />
                </div>

              </div>
            </div>
            {/* Linha */}

          </Aba>

          {/* ============================================================================================================== */}

          <Aba key="abaAnamnese" icone="medkit" label="Anamnese">

            {/* Linha */}
            <div className="row">
              <div className="row-sm-12">
                <InputTextArea className="col-sm-5"
                  label="Anamnese Paciente"
                  name=""
                  id=""
                  rows="8"
                  cols="30"
                  placeholder="Digite seu texto.."
                  value={this.state.registro.anamnese_paciente}
                  onChange={this.onChange.bind(this, 'anamnese_paciente')} />

              </div>
            </div>
            {/* Linha */}

          </Aba>
        </PageControl>

        {/* ============================================================================================================== */}
        {/* ==================================================== ABAS ==================================================== */}

        <strong>(*) Campo obrigatório</strong>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Cadastro tabela="tab_paciente"
          pk="cod_paciente"
          titulo="Cadastro de Paciente"
          subTitulo="Configure os seus Pacientes!"

          paginavel

          renderForm={this.renderForm.bind(this)}
          renderColunas={this.renderColunas.bind(this)}

          validar={this.validar.bind(this)}

          getMsgExcluir={this.getMsgExcluir.bind(this)}
          getRegistros={this.getRegistros.bind(this)}
          getRegistro={this.getRegistro.bind(this)}
          setRegistro={(item) => this.setState({ registro: item })}

          limparRegistro={this.limparRegistro.bind(this)}
          ref={e => this.cadastro = e} />
      </div>
    );
  }
}
