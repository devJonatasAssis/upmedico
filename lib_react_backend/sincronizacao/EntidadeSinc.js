const dbUtils = require('../db_utils');

/**
 * Classe principal de todas as entidades que serão sincronizadas com o banco
 * de dados. Para uma entidade ser persistida no banco, ela deve herdar dessa
 * classe.
 * @see sincronizador.js
 */
module.exports = class EntidadeSinc {

  constructor(tabela) {
    this.tabela = tabela;
  }

  /**
   * Delete um registro da tabela com o id especificado.
   * @param {String|Number} id O Id da tabela.
   */
  static async excluir(id) {
    const instance = new this();
    const chave = instance.getFields().find(x => x.isPk).nome;
    return await dbUtils.query(`delete from ${instance.tabela} where ${chave} = ${id}`);
  }

  /**
   * Encontra e retorna o primeiro registro que bate com o campo e valor.
   * @param {String} campo O Nome do campo
   * @param {*} valor O Valor do campo 
   */
  static async findByField(campo, valor) {
    const instance = new this();
    return await dbUtils.queryFindOne(`
      select * from ${instance.tabela} where ${campo} = '${valor}'
    `);
  }

  /**
   * Salva o registro no banco de dados, caso ele já possua a chave
   * primária definida então ele é apenas atualizado.
   * @param {Object} registro O Registro a ser salvo.
   */
  static async salvar(registro) {
    const instance = new this();
    const chave = instance.getFields().find(x => x.isPk).nome;
    let id = registro[chave];
    if (registro[chave]) {
      // Já existe o id.
      await dbUtils.query(`update ${instance.tabela} set ? where ${chave} = ?`, 
        [registro, registro[chave]]);
    } else {
      // Não existe, vamos inserir
      const ret = await dbUtils.query(`insert into ${instance.tabela} set ?`, registro);
      id = ret.insertId;
    }
    return id;
  }

  /**
   * Retorna todos os registros da tabela.
   * @return {Array} Todos os registros.
   */
  static async findAll() {
    const instance = new this();
    return await dbUtils.query(`select * from ${instance.tabela}`);
  }

  /**
   * Encontra uma entidade pela chave primária.
   * @param {String|Number} id O Id da entidade.
   */
  static async findById(id) {    
    const instance = new this();
    const chave = instance.getFields().find(x => x.isPk).nome;
    return await this.findByField(chave, id);
  }

  /**
   * Encontra o primeiro registro no banco.
   */
  static async findFirst() {
    const instance = new this();
    return await dbUtils.queryFindOne(`select * from ${instance.tabela}`);
  }

  /**
   * @return {Field[]} Lista de fields com os tipos.
   */
  getFields() {
    // Filhos devem implementar
  }

  /**
   * @return {String[]} Os inserts padrões ao criar a tabela.
   */
  getDefaults() {
    // Filhos devem implementar
  }

  /**
   * @return {Field[]} Lista de fields com referencias.
   */
  getReferences() {
    // Filhos devem implementar
  }

  /**
   * Callback que será ativado depois que a entidade 
   * foi sincronizada com sucesso com o banco.
   */
  async onStart() {
    // Filhos devem implementar
  }

};
