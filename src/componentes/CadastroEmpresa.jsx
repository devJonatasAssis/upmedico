import React from 'react';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';

import Api from '../utils/Api.jsx';

import { RadioGroup, RadioButton } from '../lib_react_adminlte/componentes/RadioGroup.jsx';
import Checkbox from '../lib_react_adminlte/componentes/Checkbox.jsx';
import { Column } from '../lib_react_adminlte/componentes/Table.jsx';
import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import InputTextArea from '../lib_react_adminlte/componentes/InputTextArea.jsx';
import ApiceComboEditPanel from '../lib_react_adminlte/componentes/ApiceComboEditPanel.jsx';
import { getColunasFuncionario } from '../lib_react_adminlte/common/Template';
import Cadastro from './Cadastro.jsx';

import { PageControl, Aba } from '../lib_react_adminlte/componentes/Aba.jsx';
import ComboList from '../lib_react_adminlte/componentes/ComboList.jsx';

/**
 * Componente de cadastro de Empresa.
 */
export default class CadastroEmpresa extends React.Component {

  state = {
    registros: [],
    cidades: [],
    bairros: [],
    registro: this.getRegistroLimpo(),
    wherePesquisaUsuario: '',
    wherePesquisaConvenio: '',
    status_compartilha_paciente: 'N',
    status_traduzir: 'N',
    status_foto: 'N',
    status_agenda_nr_prontuario: 'S',
    status_dados_financeiros_ficha: 'S',
    tipo_agenda: 'H',
    status_atende_unimed: 'S',
    status_impressoras: 'N',
    unimed_login: 0,
  };

  componentDidMount() {
    /**
     * Retorna a Lista de Cidades para o Combo
     */
    this.getListaCidade();
    this.getListaBairro();
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
   * Retorna a mensagem de confirmação ao excluir.
   */
  getMsgExcluir() {
    return `Tem certeza que deseja excluir a Empresa: "
            ${this.state.registro.nome_fantasia}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_empresa: null,
      nome_fantasia: '',
      razao_social: '',
      nr_palheta_ativa: 1,
      cnpj: '',
      inscricao_estadual: '',
      status_compartilha_paciente: 'N',
      status_traduzir: 'N',
      status_foto: 'N',
      status_agenda_nr_prontuario: 'S',
      status_dados_financeiros_ficha: 'S',
      cod_usuario: null,
      codigo_cnes: '',
      endereco_filial: '',
      default_cidade: null,
      default_bairro: null,
      default_cep: '',
      telefone_filial: '',
      default_profissao: '',
      tipo_agenda: 'H',
      dados_extra: '',
      status_atende_unimed: 'S',
      cod_convenio: null,
      cidade_unimed: null,
      vr_ch: 0,
      unimed_usuario: '',
      unimed_senha: '',
      unimed_site_login: '',
      unimed_site_solicitacao: '',
      unimed_site_consulta1: '',
      unimed_site_consulta2: '',
      dt_expiracao: null,
      status_impressoras: 'N',
      cod_faturamento: 0,
      unimed_login: 0,
      cod_idioma: 0,
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
    const ret = await Api.getRegistrosPaginacaoCodNomeTab('empresa', 'nome_fantasia', 'cod_empresa', filtro);
    if (!ret.status) {      
      return toastr.error('Erro!',
        'Não foi possível buscar os Registros ->\n' + ret.erro.error_message);
    }
    
    this.setState({ registros:ret.dados });
    this.aba.setAbaSelecionada('abaFilial');
    return ret;
  }

  /**
   * Retorna a Lista de Cidades para o Combo
   */
  async getListaCidade() {
    const ret = await Api.getRegistrosCodNome('cod_cidade', 'cidade', 'tab_cidade'); 
    if (!ret.status) {
      console.log('status ', ret);
      
      return toastr.error('Erro!',
        'Não foi possível buscar os Registros ->\n' + ret.erro.error_message);
    }
    this.setState({ cidades: ret.dados });
  }

  /**
   * Retorna a Lista de Bairros para o Combo
   */
  async getListaBairro() {
    const ret = await Api.getRegistrosCodNome('cod_bairro', 'bairro', 'tab_bairro'); 
    if (!ret.status) {
      console.log('status ', ret);
      
      return toastr.error('Erro!',
        'Não foi possível buscar os Registros ->\n' + ret.erro.error_message);
    }
    this.setState({ bairros: ret.dados });
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
    novoRegistro.dt_expiracao = (this.state.registro.dt_expiracao ? 
                                moment(this.state.registro.dt_expiracao).format('YYYY-MM-DD HH:mm') :
                                null);
    return novoRegistro;
  }

  /**
   * Limpa o registro atual.
   */
  limparRegistro() {
    this.setState({
      registro: this.getRegistroLimpo(),
    });

    if (this.comboEditPanelUsuario) {
      this.comboEditPanelUsuario.limparUltimoCodigoValidado();
    }
    
    if (this.comboEditPanelConvenio) {
      this.comboEditPanelConvenio.limparUltimoCodigoValidado();
    }
  }

  /**
   * Renderiza as colunas que aparecerão no grid da listagem.
   */
  renderColunas() {
    return [
      <Column key={0} field="nome_fantasia"
                      style={{ width:150 + 'px' }} header="Empresa" />,
      <Column key={1} field="cnpj"
                      style={{ width:80 + 'px' }} header="CNPJ" />,
      <Column key={2} field="inscricao_estadual"
                      style={{ width:60 + 'px' }} header="Insc. Est." />,
      <Column key={3} field="endereco_filial"
                      style={{ width:120 + 'px' }} header="Endereço" />,
      <Column key={4} field="telefone_filial"
                      style={{ width:65 + 'px' }} header="Telefone" />,
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
                            value={this.state.registro.cod_empresa}
                            onChange={this.onChange.bind(this, 'cod_empresa')} />
            </div>

            <div className="col-sm-6">
              <LabeledInput label="Nome Fantasia:"
                            value={this.state.registro.nome_fantasia}
                            onChange={this.onChange.bind(this, 'nome_fantasia')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="CNPJ:"
                            type="number"
                            value={this.state.registro.cnpj}
                            onChange={this.onChange.bind(this, 'cnpj')} />
            </div>

          </div>
        </div>
        {/* Linha 1 */}

        {/* Linha 2 */}
        <div className="row">    
          <div className="row col-sm-12">

            <div className="col-sm-8">
              <LabeledInput label="Razão Social:"
                            value={this.state.registro.razao_social}
                            onChange={this.onChange.bind(this, 'razao_social')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="Nº Paleta Ativa:"
                            type="number"
                            value={this.state.registro.nr_palheta_ativa}
                            onChange={this.onChange.bind(this, 'nr_palheta_ativa')} />
            </div>

          </div>
        </div>
        {/* Linha 2 */}

        <br/>

        {/* ==================================================== ABAS ==================================================== */}
        {/* ============================================================================================================== */}

        <PageControl ref={e => this.aba = e}>
          <Aba key="abaFilial" icone="building" label="Filial">

            {/* Linha 3 */}
            <div className="row">    
              <div className="row col-sm-12">

                <div className="col-sm-4">
                  <RadioGroup className="mt-10">
                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_compartilha_paciente === 'S'}
                                onChange={e => this.onChange('status_compartilha_paciente', e.target.checked ? 'S' : 'N')}
                                text="Compart. Dados Paciente" className="inline mr-10" />  
                    </div>
                    
                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_traduzir === 'S'}
                                onChange={e => this.onChange('status_traduzir', e.target.checked ? 'S' : 'N')}
                                text="Traduzir o Sistema" className="inline mr-10" />  
                    </div>
                    
                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_foto === 'S'}
                                onChange={e => this.onChange('status_foto', e.target.checked ? 'S' : 'N')}
                                text="Foto" className="inline mr-10" />  
                    </div>
                    
                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_agenda_nr_prontuario === 'S'}
                                onChange={e => this.onChange('status_agenda_nr_prontuario', e.target.checked ? 'S' : 'N')}
                                text="Mostra Nº do Prontuário na Agenda?" className="inline mr-10" />  
                    </div>

                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_dados_financeiros_ficha === 'S'}
                                onChange={e => this.onChange('status_dados_financeiros_ficha', e.target.checked ? 'S' : 'N')}
                                text="Mostra Dados Financeiros na Ficha?" className="inline mr-10" />  
                    </div>
                    
                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_impressoras === 'S'}
                                onChange={e => this.onChange('status_impressoras', e.target.checked ? 'S' : 'N')}
                                text="Vários Tipos de Impressoras" className="inline mr-10" />  
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="col-sm-8">
                  <ApiceComboEditPanel label="Usuário - Único para Compartilhamento:"
                                       tabela="tab_funcionario"
                                       chave="cod_funcionario"
                                       desc="nome_funcionario"
                                       where={this.state.wherePesquisaUsuario}
                                       colunas={getColunasFuncionario()}
                                       value={this.state.registro.cod_usuario}
                                       onChange={e => this.onChange('cod_usuario', e.target.value)}
                                       ref={e => this.comboEditPanelUsuario = e}
                                       api={Api} />

                  <LabeledInput label="Código CNES:"
                                value={this.state.registro.codigo_cnes}
                                onChange={this.onChange.bind(this, 'codigo_cnes')} />
                </div>

              </div>
            </div>
            {/* Linha 3 */}

            {/* Linha 4 */}
            <div className="row">
              <div className="col-sm-12">

                <div className="col-sm-4">
                    <LabeledInput label="Endereço:"
                                  value={this.state.registro.endereco_filial}
                                  onChange={this.onChange.bind(this, 'endereco_filial')} />
                </div>

                <div className="col-sm-4">
                    <ComboList value={this.state.registro.default_cidade}
                              lista={this.state.cidades}
                              campo='cidade'
                              label='Cidade:'
                              valor='cod_cidade'
                              onChange={this.onChange.bind(this, 'default_cidade')} />
                </div>

                <div className="col-sm-4">
                    <ComboList value={this.state.registro.default_bairro}
                              lista={this.state.bairros}
                              campo='bairro'
                              label='Bairro:'
                              valor='cod_bairro'
                              onChange={this.onChange.bind(this, 'default_bairro')} />
                </div>

              </div>
            </div>
            {/* Linha 4 */}

            {/* Linha 5 */}
            <div className="row">
              <div className="col-sm-12">

                <div className="col-sm-2">
                    <LabeledInput label="CEP:"
                                  value={this.state.registro.default_cep}
                                  type="number"
                                  onChange={this.onChange.bind(this, 'default_cep')} />
                </div>

                <div className="col-sm-3">
                    <LabeledInput label="Telefone:"
                                  value={this.state.registro.telefone_filial}
                                  onChange={this.onChange.bind(this, 'telefone_filial')} />
                </div>

                <div className="col-sm-7">
                    <LabeledInput label="Profissão:"
                                  value={this.state.registro.default_profissao}
                                  onChange={this.onChange.bind(this, 'default_profissao')} />
                </div>

              </div>
            </div>
            {/* Linha 5 */}

            {/* Linha 6 */}
            <div className="row">
              <div className="col-sm-12">

                <div className="col-sm-12">
                  <RadioGroup title="Tipo de Agenda"
                              className="mt-10">
                      
                    <div className="row">
                      <div className="col-sm-6 col-xs-6">
                        <RadioButton name="tipo_agenda"
                                    text="Por Hora Marcada"
                                    checked={this.state.registro.tipo_agenda === 'H'}
                                    onChange={() => this.setState({ registro: { ...this.state.registro, tipo_agenda: 'H' } })} />
                      </div>

                      <div className="col-sm-6 col-xs-6">                  
                        <RadioButton name="tipo_agenda"
                                    text="Por Ordem de Chegada"
                                    checked={this.state.registro.tipo_agenda === 'O'}
                                    onChange={() => this.setState({ registro: { ...this.state.registro, tipo_agenda: 'O' } })} />
                      </div>
                      
                    </div>
                  </RadioGroup>
                </div>

              </div>
            </div>
            {/* Linha 6 */}

            {/* Linha 7 */}
            <div className="row">
              <div className="col-sm-12">
                <InputTextArea className="col-sm-5"
                                label="Dados Extra"
                                name=""
                                id="" 
                                rows="8"
                                cols="30"
                                placeholder="Digite seu texto.."
                                value={this.state.registro.dados_extra}
                                onChange={this.onChange.bind(this, 'dados_extra')} />
               
              </div>
            </div>
            {/* Linha 7 */}

          </Aba>
                  
        {/* ============================================================================================================== */}

          <Aba key="abaUnimed" icone="medkit" label="Unimed">

            {/* Linha 8 */}
            <div className="row">    
              <div className="row col-sm-12">

                <div className="col-sm-4">
                  <RadioGroup className="mt-10">
                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_atende_unimed === 'S'}
                                onChange={e => this.onChange('status_atende_unimed', e.target.checked ? 'S' : 'N')}
                                text="Atende pela Unimed?" className="inline mr-10" />  
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="col-sm-8">
                  <RadioGroup title="Tipo de Login no Sistema"
                              className="mt-10">
                      
                    <div className="row">
                      <div className="col-sm-6 col-xs-6">
                        <RadioButton name="unimed_login"
                                    text="Filial"
                                    checked={this.state.registro.unimed_login === '0'}
                                    onChange={() => this.setState({ registro: { ...this.state.registro, unimed_login: '0' } })} />
                      </div>

                      <div className="col-sm-6 col-xs-6">                  
                        <RadioButton name="unimed_login"
                                    text="Usuário"
                                    checked={this.state.registro.unimed_login === '1'}
                                    onChange={() => this.setState({ registro: { ...this.state.registro, unimed_login: '1' } })} />
                      </div>
                    </div>
                  </RadioGroup>
              </div>

              </div>
            </div>
            {/* Linha 8 */}

            {/* Linha 9 */}
            <div className="row">
              <div className="col-sm-12">

                <div className="col-sm-12">
                    <LabeledInput label="Usuário:"
                                  value={this.state.registro.unimed_usuario}
                                  onChange={this.onChange.bind(this, 'unimed_usuario')} />
                </div>
                
              </div>
            </div>
            {/* Linha 9 */}

            {/* Linha 10 */}
            <div className="row">
              <div className="col-sm-12">

                <div className="col-sm-12">
                    <LabeledInput label="Senha:"
                                  value={this.state.registro.unimed_senha}
                                  onChange={this.onChange.bind(this, 'unimed_senha')} />
                </div>
                
              </div>
            </div>
            {/* Linha 10 */}

            {/* Linha 11 */}
            <div className="row">
              <div className="col-sm-12">

                <div className="col-sm-12">
                    <LabeledInput label="Site - Login:"
                                  value={this.state.registro.unimed_site_login}
                                  onChange={this.onChange.bind(this, 'unimed_site_login')} />
                </div>
                
              </div>
            </div>
            {/* Linha 11 */}

            {/* Linha 12 */}
            <div className="row">
              <div className="col-sm-12">

                <div className="col-sm-12">
                    <LabeledInput label="Site - Solicitação:"
                                  value={this.state.registro.unimed_site_solicitacao}
                                  onChange={this.onChange.bind(this, 'unimed_site_solicitacao')} />
                </div>
                
              </div>
            </div>
            {/* Linha 12 */}

            {/* Linha 13 */}
            <div className="row">
              <div className="col-sm-12">

                <div className="col-sm-12">
                    <LabeledInput label="Site - Consulta 1:"
                                  value={this.state.registro.unimed_site_consulta1}
                                  onChange={this.onChange.bind(this, 'unimed_site_consulta1')} />
                </div>
                
              </div>
            </div>
            {/* Linha 13 */}

            {/* Linha 14 */}
            <div className="row">
              <div className="col-sm-12">

                <div className="col-sm-12">
                    <LabeledInput label="Site - Consulta 2:"
                                  value={this.state.registro.unimed_site_consulta2}
                                  onChange={this.onChange.bind(this, 'unimed_site_consulta2')} />
                </div>
                
              </div>
            </div>
            {/* Linha 14 */}

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
        <Cadastro tabela="tab_empresa"
                  pk="cod_empresa"
                  titulo="Cadastro de Empresa"
                  subTitulo="Configure os seus funcionários!"
                  
                  paginavel

                  renderForm={this.renderForm.bind(this)}
                  renderColunas={this.renderColunas.bind(this)}

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
