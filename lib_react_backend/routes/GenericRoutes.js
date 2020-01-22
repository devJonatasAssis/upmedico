const apiceAuth         = require('../apice_auth');
const GenericController = require('./GenericController');

/**
 * Classe de rotas genéricas, não é necessário que as rotas da aplicação herdem
 * dessa, porém é extremamente recomendado, já que vários componentes de front-end
 * usam rotas automaticamente configuradas aqui.
 */
module.exports = (class GenericRoutes { 

  constructor(server) {
    this.ativarRotas(server);
    this.controller = new GenericController();
  }

  /**
   * Ativa a rota padrão de salvar uma entidade, deve ser sobrescrito
   * para realizar coisas mais específicas.
   */
  ativarRotaSalvar(server) {
    server.post('/salvar', apiceAuth.validate, async (req, res) => {
      try {
        const id = await this.controller.salvar(req.body.tabela,
                                                req.body.nomePk,
                                                req.body.entidade);
        res.send({ status: true, dados: id });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });
  }

  /**
   * Ativa a rota padrão de excluir uma entidade, deve ser sobrescrito
   * para realizar coisas mais específicas.
   */
  ativarRotaExcluir(server) {
    server.post('/excluir', apiceAuth.validate, async (req, res) => {
      try {
        await this.controller.excluir(req.body.tabela,
                                      req.body.nomePk,
                                      req.body.entidade);
        res.send({ status: true });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });
  }

  /**
   * Ativa a rota padrão de buscar uma entidade, deve ser sobrescrito
   * para realizar coisas mais específicas.
   */
  ativarRotaBuscar(server) {
    server.post('/buscar', async (req, res) => {
      try {
        const ret = await this.controller.buscar(req.body.tabela,
                                                 req.body.filtro,
                                                 req.body.extraWhere);
        res.send({ status: true, dados: ret });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });

    // Novo buscar
    server.post('/buscar-2', async (req, res) => {
      try {
        const ret = await this.controller.buscar2(req.body.entity,
                                                  req.body.fields,
                                                  req.body.includes,
                                                  req.body.filters,
                                                  req.body.alias);
        res.send({ status: true, dados: ret });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });
  }

  /**
   * Ativa as rotas para pegar ou setar em massa as configurações do sistema.
   */
  ativarRotasConfiguracao(server) {
    // Seta as configurações em massa:
    server.post('/set_configs', apiceAuth.validate, async (req, res) => {
      try {
        await this.controller.setConfigs(req.body.dados);
        res.send({ status: true });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });

    // Recupera as configurações em massa:
    server.post('/get_configs', apiceAuth.validate, async (req, res) => {
      try {
        const ret = await this.controller.getConfigs(req.body.tabelas);
        res.send({ status: true, dados: ret });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });
  }

  /**
   * Ativa a rota de transferência de dados do papito.
   */
  ativarRotasPapito(server) {
    server.post('/papito_query', apiceAuth.validate, async (req, res) => {
      try {
        const ret = await this.controller.handlePapitoQuery(req.body.query);
        res.send({ status: true, dados: ret });
      } catch (ex) {
        console.log(ex);
        res.send({ status: false, erro: ex });
      }
    });
  }

  /**
   * Ativa as rotas genéricas do backend.
   */
  ativarRotas(server) {
    this.ativarRotaSalvar(server);
    this.ativarRotaExcluir(server);
    this.ativarRotaBuscar(server);
    this.ativarRotasConfiguracao(server);
    this.ativarRotasPapito(server);

    /**
     * Verifica se existe um registro anterior e posterior à 
     * um registro específico da tabela
     */
    server.post('/verificar_registros_ant_prox', apiceAuth.validate, async (req, res) => {
      try {
        const ret = await this.controller.verificarRegistrosAntProx(req.body.tabela,
                                                                    req.body.nomePk,
                                                                    req.body.id);
        res.send({ status: true, dados: ret });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });

    /**
     * Pinga o servidor de requisições para validar autenticação
     */
    server.get('/validar_auth', apiceAuth.validate, (req, res) => {
      const token   = req.headers.token;
      const usuario = apiceAuth.getParamsByToken(token);
      res.send({ status: true, dados: { token, usuario } });
    });

    /**
     * Pinga o servidor.
     */
    server.get('/ping', (req, res) => {
      res.send('ok');
    });
  }

});
