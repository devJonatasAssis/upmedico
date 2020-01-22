import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import Api from '../utils/Api';
import { inverteData } from '../utils/funcoesGenericas';

import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import InputMask from '../lib_react_adminlte/componentes/InputMask.jsx';
import { Column } from '../lib_react_adminlte/componentes/Table';
import Cadastro from './Cadastro';
import ApiceComboEditPanel from '../lib_react_adminlte/componentes/ApiceComboEditPanel.jsx';
import { RadioGroup } from '../lib_react_adminlte/componentes/RadioGroup.jsx';
import Checkbox from '../lib_react_adminlte/componentes/Checkbox.jsx';
import { getColunasAgendaPaciente,
         getColunasAgendaMedico } from '../lib_react_adminlte/common/Template';

/**
 */
class MovimentoAgenda extends React.Component {

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
    return `Tem certeza que deseja excluir a Agenda: "
            ${this.state.registro.cod_agenda}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_agenda: null,
      cod_medico: 0,
      cod_paciente: 0,
      cod_funcionario_cadastro: 0,
      dt_cadastro: moment(new Date()).format('DD/MM/YYYY HH:mm'),
      dt_agendamento: null,
      status_atendido: 'N',
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
    const ret = await Api.getAgendamento(filtro);
    console.log(ret.dados);
    
    if (!ret.status) {
      console.log('status ', ret);
      
      return toastr.error('Erro!',
        'Não foi possível buscar os Registros\n' + ret.erro.error_message);
    }
    for (const agenda of ret.dados) {
      (agenda.dt_agendamento) ?
      agenda.dt_agendamento = moment(new Date(agenda.dt_agendamento)).format('DD/MM/YYYY HH:mm') :
      null;
      (agenda.dt_cadastro) ?
      agenda.dt_cadastro = moment(new Date(agenda.dt_cadastro)).format('DD/MM/YYYY HH:mm') :
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
    novoRegistro.dt_cadastro = inverteData(novoRegistro.dt_cadastro, false);
    novoRegistro.cod_funcionario_cadastro = this.props.funcionario.cod_funcionario;
    const dtAgendamento = novoRegistro.dt_agendamento;
    (dtAgendamento) ? novoRegistro.dt_agendamento = inverteData(dtAgendamento, false) : dtAgendamento;
    return novoRegistro;
  }

  limparRegistro() {
    this.setState({
      registro: this.getRegistroLimpo(),
    });
    
    if (this.comboEditPanelPaciente) {
      this.comboEditPanelPaciente.limparUltimoCodigoValidado();
    }
    if (this.comboEditPanelMedico) {
      this.comboEditPanelMedico.limparUltimoCodigoValidado();
    }
  }

  /**
   * Renderiza as colunas que aparecerão no grid da listagem.
   */
  renderColunas() {
    return [
      <Column key={1} field="cod_agenda"
                      style={{ width:60 + 'px' }} header="Código" />,
      <Column key={2} field="nome_paciente" 
                      style={{ width:150 + 'px' }} header="Paciente" />,
      <Column key={3} field="nome_medico" 
                      style={{ width:150 + 'px' }} header="Médico" />,
      <Column key={4} field="dt_agendamento" 
                      style={{ width:150 + 'px' }} header="Dt. Agendamento" />,
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
                            value={this.state.registro.cod_agenda}
                            onChange={this.onChange.bind(this, 'cod_agenda')} />
            </div>

            <div className="col-sm-4">
              <ApiceComboEditPanel label="Paciente:"
                                   tabela="tab_paciente"
                                   chave="cod_paciente"
                                   desc="nome_paciente"
                                   colunas={getColunasAgendaPaciente()}
                                   value={this.state.registro.cod_paciente}
                                   onChange={this.onChange.bind(this, 'cod_paciente')}
                                   api={Api}
                                   ref={e => this.comboEditPanelPaciente = e} />
            </div>

            <div className="col-sm-4">
              <ApiceComboEditPanel label="Médico:"
                                   tabela="tab_funcionario"
                                   chave="cod_funcionario"
                                   desc="nome_funcionario"
                                   where=" tp_usuario = 1 "
                                   colunas={getColunasAgendaMedico()}
                                   value={this.state.registro.cod_medico}
                                   onChange={this.onChange.bind(this, 'cod_medico')}
                                   api={Api}
                                   ref={e => this.comboEditPanelMedico = e} />
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
                         value={this.state.registro.dt_agendamento}
                         onChange={this.onChange.bind(this, 'dt_agendamento')} />
            </div>

          </div>
        </div>
        {/* Linha */}

      </div>
    );
  }

  render() {
    return (
      <Cadastro tabela="tab_agenda"
        pk="cod_agenda"
        titulo="Agenda"
        subTitulo="Configure a Agenda dos Médicos!"

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

export default connect((state) => ({
  funcionario: state.funcionario,
}))(MovimentoAgenda);
