import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import Api from '../utils/Api';
import { inverteData } from '../utils/funcoesGenericas';

import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import InputMask from '../lib_react_adminlte/componentes/InputMask.jsx';
import { Column } from '../lib_react_adminlte/componentes/Table';
import InputTextArea from '../lib_react_adminlte/componentes/InputTextArea.jsx';
import { RadioGroup } from '../lib_react_adminlte/componentes/RadioGroup.jsx';
import Checkbox from '../lib_react_adminlte/componentes/Checkbox.jsx';
import Cadastro from './Cadastro';

/**
 */
class MovimentoAtendimento extends React.Component {

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
    return `Tem certeza que deseja excluir o Atendimento: "
            ${this.state.registro.cod_atendimento}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_atendimento: '',
      cod_medico: 0,
      cod_paciente: 0,
      cod_agenda: 0,
      dt_atendimento: '',
      dt_agendamento: '',
      status_atendido: 'N',
      anamnese_atendimento: '',
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
    const ret = await Api.getAtendimento(filtro, this.props.funcionario.cod_funcionario);
    if (!ret.status) {
      console.log('status ', ret);
      
      return toastr.error('Erro!',
        'Não foi possível buscar os Registros\n' + ret.erro.error_message);
    }
    for (const agenda of ret.dados) {
      (agenda.dt_agendamento) ?
      agenda.dt_agendamento = moment(new Date(agenda.dt_agendamento)).format('DD/MM/YYYY HH:mm') :
      null;
      (agenda.dt_atendimento) ?
      agenda.dt_atendimento = moment(new Date(agenda.dt_atendimento)).format('DD/MM/YYYY HH:mm') :
      null;
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
    const dtAgendamento = novoRegistro.dt_agendamento;
    (dtAgendamento) ? novoRegistro.dt_agendamento = inverteData(dtAgendamento, false) : dtAgendamento;
    const dtAtendimento = novoRegistro.dt_atendimento;
    (dtAtendimento) ? novoRegistro.dt_atendimento = inverteData(dtAtendimento, false) : dtAtendimento;
    return novoRegistro;
  }

  limparRegistro() {
    this.setState({
      registro: this.getRegistroLimpo(),
    });
  }

  async fecharAtendimento() { // Mecher
    await this.cadastro.getWrappedInstance().salvar(async (codCompra) => {
      console.log(codCompra);
      
      await Api.abrirFecharCompra(codCompra, 'S');
    });
  }

  /**
   * Renderiza as colunas que aparecerão no grid da listagem.
   */
  renderColunas() {
    return [
      <Column key={1} field="cod_atendimento"
                      style={{ width:60 + 'px' }} header="Código" />,
      <Column key={2} field="nome_paciente" 
                      style={{ width:150 + 'px' }} header="Paciente" />,
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
                            value={this.state.registro.cod_atendimento}
                            onChange={this.onChange.bind(this, 'cod_atendimento')} />
            </div>

            <div className="col-sm-8">
              <LabeledInput label="Paciente:"
                            disabled
                            value={this.state.registro.nome_paciente}
                            onChange={this.onChange.bind(this, 'nome_paciente')} />
            </div>

            <div className="col-sm-2">
              <RadioGroup className="mt-10">
                <div className="flex">
                  <Checkbox checked={this.state.registro.status_atendido === 'S'}
                            onChange={e => this.onChange('status_atendido', e.target.checked ? 'S' : 'N')}
                            text="Atendido" className="inline mr-10" />  
                </div>
              </RadioGroup>
            </div>

          </div>
        </div>
        {/* Linha */}

        {/* Linha */}
        <div className="row">
          <div className="row col-sm-12">
            <div className="col-sm-3">  
              <InputMask label="Dt. Agendamento:"
                         dataHora
                         disabled
                         value={this.state.registro.dt_agendamento}
                         onChange={this.onChange.bind(this, 'dt_agendamento')} />
            </div>

          </div>
        </div>
        {/* Linha */}

        {/* Linha */}
        <div className="row">
          <div className="col-sm-12">
            <InputTextArea className="col-sm-5"
                           label="Anamnese do Paciente "
                           name=""
                           id="" 
                           rows="8"
                           cols="30"
                           placeholder="Digite seu texto.."
                           value={this.state.registro.anamnese_atendimento}
                           onChange={this.onChange.bind(this, 'anamnese_atendimento')} />
            
          </div>
        </div>
        {/* Linha */}

      </div>
    );
  }

  render() {
    return (
      <Cadastro tabela="tab_atendimento"
        pk="cod_atendimento"
        titulo="Atendimento"
        subTitulo="Atendimento do Médico!"

        paginavel

        renderForm={this.renderForm.bind(this)}
        renderColunas={this.renderColunas.bind(this)}

        incluirDesabilitado
        excluirDesabilitado

        getMsgExcluir={this.getMsgExcluir.bind(this)}
        getRegistros={this.getRegistros.bind(this)}
        getRegistro={this.getRegistro.bind(this)}
        setRegistro={(item) => this.setState({ registro: item })}

        limparRegistro={this.limparRegistro.bind(this)}
        ref={e => this.cadastro = e} />
    );
  }
}

export default connect((state) => ({
  funcionario: state.funcionario,
}))(MovimentoAtendimento);
