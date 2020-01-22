/**
 * Inicio da aplicação, essa será a primeira classe do sistema a ser executada,
 * com a migração para o react, tudo do antigo webservice foi colocado na pasta
 * backend na raíz do projeto.
 */
try {
  const env = require('./env');
  if (!env.production)  {
    require('react-scripts/scripts/start');
  }

  global.appDir = __dirname;

  const expressUtils  = require('./lib_react_backend/express_utils');
  const database      = require('./lib_react_backend/db_utils');
  const Routes        = require('./routes/Routes');
  const path          = require('path');
  const sincronizador = require('./lib_react_backend/sincronizacao/sincronizador');

  const server = expressUtils.criarServidor(env.portExpress, (serv, express) => {
    serv.use(express.static(path.join(__dirname, './build')));
    serv.use('/static', express.static(path.join(__dirname, 'build', 'static')));
    serv.use('/app/*', (req, res) => {
      res.sendFile(path.join(global.appDir, 'build', 'index.html'));
    });
    serv.get('/ping', (req, res) => {
      res.send('ok');
    });
  }); // Servidor do deploy

  // Cria a conexão com o banco de dados, o método já irá salvar o objeto do pool
  // na variável global DATABASE_POOL.
  database.criarConexao(env.sql);

  // eslint-disable-next-line
  new Routes(server); // Ativa as rotas padrões do react

  // Roda o sincronizado das tabelas, criando tabelas novas, e/ou alterando-as.
  sincronizador.sinc(env.sql.database, 'entidade');

} catch (ex) {
  console.log('index.js - ', ex);
}
