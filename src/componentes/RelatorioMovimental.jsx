import React from 'react';

import RelatorioPersonalizado from '../relatorioPersonalizado';
import ContentWrapper from '../lib_react_adminlte/componentes/ContentWrapper.jsx';
import Button from '../lib_react_adminlte/componentes/Button.jsx';
import InputMask from '../lib_react_adminlte/componentes/InputMask.jsx';
import { RadioGroup, RadioButton } from '../lib_react_adminlte/componentes/RadioGroup.jsx';
import { inverteData } from '../utils/funcoesGenericas'

/**
 */
export default class RelatorioMovimental extends React.Component {

  state = {
    registro: {
      tabela: 'AGENDA',
      dt_inicio: '',
      dt_fim: '',
    },
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

  emitirRelatorio() {
    if (!this.state.registro.tabela) { return false; }

    const relatorio = new RelatorioPersonalizado();

    if (this.state.registro.tabela === 'AGENDA') {
      const inicio = inverteData(this.state.registro.dt_inicio);
      const fim = inverteData(this.state.registro.dt_fim);

      console.log(inicio, fim);
      

      relatorio.titulo = 'Agenda por Período';
      relatorio.sql = 'SELECT a.cod_agenda AS "Código", b.nome_paciente AS "Paciente", c.nome_funcionario AS Médico, ' +
                      'DATE_FORMAT(a.dt_agendamento, GET_FORMAT(DATE,"EUR")) "DT. Agendamento", ' +
                      'DATE_FORMAT(a.dt_agendamento, GET_FORMAT(TIME,"EUR")) "HR. Agendamento" ' +
                      'FROM tab_agenda a  ' +
                      'INNER JOIN tab_paciente b using(cod_paciente) ' +
                      'INNER JOIN tab_funcionario c ON a.cod_medico = c.cod_funcionario ' +
                      'WHERE a.dt_agendamento BETWEEN "' + inicio + '" AND "' + fim + '"';
      relatorio.larguras = [40, '*', '*', '*', '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'SEM') {
      
      relatorio.titulo = 'Agenda por Período';
      relatorio.sql = 'SELECT a.cod_agenda AS "Código", b.nome_paciente AS "Paciente", c.nome_funcionario AS Médico, ' +
                      'DATE_FORMAT(a.dt_agendamento, GET_FORMAT(DATE,"EUR")) "DT. Agendamento", ' +
                      'DATE_FORMAT(a.dt_agendamento, GET_FORMAT(TIME,"EUR")) "HR. Agendamento" ' +
                      'FROM tab_agenda a  ' +
                      'INNER JOIN tab_paciente b using(cod_paciente) ' +
                      'INNER JOIN tab_funcionario c ON a.cod_medico = c.cod_funcionario ' +
                      'WHERE 1=1 ';
      relatorio.larguras = [40, '*', '*', '*', '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    }
    relatorio.gerar();
  }

  renderForm() {
    return (
      <div>

        <div className="row">    
          <div className="row col-sm-12">

            <div className="col-sm-12">
              <RadioGroup title="Tipos"
                          className="mt-10">

                <div className="row">
                  <div className="col-sm-4 col-xs-3">
                    <RadioButton name="tabela"
                                 text="Agenda"
                                 checked={this.state.registro.tabela === 'AGENDA'}
                                 onChange={() => this.setState({ registro: { tabela: 'AGENDA' } })} />
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-sm-4 col-xs-3">
                    <RadioButton name="tabela"
                                 text="Sem Filtro"
                                 checked={this.state.registro.tabela === 'SEM'}
                                 onChange={() => this.setState({ registro: { tabela: 'SEM' } })} />
                  </div>
                </div>
                
              </RadioGroup>
            </div>

            <div className="col-sm-3">  
              <InputMask label="Dt. início:"
                         dataHora
                         value={this.state.registro.dt_inicio}
                         onChange={this.onChange.bind(this, 'dt_inicio')} />
            </div>

            <div className="col-sm-3">  
              <InputMask label="Dt. Fim:"
                         dataHora
                         value={this.state.registro.dt_fim}
                         onChange={this.onChange.bind(this, 'dt_fim')} />
            </div>

          </div>
        </div> 
        <br /><br />

        <div className="row">    
          <div className="row col-sm-12">

            <div>
              <Button className="mt-5 ml-5 btn-success"
              label="Gerar Relatório"
              onClick={this.emitirRelatorio.bind(this)}
              icon="fa-check" />
            </div>

          </div>
        </div> 

      </div>
    );
  }

  render() {
    return (
      <div className="h-100">
        <ContentWrapper title="Relatório Movimental"
                        small="Exiba seus Relatórios de Movimento" >
          {this.renderForm()}
        </ContentWrapper>
      </div>
    );
  }
  
}

