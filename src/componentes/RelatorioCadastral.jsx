import React from 'react';

import RelatorioPersonalizado from '../relatorioPersonalizado';
import ContentWrapper from '../lib_react_adminlte/componentes/ContentWrapper.jsx';
import Button from '../lib_react_adminlte/componentes/Button.jsx';
import { RadioGroup, RadioButton } from '../lib_react_adminlte/componentes/RadioGroup.jsx';

/**
 */
export default class RelatorioCadastral extends React.Component {

  state = {
    registro: {
      tabela: 'BAIRRO',
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
    console.log(this.state.registro);

    if (!this.state.registro.tabela) { return false; }

    const relatorio = new RelatorioPersonalizado();

    if (this.state.registro.tabela === 'BAIRRO') {

      relatorio.titulo = 'Bairro';
      relatorio.sql = 'SELECT a.cod_bairro AS "Código", a.bairro AS Bairro FROM tab_bairro a';
      relatorio.larguras = [100, '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'CIDADE') {

      relatorio.titulo = 'Cidade';
      relatorio.sql = 'SELECT a.cod_cidade AS "Código", a.cidade AS Cidade, b.estado AS Estado ' +
                      'FROM tab_cidade a INNER JOIN tab_estado b using(cod_estado)';
      relatorio.larguras = [100, '*', '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];
      
    } else if (this.state.registro.tabela === 'ESTADO') {

      relatorio.titulo = 'Estado';
      relatorio.sql = 'SELECT a.cod_estado AS "Código", a.estado AS Estado, a.sigla AS Sigla FROM tab_estado a';
      relatorio.larguras = [100, '*', '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'EMPRESA') {

      relatorio.titulo = 'Empresa';
      relatorio.sql = 'SELECT a.cod_empresa AS "Código", a.nome_fantasia AS Empresa, a.cnpj AS Cnpj FROM tab_empresa a';
      relatorio.larguras = [100, '*', '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'FUNC') {

      relatorio.titulo = 'Funcionário';
      relatorio.sql = 'SELECT a.cod_funcionario AS "Código", a.nome_funcionario AS "Funcionário", a.usuario AS Usuario FROM tab_funcionario a';
      relatorio.larguras = [100, '*', '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'GRAUPAR') {

      relatorio.titulo = 'Grau de Parentesco';
      relatorio.sql = 'SELECT a.cod_grau_parentesco AS "Código", a.nome_grau_parentesco AS "Grau de Parentesco" FROM tab_grau_parentesco a';
      relatorio.larguras = [100, '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'PACIENTE') {

      relatorio.titulo = 'Paciente';
      relatorio.sql = 'SELECT a.cod_paciente AS "Código", a.nome_paciente AS "Paciente", a.nr_prontuario AS Prontuario FROM tab_paciente a';
      relatorio.larguras = [100, '*', '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'SEXO') {

      relatorio.titulo = 'Tipo de Sexo';
      relatorio.sql = 'SELECT a.cod_sexo AS "Código", a.descricao AS "Tipo de Sexo" FROM tab_sexo a';
      relatorio.larguras = [100, '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'MEDICAMENTO') {

      relatorio.titulo = 'Medicamento';
      relatorio.sql = 'SELECT a.cod_medicamento AS "Código", a.nome_medicamento AS "Medicamento", a.posologia_1 AS Posologia FROM tab_medicamento a';
      relatorio.larguras = [100, '*', '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'EXAME') {

      relatorio.titulo = 'Exame';
      relatorio.sql = 'SELECT a.cod_exame AS "Código", a.nome_exame AS "Exame", a.codigo_amb AS AMB FROM tab_exame a';
      relatorio.larguras = [100, '*', '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'DIAGNOSTICO') {

      relatorio.titulo = 'Diagnostico';
      relatorio.sql = 'SELECT a.cod_diagnostico AS "Código", a.nome_diagnostico AS "Diagnostico" FROM tab_diagnostico a';
      relatorio.larguras = [100, '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'DOCUMENTO') {

      relatorio.titulo = 'Documento';
      relatorio.sql = 'SELECT a.cod_documento AS "Código", a.nome_documento AS "Documento" FROM tab_documento a';
      relatorio.larguras = [100, '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'CONVENIO') {

      relatorio.titulo = 'Convênio';
      relatorio.sql = 'SELECT a.cod_convenio AS "Código", a.nome_convenio AS "Convênio", a.registro_ans AS ANS FROM tab_convenio a';
      relatorio.larguras = [100, '*', '*'];
      // relatorio.apelidos = ['abhsahasas', 'ABC', 'BSAHASAS'];

    } else if (this.state.registro.tabela === 'PRODUTO') {

      relatorio.titulo = 'Produto';
      relatorio.sql = 'SELECT a.cod_produto AS "Código", a.nome_produto AS "Produto", a.estoque AS Estoque FROM tab_produto a';
      relatorio.larguras = [100, '*', '*'];
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
              <RadioGroup title="Tabela"
                          className="mt-10">
                  
                <div className="row">
                  <div className="col-sm-4 col-xs-3">
                    <RadioButton name="tabela"
                                 text="Bairro"
                                 checked={this.state.registro.tabela === 'BAIRRO'}
                                 onChange={() => this.setState({ registro: { tabela: 'BAIRRO' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Cidade"
                                 checked={this.state.registro.tabela === 'CIDADE'}
                                 onChange={() => this.setState({ registro: { tabela: 'CIDADE' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Estado"
                                 checked={this.state.registro.tabela === 'ESTADO'}
                                 onChange={() => this.setState({ registro: { tabela: 'ESTADO' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Empresa"
                                 checked={this.state.registro.tabela === 'EMPRESA'}
                                 onChange={() => this.setState({ registro: { tabela: 'EMPRESA' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Funcionário"
                                 checked={this.state.registro.tabela === 'FUNC'}
                                 onChange={() => this.setState({ registro: { tabela: 'FUNC' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Grau de Parentesco"
                                 checked={this.state.registro.tabela === 'GRAUPAR'}
                                 onChange={() => this.setState({ registro: { tabela: 'GRAUPAR' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Paciente"
                                 checked={this.state.registro.tabela === 'PACIENTE'}
                                 onChange={() => this.setState({ registro: { tabela: 'PACIENTE' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Sexo"
                                 checked={this.state.registro.tabela === 'SEXO'}
                                 onChange={() => this.setState({ registro: { tabela: 'SEXO' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Medicamento"
                                 checked={this.state.registro.tabela === 'MEDICAMENTO'}
                                 onChange={() => this.setState({ registro: { tabela: 'MEDICAMENTO' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Exame"
                                 checked={this.state.registro.tabela === 'EXAME'}
                                 onChange={() => this.setState({ registro: { tabela: 'EXAME' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Diagnóstico"
                                 checked={this.state.registro.tabela === 'DIAGNOSTICO'}
                                 onChange={() => this.setState({ registro: { tabela: 'DIAGNOSTICO' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Documento"
                                 checked={this.state.registro.tabela === 'DOCUMENTO'}
                                 onChange={() => this.setState({ registro: { tabela: 'DOCUMENTO' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Convênio"
                                 checked={this.state.registro.tabela === 'CONVENIO'}
                                 onChange={() => this.setState({ registro: { tabela: 'CONVENIO' } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tabela"
                                 text="Produto"
                                 checked={this.state.registro.tabela === 'PRODUTO'}
                                 onChange={() => this.setState({ registro: { tabela: 'PRODUTO' } })} />
                  </div>

                </div>
              </RadioGroup>
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
        <ContentWrapper title="Relatório Cadastral"
                        small="Exiba seus Relatórios Cadastrais" >
          {this.renderForm()}
        </ContentWrapper>
      </div>
    );
  }
  
}

