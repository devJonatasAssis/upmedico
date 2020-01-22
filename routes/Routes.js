const GenericRoutes = require('../lib_react_backend/routes/GenericRoutes');
const apiceAuth     = require('../lib_react_backend/apice_auth');
const Controller    = require('./Controller');
const dbUtils = require('../lib_react_backend/db_utils');

/**
 * Classe de rotas específicas da aplicação, herda da classe de rotas
 * genéricas para salvar e recuperar entidades do banco.
 */
module.exports = (class Routes extends GenericRoutes {

  constructor(server) {
    super(server);
    // Sobrescreve o controller para que possamos colocar métodos
    // mais específicos.
    this.controller = new Controller();
  }

  /**
   * Ativa a rota de login.
   */
  ativarRotaLogin(server) {
    server.post('/login', async (req, res) => {
      try {
        const dados = await this.controller.login(req.body.login, req.body.senha);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });
  }

  ativarRotaMudarSenhaFunc(server) {
    server.post('/mudar_senha_funcionario', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.mudarSenhaFuncionario(req.body.codFuncionario,
                                                                  req.body.novaSenha);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });
  }

  ativarRotas(server) {
     /**
     * Pinga o servidor de requisições para validar autenticação
     */
    server.get('/validar_auth', apiceAuth.validate, async (req, res) => {
      const token   = req.headers.token;
      const usuario = apiceAuth.getParamsByToken(token);

      // Carrega todas as Configs do Sistema
      const config = await this.controller.getConfigs(['tab_config']);
      res.send({ status: true, dados: { token, usuario, config } });
    });

    super.ativarRotas(server);
    this.ativarRotaLogin(server);
    this.ativarRotaMudarSenhaFunc(server);

    server.get('/config_campos', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.getConfigCampos(req.query.tabela);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });
 
    server.post('/get_pais_filhos', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.getPaisEFilhos(req.body.nome, req.body.filtro);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });


    server.post('/get_compra_itens', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.getCompraItens(req.body.codCompra);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });

    server.post('/abrir_fechar_compra', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.abrirFecharCompra(req.body.codCompra, req.body.status, req.body.itens);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });

    server.post('/produto_compra', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.produtoCompra(req.body.codProduto);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });

    server.post('/sql', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await dbUtils.query(req.body.sql);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });

    server.post('/get_agendamento', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.getAgendamento();
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });

    server.post('/get_atendimento', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.getAtendimento(req.body.filtro, req.body.codMedico);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });


    server.post('/valida_paciente', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.validaPaciente(req.body.codPaciente);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });

    server.post('/get_registros_paginacao_cod_nome_tab_inner', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.getRegistrosPaginacaoCodNomeTabInner(req.body.tabela, 
																				 req.body.whereLike,
																				 req.body.orderBy,
																				 req.body.tabelaInner,
																				 req.body.usingInner,
																				 req.body.colunasInner,
																				 req.body.filtro);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });
    
    server.post('/get_registros_paginacao_cod_nome_tab', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.getRegistrosPaginacaoCodNomeTab(req.body.tabela, 
																			req.body.whereLike,
																			req.body.orderBy,
																			req.body.filtro);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });
    
    server.post('/registros_codigo_nome', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.getRegistrosCodNome(req.body.codigo, 
                                                                req.body.nome,
                                                                req.body.tabela);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });

    // server.post('/get_valores_data', apiceAuth.validate, async (req, res) => {
    //   try {
    //     const dados = await this.controller.getValoresData(req.body.startDate,
    //      req.body.endDate);
    //     res.send({ status: true, dados });
    //   } catch (ex) {
    //     res.send({ status: false, erro: ex });
    //   }
    // });

    // server.post('/gerar_relatorio', apiceAuth.validate, async (req, res) => {
    //   try {
    //     const dados = await this.controller.gerarRelatorio(req.body.atributos);
    //     res.send({ status: true, dados });
    //   } catch (ex) {
    //     res.send({ status: false, erro: ex });
    //   }
    // });

    server.post('/desativar_ativar_padrao', apiceAuth.validate, async (req, res) => {
      try {
        const dados = await this.controller.desativarAtivarPadrao(req.body.tabela,
            req.body.id, req.body.nome);
        res.send({ status: true, dados });
      } catch (ex) {
        res.send({ status: false, erro: ex });
      }
    });
  }

});
