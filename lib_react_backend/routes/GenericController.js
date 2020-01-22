const dbUtils       = require('../db_utils');
const Papito        = require('../Papito')

/**
 * Classe do controlador genérico da aplicação, aqui ficam os métodos que as
 * rotas genéricas utilizam, é recomendado que os controladores específicos
 * herdem dessa classe e sobrescrevam os métodos ao invés de criar seus
 * próprios métodos sem relação com esses.
 */
module.exports = (class GenericController { 
  
  /**
   * Método de salvar genérico de uma entidade.
   * @param {string} tabela A tabela para salvar no banco
   * @param {string} pk O Nome do campo de chave primaria na tabela
   * @param {object} entidade O Objeto de entidade para ser salvo.
   */
  async salvar(tabela, pk, entidade, connection) {
    if (entidade[pk]) {
      // Se chegou até aqui é porque o registro existe, então vamos atualizar ele
      await dbUtils.query('update ' + tabela + ' set ? where ' + pk + ' = ? ', 
                          [entidade, entidade[pk]], connection);
    } else {
      // Não existe no banco, insere ele e seta o id para retornar!
      const ret = await dbUtils.query('insert into ' + tabela + ' set ?', [entidade], connection);
      if (ret && ret.insertId) {
        entidade[pk] = ret.insertId;
      }
    }
    return entidade[pk];
  }

  // ======================================

  /**
   * Recupera as configurações do ERP em massa.
   * @param {array} tabelas Um array de nomes das configs.
   */
  async getConfigs(tabelas) {
    const dados = {};
    for (const tabela of tabelas) {
      const ret = await dbUtils.query(`select * from ${tabela}`);
      dados[tabela] = ret[0];
    }
    return dados;
  } 

  // ======================================

  /**
   * Atualiza as configurações do sistema em massa.
   * @param {obj} configs Um objeto de configurações cujo cada chave é o nome da tabela
   *                      de configurações do ERP, e os valores do objeto são os campos.
   */
  async setConfigs(configs) {
    for (const config in configs) {
      if (configs.hasOwnProperty(config)) {
        await dbUtils.query('update ' + config + ' set ?', configs[config]);
      }
    }
  } 

  // ======================================

  /**
   * Verifica se existe um registro anterior e posterior à 
   * um registro específico da tabela
   */
  async verificarRegistrosAntProx(tabela, nomePk, id) {
    const ret = await dbUtils.query(`
      select * from ${tabela} 
        where ${nomePk} < "${id}" 
        and dt_hr_exclusao is null 
        order by id desc limit 1
    `);
    const ret2 = await dbUtils.query(`
      select * from ${tabela} 
        where ${nomePk} > "${id}" 
        and dt_hr_exclusao is null
        order by id limit 1
    `);

    return {
      ant: ret ? ret[0] : null,
      prox: ret2 ? ret2[0] : null,
    };
  }

  // ======================================

  /**
   * Realiza uma busca no banco de dados
   * @param {string} query O Nome da query
   * @param {string} filtro O Filtro
   * @param {string} where Where  
   */
  async buscar(query, filtro, where) {
    if (query === 'apice-combo-edit-query') {
      const tabela = filtro.tabela;
      const chave = filtro.chave;
      const desc = filtro.desc;
      return await dbUtils.queryFindOne(`
        select ${desc} from ${tabela} 
        where ${chave} = ${filtro.codigo}
          ${filtro.vendedor ? ' and id_vendedor = ' + filtro.vendedor : ''}
      `);
    }

    const ret = await dbUtils.query(`
      select * from ${query} where 1 = 1 
      ${where ? ' and ' + where : ''}
    `);
    return ret;
  }

  // ======================================

  /**
   * Realiza uma busca no banco de dados.
   * @param {string} entity O Nome da tabela
   * @param {string} fields Os campos
   * @param {string} includes Os joins
   * @param {string} filters Os wheres
   */
  async buscar2(entity, fields, includes, filters, alias) {
    let query = 'select ';

    for (const field of fields) {
      query += `${field}, `;
    }
    query = query.substring(0, query.length - 2);
    query += ` from ${entity.replace(/\s*/g, '')} ${alias || ''}`;

    for (const i of includes) {
      query += `\nleft join ${i.entity} ${i.alias || ''} on 
              ${i.alias || i.entity}.${i.field1} = ${alias || entity}.${i.field2}`;
    }

    if (filters && filters.length > 0) {
      query += '\nwhere 1 = 1 ';
      for (const filter of filters) {
        let filtro;
        switch (filter.condition.toLowerCase()) {
          case 'like': filtro = ` like '%${filter.value}%'`; break;
          default: filtro = `= '${filter.value}'`;
        }
        query += `\nand ${filter.field} ${filtro}`;
      }
    }
    /**/
      if (entity === 'tab_metas_fc') {
        query += 'order by status_meta';
      }

    return await dbUtils.query(query);
  }

  // ======================================

  /**
   * Método padrão de excluir. 
   */
  async excluir(tabela, pk, entidade) {
    await dbUtils.query('delete from ' + tabela + ' where ' + pk + ' = "' + entidade[pk] + '"');
  }

  // ======================================

  /**
   * Realiza uma busca complexa no banco de dados utilizando 
   * o padrão de query papito.   
    tab_funcionario {
      nome_funcionario,
      opt tab_nivel cod_nivel ($nome_nivel like '%a%') {
        nome_nivel,
      },
      tab_perfil_mobile cod_perfil_mobile {
        nome_perfil_mobile,
      },
      tab_funcionario cod_funcionario {
        codigo_perfil,
      },
    },
   */
  async handlePapitoQuery(query) {
    const papito = new Papito();
    const data = papito.transform(query);
    const ret = await dbUtils.query(data.value);
    if (data.type === 'find') {
      return papito.buildToObjects(ret);
    }
  }

});
