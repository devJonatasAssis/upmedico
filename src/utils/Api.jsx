import GenericApi from '../lib_react_frontend/utils/GenericApi.jsx';

export default (class Api extends GenericApi {

  static getUrl() {
    // const url = 'http://fvsemearte-com-br.umbler.net';
    // const env = require('./env');
    // const url = 'http://' + env.ip + ':' + env.portExpress; //window.location.hostname;
    const url = 'http://localhost:1000'; // Matheus
    return (url);
  }

  static getCookieName() {
    return 'sistema_medico_auth';
  }

  /**
   * Realiza o login no sistema
   * @param {string} login O usuário.
   * @param {string} senha A Senha.
   */
  static async login(login, senha) {
    return await super.post('/login', { login, senha });
  }

  static async mudarSenhaFuncionario(codFuncionario, novaSenha)  {
    return await super.post('/mudar_senha_funcionario', { codFuncionario, novaSenha });
  }

 /**
 * @param {string} tabela O Nome da Tabela para o from
 * @param {string} whereLike O seu Where para compor o Like
 * @param {string} orderBy O Order By para ordenação dos registros
 * @param {string} tabelaInner O Nome da Tabela para a União
 * @param {string} usingInner O Código de referencia da União
 * @param {string} colunasInner As colunas da segunda tabela
 */
  static async getRegistrosPaginacaoCodNomeTabInner(tabela, whereLike, orderBy, tabelaInner, usingInner, colunasInner, filtro)  {
    return await super.post('/get_registros_paginacao_cod_nome_tab_inner', { tabela, whereLike, orderBy, tabelaInner, usingInner, colunasInner, filtro });
  }
    
/**
 * @param {string} tabela O Nome da Tabela para o from
 * @param {string} whereLike O seu Where para compor o Like
 * @param {string} orderBy O Order By para ordenação dos registros
 */
  static async getRegistrosPaginacaoCodNomeTab(tabela, whereLike, orderBy, filtro)  {
    return await super.post('/get_registros_paginacao_cod_nome_tab', { tabela, whereLike, orderBy, filtro });
  }

/**
 * @param {string} codigo O Nome do campo no banco referente ao Código
 * @param {string} nome O Nome do campo no banco referente ao Nome
 * @param {string} tabela O Nome da Tabela para pesquisa
 */
  static async getRegistrosCodNome(codigo, nome, tabela)  {
    return await super.post('/registros_codigo_nome', { codigo, nome, tabela });
  }

  static async getCompraItens(codCompra)  {
    return await super.post('/get_compra_itens', { codCompra });
  }

  static async abrirFecharCompra(codCompra, status, itens)  {
    return await super.post('/abrir_fechar_compra', { codCompra, status, itens });
  }

  static async produtoCompra(codProduto)  {
    return await super.post('/produto_compra', { codProduto });
  }

  static async getAgendamento()  {
    return await super.post('/get_agendamento', {  });
  }

  static async getAtendimento(filtro, codMedico)  {
    return await super.post('/get_atendimento', { filtro, codMedico });
  }

  static async validaPaciente(codPaciente)  {
    return await super.post('/valida_paciente', { codPaciente });
  }


/**
 * @param {string} nome O Nome da Query Ex: CadastroAlgumaCoisa
 * @param {string} filtro Objeto de Filtros
 */
static async getPaisEFilhos(nome, filtro = {})  {
  return await super.post('/get_pais_filhos', { nome, filtro });
}

  /**
   * Gera o hash de disp mov com base nesse produto.
   * @param {string} payload Um Id único para gerar o disp mov para não se repetir.
   */
  static async gerarDispMov(payload) {
    return await super.post('/gerar_disp_mov', { payload });
  }

  static async getProdutosCardapio(codGrupoProduto, limit) {
    return await
    super.get(`/produtos_cardapio?cod_grupo_produto=${codGrupoProduto}&limit=${limit}`);
  }

  static async gerarRelatorio(atributos) {
    return await super.post('/gerar_relatorio', { atributos });
  }

  static async desativarAtivarPadrao(tabela, id, nome)  {
    return await super.post('/desativar_ativar_padrao', { tabela, id, nome });
  }

  static async getConfigCampos(tabela)  {
    return await super.get(`/config_campos?tabela=${tabela}`);
  }

  static async getGrupoProdutoExtras(codigo)  {
    return await super.post('/get_grupo_produto_extras', { codigo });
  }

  static async setGrupoProdutoExtras(codGrupoProduto, extras)  {
    return await super.post('/set_grupo_produto_extras', { codGrupoProduto, extras });
  }


  static async getVendasGrupos(cod_grupo) {
    return await super.post('/get_vendas_grupos', { cod_grupo });
  }
  static async getValoresDate(startDate, endDate) {
    return await super.post('/get_valores_data', { startDate, endDate });
  }
  static async limpaVencimentos() {
    return await super.post('/limpa_vencimentos');
  }
});
