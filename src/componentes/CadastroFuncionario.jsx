import React from 'react';
import moment from 'moment';
import { toastr } from 'react-redux-toastr';

import Api from '../utils/Api.jsx';

import { RadioGroup, RadioButton } from '../lib_react_adminlte/componentes/RadioGroup.jsx';
import Checkbox from '../lib_react_adminlte/componentes/Checkbox.jsx';
import { Table, Column } from '../lib_react_adminlte/componentes/Table.jsx';
import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import ApiceComboEditPanel from '../lib_react_adminlte/componentes/ApiceComboEditPanel.jsx';
import { getColunasNivel, getColunasEmpresa } from '../lib_react_adminlte/common/Template';
import ModalMudarSenhaFunc from './ModalMudarSenhaFunc.jsx';
import Cadastro from './Cadastro.jsx';

import { PageControl, Aba } from '../lib_react_adminlte/componentes/Aba.jsx';
import ComboList from '../lib_react_adminlte/componentes/ComboList.jsx';

/**
 * Componente de cadastro de funcionário.
 */
export default class CadastroFuncionario extends React.Component {

  state = {
    registros: [],
    cidades: [],
    registro: this.getRegistroLimpo(),
    wherePesquisaNivel: '',
    wherePesquisaEmpresa: '',
    status_ativo: 'S',
    status_volta_primeiro: 'S',
    status_entra_agenda: 'N',
    status_estorna_agenda: 'N',
    status_permite_excluir_agendamento: 'S',
    status_imp_receita: 'N',
    status_imp_exame: 'N',
    status_imp_atestado: 'N',
    status_imp_diversos: 'N',
    status_imp_cabecalho: 'N',
    status_exibe_via_receita: 'S',
    status_troca_medicamento: 'N',
    status_visualiza_antes_imprimir: 'N',
  };

  componentDidMount() {
    /**
     * Retorna a Lista de Cidades para o Combo
     */
    this.getListaCidade();
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

  onTableActionClick(actionId) {
    if (actionId === 'mudar-senha') {
      this.modalMudarSenha.show();
    }
  }

  /**
   * Retorna a mensagem de confirmação ao excluir.
   */
  getMsgExcluir() {
    return `Tem certeza que deseja excluir o Funcionário: "
            ${this.state.registro.nome_funcionario}"?`;
  }

  /**
   * Retorna um registro limpo.
   */
  getRegistroLimpo() {
    return {
      cod_funcionario: null,
      cod_empresa: null,
      nome_funcionario: '',
      especialidade: '',
      usuario: '',
      senha: '',
      cod_cbo: '',
      tp_usuario: 1,
      status_ativo: 'S',
      status_volta_primeiro: 'S',
      status_entra_agenda: 'N',
      status_estorna_agenda: 'N',
      status_permite_excluir_agendamento: 'S',
      dt_cadastro: moment(new Date()).format('MM/DD/YYYY HH:mm'),
      status_imp_receita: 'N',
      status_imp_exame: 'N',
      status_imp_atestado: 'N',
      status_imp_diversos: 'N',
      status_imp_cabecalho: 'N',
      conselho_regional: 'CRM',
      conselho_regional_nr: '',
      conselho_regional_uf: '',
      cpf: '',
      unimed_cidade: null,
      unimed_nr: '',
      cod_nivel: null,
      tipo_atestado: 0,
      status_exibe_via_receita: 'S',
      status_troca_medicamento: 'N',
      recibo_sequencia: 0,
      status_visualiza_antes_imprimir: 'N',
      tp_documento: 0,
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
    const ret = await Api.getRegistrosPaginacaoCodNomeTabInner('funcionario', '', '', '', '', '', filtro);    
    if (!ret.status) {
      console.log('status ', ret);
      
      return toastr.error('Erro!',
        'Não foi possível buscar os Registros ->\n' + ret.erro.error_message);
    }
    this.setState({ registros:ret.dados });
    this.aba.setAbaSelecionada('abaConfig');
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
    novoRegistro.dt_cadastro = moment(this.state.registro.dt_cadastro).format('YYYY-MM-DD HH:mm');
    
    return novoRegistro;
  }

  /**
   * Limpa o registro atual.
   */
  limparRegistro() {
    this.setState({
      registro: this.getRegistroLimpo(),
      itemSelecionado: null,
    });

    if (this.comboEditPanelNivel) {
      this.comboEditPanelNivel.limparUltimoCodigoValidado();
    }
    
    if (this.comboEditPanelEmpresa) {
      this.comboEditPanelEmpresa.limparUltimoCodigoValidado();
    }
  }

  /**
   * Retorna a Lista de Conselho Regional Stática.
   */
  getListaConsRegional() {
    return [
      {
        nome: 'CRM',
        conselho_regional:'CRM',
      },
      {
        nome: 'CRO',
        conselho_regional:'CRO',
      },
      {
        nome: 'CREFITO',
        conselho_regional:'CREFITO',
      },
      {
        nome: 'CRAS',
        conselho_regional:'CRAS',
      },
      {
        nome: 'COREN',
        conselho_regional:'COREN',
      },
      {
        nome: 'CRF',
        conselho_regional:'CRF',
      },
      {
        nome: 'CRN',
        conselho_regional:'CRN',
      },
      {
        nome: 'CRP',
        conselho_regional:'CRP',
      },
      {
        nome: 'OUTROS',
        conselho_regional:'OUTROS',
      },
    ]
  }

  /**
   * Retorna as ações da tabela.
   */
  getTableActions() {
    return [
      {
        className: 'btn-primary',
        icone: 'fa-lock',
        label: 'Mudar senha',
        id: 'mudar-senha',
        disabled: !this.state.itemSelecionado,
        tipo: Table.ACAO_CABECALHO,
      },
    ];
  }

  /**
   * Renderiza as colunas que aparecerão no grid da listagem.
   */
  renderColunas() {
    return [
      <Column key={0} field="nome_funcionario"
                      style={{ width:150 + 'px' }} header="Funcionário" />,
      <Column key={1} field="usuario"
                      style={{ width:60 + 'px' }} header="Chave" />,
      <Column key={2} field="descricao"
                      style={{ width:60 + 'px' }} header="Nível" />,
      <Column key={3} field="tp_usuario_1"
                      style={{ width:60 + 'px' }} header="Tipo de Usuário" />,
      <Column key={4} field="status_ativo_1"
                      style={{ width:30 + 'px' }} header="Ativo?" />,
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

            <div className="col-sm-5">
              <RadioGroup title="Tipo de Usuário"
                          className="mt-10">
                  
                <div className="row">
                  <div className="col-sm-4 col-xs-4">
                    <RadioButton name="tp_usuario"
                                 text="Administrador"
                                 checked={this.state.registro.tp_usuario === 0}
                                 onChange={() => this.setState({ registro: { ...this.state.registro, tp_usuario: 0 } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tp_usuario"
                                 text="Médico"
                                 checked={this.state.registro.tp_usuario === 1}
                                 onChange={() => this.setState({ registro: { ...this.state.registro, tp_usuario: 1 } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tp_usuario"
                                 text="Recepção"
                                 checked={this.state.registro.tp_usuario === 2}
                                 onChange={() => this.setState({ registro: { ...this.state.registro, tp_usuario: 2 } })} />
                  </div>

                  <div className="col-sm-3 col-xs-3">                  
                    <RadioButton name="tp_usuario"
                                 text="Fornecedor"
                                 checked={this.state.registro.tp_usuario === 3}
                                 onChange={() => this.setState({ registro: { ...this.state.registro, tp_usuario: 3 } })} />
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="col-sm-3">
              <RadioGroup className="mt-10">
                <div className="flex">
                  <Checkbox checked={this.state.registro.status_volta_primeiro === 'S'}
                            onChange={e => this.onChange('status_volta_primeiro', e.target.checked ? 'S' : 'N')}
                            text="Volta exame ao 1º registro?" className="inline mr-10" />  
                </div>
                
                <div className="flex">
                  <Checkbox checked={this.state.registro.status_entra_agenda === 'S'}
                            onChange={e => this.onChange('status_entra_agenda', e.target.checked ? 'S' : 'N')}
                            text="Entra direto na agenda?" className="inline mr-10" />  
                </div>
                
                <div className="flex">
                  <Checkbox checked={this.state.registro.status_estorna_agenda === 'S'}
                            onChange={e => this.onChange('status_estorna_agenda', e.target.checked ? 'S' : 'N')}
                            text="Pode estornar a agenda?" className="inline mr-10" />  
                </div>
                
                <div className="flex">
                  <Checkbox checked={this.state.registro.status_permite_excluir_agendamento === 'S'}
                            onChange={e => this.onChange('status_permite_excluir_agendamento', e.target.checked ? 'S' : 'N')}
                            text="Pode excluir agendamento?" className="inline mr-10" />  
                </div>
              </RadioGroup>
            </div>

            <div className="col-sm-2">
              <RadioGroup className="mt-10">
                <div className="flex">
                  <Checkbox checked={this.state.registro.status_ativo === 'S'}
                            onChange={e => this.onChange('status_ativo', e.target.checked ? 'S' : 'N')}
                            text="ATIVO?" className="inline mr-10" />  
                </div>
              </RadioGroup>
            </div>

          </div>
        </div>

        {/* Linha 2 */}
        <div className="row">    
          <div className="row col-sm-12">

            <div className="col-sm-2">
              <LabeledInput label="Código:"
                            disabled
                            value={this.state.registro.cod_funcionario}
                            onChange={this.onChange.bind(this, 'cod_funcionario')} />
            </div>

            <div className="col-sm-4">
              <LabeledInput label="Nome:"
                            value={this.state.registro.nome_funcionario}
                            onChange={this.onChange.bind(this, 'nome_funcionario')} />
            </div>

            <div className="col-sm-2">
              <LabeledInput label="Chave:"
                            value={this.state.registro.usuario}
                            onChange={this.onChange.bind(this, 'usuario')} />
            </div>


            <div className="col-sm-4">
              <LabeledInput label="Código CBO:"
                            value={this.state.registro.cod_cbo}
                            onChange={this.onChange.bind(this, 'cod_cbo')} />
            </div>

          </div>
        </div>

        {/* Linha 3 */}
        <div className="row">    
          <div className="row col-sm-12">

            <div className="col-sm-6">
              <LabeledInput label="Especialidade:"
                            value={this.state.registro.especialidade}
                            onChange={this.onChange.bind(this, 'especialidade')} />
            </div>

            <div className="col-sm-6">
              <ApiceComboEditPanel label="Filial:"
                                   tabela="tab_empresa"
                                   chave="cod_empresa"
                                   desc="nome_fantasia"
                                   where={this.state.wherePesquisaEmpresa}
                                   colunas={getColunasEmpresa()}
                                   value={this.state.registro.cod_empresa}
                                   onChange={e => this.onChange('cod_empresa', e.target.value)}
                                   ref={e => this.comboEditPanelEmpresa = e}
                                   api={Api} />
            </div>

          </div>
        </div>

        <br/>

        {/* ==================================================== ABAS ==================================================== */}
        {/* ============================================================================================================== */}

        <PageControl ref={e => this.aba = e}>
          <Aba key="abaConfig" icone="cog" label="Configuração">

            {/* Linha 4 */}
            <div className="row">    
              <div className="row col-sm-12">

                <div className="col-sm-12">            
                  <RadioGroup title="Impressão"
                              className="mt-10">
                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_imp_receita === 'S'}
                                onChange={e => this.onChange('status_imp_receita', e.target.checked ? 'S' : 'N')}
                                text="Receita" className="inline mr-15" />  
                      
                      <Checkbox checked={this.state.registro.status_imp_exame === 'S'}
                                onChange={e => this.onChange('status_imp_exame', e.target.checked ? 'S' : 'N')}
                                text="Exame" className="inline mr-15" /> 
                      
                      <Checkbox checked={this.state.registro.status_imp_atestado === 'S'}
                                onChange={e => this.onChange('status_imp_atestado', e.target.checked ? 'S' : 'N')}
                                text="Atestado" className="inline mr-15" />  
                      
                      <Checkbox checked={this.state.registro.status_imp_diversos === 'S'}
                                onChange={e => this.onChange('status_imp_diversos', e.target.checked ? 'S' : 'N')}
                                text="Diversos" className="inline mr-15" />  
                                
                      <Checkbox checked={this.state.registro.status_imp_cabecalho === 'S'}
                                onChange={e => this.onChange('status_imp_cabecalho', e.target.checked ? 'S' : 'N')}
                                text="Imprime Cabeçalho e Rodapé" className="inline mr-15" />  
                    </div>
                  </RadioGroup>
                </div>

              </div>
            </div>
            
            {/* Linha 5 */}
            <div className="row">    
              <div className="row col-sm-12">

                <div className="col-sm-2">
                  <ComboList value={this.state.registro.conselho_regional}
                            lista={this.getListaConsRegional()}
                            campo='nome'
                            label='Cons. Regional:'
                            valor='conselho_regional'
                            onChange={this.onChange.bind(this, 'conselho_regional')} />
                </div>
                
                <div className="col-sm-3">
                  <LabeledInput label="Nr. do Cons Regional:"
                                value={this.state.registro.conselho_regional_nr}
                                onChange={this.onChange.bind(this, 'conselho_regional_nr')} />
                </div>
                
                <div className="col-sm-1">
                  <LabeledInput label="UF:"
                                value={this.state.registro.conselho_regional_uf}
                                onChange={this.onChange.bind(this, 'conselho_regional_uf')} />
                </div>
                
                <div className="col-sm-2">
                  <LabeledInput label="CPF:"
                                value={this.state.registro.cpf}
                                onChange={this.onChange.bind(this, 'cpf')} />
                </div>
                
                <div className="col-sm-2">
                  <ComboList value={this.state.registro.unimed_cidade}
                            lista={this.state.cidades}
                            campo='cidade'
                            label='Cidade Unimed:'
                            valor='cod_cidade'
                            onChange={this.onChange.bind(this, 'unimed_cidade')} />
                </div>
                
                <div className="col-sm-2">
                  <LabeledInput label="Nr. Unimed:"
                                value={this.state.registro.unimed_nr}
                                onChange={this.onChange.bind(this, 'unimed_nr')} />
                </div>

              </div>
            </div>
            
            {/* Linha 6 */}
            <div className="row">    
              <div className="row col-sm-12">

                <div className="col-sm-4">
                  <RadioGroup title="Tipo de Atestado"
                              className="mt-10">
                      
                    <div className="row">
                      <div className="col-sm-6 col-xs-6">
                        <RadioButton name="tipo_atestado"
                                    text="Genérico"
                                    checked={this.state.registro.tipo_atestado === 0}
                                    onChange={() => this.setState({ registro: { ...this.state.registro, tipo_atestado: 0 } })} />
                      </div>

                      <div className="col-sm-4 col-xs-4">                  
                        <RadioButton name="tipo_atestado"
                                    text="Padrão"
                                    checked={this.state.registro.tipo_atestado === 1}
                                    onChange={() => this.setState({ registro: { ...this.state.registro, tipo_atestado: 1 } })} />
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="col-sm-4">
                  <RadioGroup title="Tipo de Documento"
                              className="mt-10">
                      
                    <div className="row">
                      <div className="col-sm-6 col-xs-6">
                        <RadioButton name="tp_documento"
                                    text="Declaração"
                                    checked={this.state.registro.tp_documento === 0}
                                    onChange={() => this.setState({ registro: { ...this.state.registro, tp_documento: 0 } })} />
                      </div>

                      <div className="col-sm-4 col-xs-4">                  
                        <RadioButton name="tp_documento"
                                    text="Atestado"
                                    checked={this.state.registro.tp_documento === 1}
                                    onChange={() => this.setState({ registro: { ...this.state.registro, tp_documento: 1 } })} />
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="col-sm-3">
                  <RadioGroup className="mt-10">
                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_exibe_via_receita === 'S'}
                                onChange={e => this.onChange('status_exibe_via_receita', e.target.checked ? 'S' : 'N')}
                                text="Exibe via na Receita?" className="inline mr-10" />  
                    </div>
                    
                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_troca_medicamento === 'S'}
                                onChange={e => this.onChange('status_troca_medicamento', e.target.checked ? 'S' : 'N')}
                                text="Não permite troca de medicamento?" className="inline mr-10" />  
                    </div>
                    
                    <div className="flex">
                      <Checkbox checked={this.state.registro.status_visualiza_antes_imprimir === 'S'}
                                onChange={e => this.onChange('status_visualiza_antes_imprimir', e.target.checked ? 'S' : 'N')}
                                text="Exibe impressão antes de imprimir?" className="inline mr-10" />  
                    </div>              
                  </RadioGroup>
                </div>

              </div>
            </div>

            {/* Linha 7 */}
            <div className="row">    
              <div className="row col-sm-12">

                <div className="col-sm-2">
                  <LabeledInput label="Recibo Sequência:"
                                value={this.state.registro.recibo_sequencia}
                                onChange={this.onChange.bind(this, 'recibo_sequencia')} />
                </div>

                <div className="col-sm-8">
                  <ApiceComboEditPanel label="Nível (*):"
                                       tabela="tab_nivel"
                                       chave="cod_nivel"
                                       desc="descricao"
                                       where={this.state.wherePesquisaNivel}
                                       colunas={getColunasNivel()}
                                       value={this.state.registro.cod_nivel}
                                       onChange={e => this.onChange('cod_nivel', e.target.value)}
                                       ref={e => this.comboEditPanelNivel = e}
                                       api={Api} />
                </div>

              </div>
            </div>  

          </Aba>

        {/* ============================================================================================================== */}

          <Aba key="abaTipoDocumento" icone="book" label="Tipo Documento">
            <span>dfgsdfg</span>
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
        <Cadastro tabela="tab_funcionario"
                  pk="cod_funcionario"
                  titulo="Cadastro de Funcionário"
                  subTitulo="Configure os seus funcionários!"
                  
                  paginavel

                  tableSelecionavel
                  itemSelecionadoTable={this.state.itemSelecionado}
                  onSelecionarItemTable={e => this.setState({ itemSelecionado: e })}
                  onTableActionClick={this.onTableActionClick.bind(this)}

                  renderForm={this.renderForm.bind(this)}
                  renderColunas={this.renderColunas.bind(this)}

                  tableActions={this.getTableActions()}
                  getMsgExcluir={this.getMsgExcluir.bind(this)}
                  getRegistros={this.getRegistros.bind(this)}
                  getRegistro={this.getRegistro.bind(this)}
                  setRegistro={(item) => this.setState({ registro: item })}

                  limparRegistro={this.limparRegistro.bind(this)}
                  ref={e => this.cadastro = e} />

        <ModalMudarSenhaFunc titulo="Pesquisa de registros"
                              ref={e => this.modalMudarSenha = e} 
                              codFuncionario={this.state.itemSelecionado ? 
                              this.state.itemSelecionado.cod_funcionario : 0} />
      </div>
    );
  }
}
