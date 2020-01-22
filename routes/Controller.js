const GenericController = require('../lib_react_backend/routes/GenericController');
const Errors            = require('../Errors');
const dbUtils           = require('../lib_react_backend/db_utils');
const apiceAuth         = require('../lib_react_backend/apice_auth');

/**
 * Classe do controlador específico dessa aplicação.
 */
module.exports = (class Controller extends GenericController {

/**
 * Realiza o login no sistema, sobe um erro se o login/senha está errado.
 * @param {string} login o login do usuário
 * @param {senha} senha a senha do cara
 */
async login(login, senha) {
  // Passa a senha para maiusculo:
  senha = senha.toUpperCase();

  // Primeiro vamos validar o login e se ele existe:
  let ret = await dbUtils.query(`
    select * from tab_funcionario where usuario = "${login}"
  `);

  if (!ret || !ret.length) {
    // Não tem usuario com essa chave:
    throw Errors.USUARIO_NAO_ENCONTRADO(login);
  }

  // =======
  // Agora vamos validar a senha:
  const cod_funcionario = ret[0].cod_funcionario;
  ret = await dbUtils.query(`select a.*, senha = md5("${senha}") as correto
                              from tab_funcionario a where cod_funcionario = '${cod_funcionario}'`);

  let senhaErrada = !ret[0].correto;
  if (!ret[0].senha && !senha) {
    // Se a senha do cara está vazia assim como a senha do usuario no banco, deixa passar
    senhaErrada = false;
  }

  if (senhaErrada) {
    // Não tem usuario com essa chave e login:
    throw Errors.SENHA_INCORRETA();
  }

  // Se chegamos até aqui é porque o usuário está com a senha e login correto,
  // então vamos gerar e mandar pra ele o token de autenticação:
  const token = apiceAuth.putToken(ret[0]);

  const usuario = ret[0];
  delete usuario.correto; // A validação

  // Passando as config de nivel do usuario
  const nivel = await dbUtils.queryFindOne(`
    select a.*  from tab_nivel a
    left join tab_funcionario b using(cod_nivel)
    where b.cod_funcionario = '${usuario.cod_funcionario}'
  `);
  
  usuario.configs = nivel;

  return {
    token,
    usuario,
  };
}

// ==================================================================================

/**
 * @param {string} codigo O Nome do campo no banco referente ao Código
 * @param {string} nome O Nome do campo no banco referente ao Nome
 * @param {string} tabela O Nome da Tabela para pesquisa
 */
async getRegistrosCodNome(codigo, nome, tabela) {
  return await dbUtils.query(`
    SELECT
    ${codigo},
    ${nome}
    from ${tabela}
  `);
  throw Errors.ENTIDADE_COM_ID_NAO_ENCONTRADA(tabela, codigo);
}

// ==================================================================================

/**
 * @param {string} nome O Nome da Query Ex: CadastroAlgumaCoisa
 * @param {string} filtro Objeto de Filtros
 */
async getPaisEFilhos(nome, filtro) {  
  if ( nome === 'Funcionarios' ) {
    const ret = await dbUtils.query(`
      SELECT
      a.*
      FROM tab_funcionario a
    `);
    for (const f of ret) {
      f.lista = await dbUtils.query(`
        SELECT
        a.*
        FROM tab_empresa a
        where a.cod_funcionario = ${f.cod_funcionario}
      `);
    }
    return ret;
  }
 }

// ==================================================================================

/**
 * @param {string} tabela O Nome da Tabela para o from
 * @param {string} whereLike O seu Where para compor o Like
 * @param {string} orderBy O Order By para ordenação dos registros
 */
async getRegistrosPaginacaoCodNomeTab(tabela, whereLike, orderBy, filtro) {
  // 0 50
  // 50, 100
  const idBetween = (filtro.de || filtro.ate) ? `
  LIMIT ${filtro.de}, ${filtro.ate - filtro.de} ` : '';
  
  return await dbUtils.query(`
	SELECT
	a.*
	FROM tab_${tabela} a
	WHERE a.${whereLike} LIKE '%${filtro.filtroStr || ''}%'
	ORDER BY ${orderBy}
	${filtro.filtroStr ? '' /* Se tem filtro traz tudo */ : idBetween}
  `);
 }

// ==================================================================================

 /**
 * @param {string} tabela O Nome da Tabela para o from
 * @param {string} whereLike O seu Where para compor o Like
 * @param {string} orderBy O Order By para ordenação dos registros
 * @param {string} tabelaInner O Nome da Tabela para a União
 * @param {string} usingInner O Código de referencia da União
 * @param {string} colunasInner As colunas da segunda tabela
 */
async getRegistrosPaginacaoCodNomeTabInner(tabela, whereLike, orderBy, tabelaInner, usingInner, colunasInner, filtro) {
  // 0 50
  // 50, 100
  const idBetween = (filtro.de || filtro.ate) ? `
  LIMIT ${filtro.de}, ${filtro.ate - filtro.de} ` : '';
 
  if (tabela === 'funcionario') {
    return await dbUtils.query(`
      SELECT
        a.*,
        CASE   
          WHEN a.tp_usuario = 0 THEN 'ADMINISTRADOR'
          WHEN a.tp_usuario = 1 THEN 'MEDICO'
          WHEN a.tp_usuario = 2 THEN 'RECEPÇÃO'
          WHEN a.tp_usuario = 3 THEN 'FORNECEDOR'
        END tp_usuario_1,
        IF(a.status_ativo = 'S', 'SIM', 'NÃO') status_ativo_1,
        b.descricao
      FROM tab_funcionario a
      LEFT JOIN tab_nivel b using(cod_nivel)
      WHERE a.nome_funcionario LIKE '%${filtro.filtroStr || ''}%'
      ORDER BY cod_funcionario
      ${filtro.filtroStr ? '' /* Se tem filtro traz tudo */ : idBetween}
    `);
  } else { 
      return await dbUtils.query(`
        SELECT
          a.*, b.${colunasInner}
        FROM tab_${tabela} a
        INNER JOIN tab_${tabelaInner} b using(${usingInner})
        WHERE a.${whereLike} LIKE '%${filtro.filtroStr || ''}%'
        ORDER BY ${orderBy}
        ${filtro.filtroStr ? '' /* Se tem filtro traz tudo */ : idBetween}
      `);
    }
}

// ==================================================================================

async getConfigCampos(tabela) {
  const ret = await dbUtils.query(`
    select * from tab_config_campos
    where table_name = '${tabela}'
  `);
  const dados = {};
  for (const r of ret) {
    if (r.status_exibir === 'S') {
      dados[r.field_name] = true;
    }
  }
  return dados;
}

// ==================================================================================

/**
 * @param {string|number} codigo O Código do registro.
 */
async desativarAtivarPadrao(tabela, codigo, nome) {
  const registro = await dbUtils.queryFindOne(
      ' select * from tab_' + tabela +
      ' where cod_' + tabela + ' = ?', codigo);
  if (registro) {
    registro.status_ativo = registro.status_ativo === 'S' ? 'N' : 'S';

    if (registro.status_ativo === 'N') {
      registro[nome] = 'ZZZ ' + String(registro[nome]).trim();
    } else {
      registro[nome] = registro[nome].replace(/ZZZ/g, '').trim();
    }

    await dbUtils.query(
          'update tab_' + tabela + ' set ? ' +
          ' where cod_' + tabela + ' = ?', [registro, codigo]);
    return;
  }
  throw Errors.ENTIDADE_COM_ID_NAO_ENCONTRADA(tabela, codigo);
}

// ==================================================================================

async mudarSenhaFuncionario(codFuncionario, novaSenha) {
  novaSenha = novaSenha.toUpperCase();
  await dbUtils.query(`
    update tab_funcionario set senha = md5('${novaSenha}')
      where cod_funcionario = "${codFuncionario}"
  `);
}

// ==================================================================================

async getCompraItens(codCompra) {
  const dados = await dbUtils.query(`
    SELECT a.*, b.nome_produto FROM tab_compra_item a
    INNER JOIN tab_produto b USING(cod_produto)
    WHERE cod_compra = "${codCompra}"
  `);
  return dados;
}

// ==================================================================================

async abrirFecharCompra(codCompra, status, itens) {
  await dbUtils.query(`
    UPDATE tab_compra SET status_fechado = "${status}",
    ${(status === 'S') ? 'dt_fechamento = NOW()' : 'dt_fechamento = NULL'}
    WHERE cod_compra = "${codCompra}"
  `);

  if (itens) {
    for (const item of itens) {
      await dbUtils.query('update tab_produto set estoque = estoque + ? where cod_produto = ?', [item.qtde_item, item.cod_produto]);
    }
  }
}

// ==================================================================================

async produtoCompra(codProduto) {
  const produto = await dbUtils.queryFindOne(`
    SELECT * FROM tab_produto WHERE cod_produto = ${codProduto}
  `);
  return produto;
}

// ==================================================================================

async getAgendamento() {
  const agendamento = await dbUtils.query(`
    SELECT a.*, b.nome_paciente, c.nome_funcionario AS nome_medico
    FROM tab_agenda a
    INNER JOIN tab_paciente b USING(cod_paciente)
    INNER JOIN tab_funcionario c ON a.cod_medico = c.cod_funcionario
    WHERE a.status_atendido = "N"
  `);
  return agendamento;
}

// ==================================================================================

async getAtendimento(filtro, codMedico) {
  const atendimento = await dbUtils.query(`
    SELECT a.*, b.nome_paciente
    FROM tab_atendimento a
    INNER JOIN tab_paciente b USING(cod_paciente)
    WHERE a.status_atendido = "N"
    AND cod_medico = ${codMedico}
  `);
  return atendimento;
}

// ==================================================================================  

async validaPaciente(codPaciente) {
  const paciente = await dbUtils.query(`
    SELECT 1 FROM tab_agenda WHERE cod_paciente = ${codPaciente}
  `);
  return paciente;
}

// ==================================================================================  

/**
   */
  async salvar(tabela, pk, entidade, connection) {
    if (tabela === 'tab_compra') {
      const itens = entidade.itens;
      delete entidade.itens;
      const idSalvo = await super.salvar(tabela, pk, entidade, connection);
      await dbUtils.query('delete from tab_compra_item where cod_compra = ?', idSalvo);
      for (const item of itens) {
        delete item.nome_produto;
        item.cod_compra = idSalvo;
        await dbUtils.query('insert into tab_compra_item set ?', item);
      }
      return idSalvo;
    } else if (tabela === 'tab_agenda') {
      let codAtendimento = null;
      if (!entidade.cod_agenda) { // inserindo um atendimento
        codAtendimento = await super.salvar('tab_atendimento', 'cod_atendimento', {
          cod_medico: entidade.cod_medico,
          cod_paciente: entidade.cod_paciente,
          dt_agendamento: entidade.dt_agendamento,
        });
      } else { // alterando o atendimento
        const atendimento = await dbUtils.queryFindOne(`select * from tab_atendimento where cod_agenda = ?`, entidade.cod_agenda);
        await super.salvar('tab_atendimento', 'cod_atendimento', {
          cod_atendimento: atendimento.cod_atendimento,
          cod_medico: entidade.cod_medico,
          cod_paciente: entidade.cod_paciente,
          dt_agendamento: entidade.dt_agendamento,
        });
      }
      const idSalvo = await super.salvar(tabela, pk, entidade, connection);
      await dbUtils.query('update tab_atendimento set dt_atendimento = if("' + entidade.status_atendido + '" = "S", now(), null), status_atendido = ? where cod_agenda = ?', [entidade.status_atendido, idSalvo]);
      if (codAtendimento) {
        await dbUtils.query('update tab_atendimento set cod_agenda = ? where cod_atendimento = ?', 
          [idSalvo, codAtendimento]);
      }
      return idSalvo;
    } else if (tabela === 'tab_atendimento') {
      const idSalvo = await super.salvar(tabela, pk, entidade);   
      await dbUtils.query('update tab_atendimento set dt_atendimento = if("' + entidade.status_atendido + '" = "S", now(), null) where cod_agenda = ?', [entidade.cod_agenda]);   
      await dbUtils.query('update tab_agenda set status_atendido = ? where cod_agenda = ?', [entidade.status_atendido, entidade.cod_agenda]);
      return idSalvo;
    }
    return await super.salvar(tabela, pk, entidade, connection);
  }

// ==================================================================================  

/**
 * Realiza uma busca no banco de dados
 * @param {string} tabela O Nome da tabela
 * @param {string} filtro O Filtro
 * @param {string} where Where
 */
async buscar(tabela, filtro, where) {
  return super.buscar(tabela, filtro, where);
}

});
