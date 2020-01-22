import axios from 'axios';
import Cookies from './Cookies.jsx';
import BackendSearch from './BackendSearch.jsx';

export default class GenericApi {

  /**
   * Valida e preencha o cookie no cabeçalho padrão
   * do axios.
   */
  static validarCookie() {
    const cookie = this.getCookieName ? this.getCookieName() : global.app.cookie;
    if (Cookies.get(cookie)) {
      axios.defaults.headers.token = Cookies.get(cookie);
    }
  }

  /**
   * Realiza um post na url informada no constructor na rota
   * especificada e com os parâmetros especificados, o token do cookie
   * já é colocado automaticamente no header do post.
   */
  static async post(rota, params) {
    this.validarCookie();
    const res = await axios.post((this.getUrl ? this.getUrl() : global.app.urlApi) + rota, { ...params });
    return res.data;
  }

  /**
   * Realiza um get na url informada no constructor na rota
   * especificada e com os parâmetros especificados, o token do cookie
   * já é colocado automaticamente no header do get.
   */
  static async get(rota) {
    this.validarCookie();
    const res = await axios.get((this.getUrl ? this.getUrl() : global.app.urlApi) + rota);
    return res.data;
  }

  /**
   */
  static async getConfigs(tabelas) {
    return await this.post('/get_configs', { tabelas });
  }

  /**
   */
  static async setConfigs(dados) {
    return await this.post('/set_configs', { dados });
  }

  /**
   * Realiza um ping no servidor para validar a auth.
   */
  static async validarAuth() {
    return await this.get('/validar_auth');
  }

  /**
   * Realiza um post para salvar uma entidade no backend.
   */
  static async salvar(tabela, nomePk, entidade) {
    return await this.post('/salvar', { tabela, nomePk, entidade });
  }

  /**
   * Exclui uma entidade no banco de dados do backend.
   */
  static async excluir(tabela, nomePk, entidade) {
    return await this.post('/excluir', { tabela, nomePk, entidade });
  }

  /**
   * Busca uma entidade pela tabela e filtro passado
   */
  static async buscar(tabela, filtro, extraWhere) {
    return await this.post('/buscar', { tabela, filtro, extraWhere });
  }

  /**
   * Busca uma entidade pela tabela, é passado
   * uma chamada encadeada da classe BackendSearch.
   */
  static buscar2(tabela, alias) {
    return new BackendSearch(tabela, this, alias);
  }

  /**
   * Executa uma query do papito.
   * @param {string} query A Query do papito.
   */
  static papito(query) {
    return this.post('/papito_query', { query });
  }

  /**
   * Verifica se existe um registro anterior e posterior à
   * um registro específico da tabela
   */
  static async verificarRegistrosAntProx(tabela, nomePk, id) {
    return await this.post('/verificar_registros_ant_prox', { tabela, nomePk, id });
  }

}
