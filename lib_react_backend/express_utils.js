const express    = require('express');
const bodyParser = require('body-parser');
  
/**
 * Cria e retorna um servidor do express para quem chamou, o servidor já voltará
 * escutando na porta passada por parâmetro.
 * @param {integer} port A Porta que o servidor escutará.
 * @param {function} routeSetupCallback Function opcional para setar
 *                                      as rotas de get/post
 */
function criarServidor(port, routeSetupCallback) {
  const server = express();

  if (routeSetupCallback) {
    routeSetupCallback(server, express);
  }

  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, token, Content-Type, Accept, validtoken, auth_type');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
  });

  server.disable('x-powered-by');
  server.use(bodyParser.urlencoded({
      extended: true,
      limit: '50mb',
  }));
  server.use(bodyParser.json({
      limit: '50mb',
  }));

  server.httpServer = server.listen(port, () => {
    console.log('Servidor express rodando na porta ' + port);
  });

  return server;
}

exports.criarServidor = criarServidor;
