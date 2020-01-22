const network = require('network');
const requests = require('./requests');
const extractZip = require('extract-zip');

/**
 * Extrai um arquivo zip.
 * @param {String} caminhoZip O Caminho do zip a ser extraido.
 * @param {String} pastaDestino A Pasta de destino da extração.
 */
function extrairZip(caminhoZip, pastaDestino) {
  return new Promise(async (resolve, reject) => {
    extractZip(caminhoZip, { dir: pastaDestino }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * @return {String} O Ip da internet desse computador.
 */
function getIpInternet() {
  return new Promise((resolve) => {
    network.get_public_ip((err, ip) => resolve(ip || null));
  });
}

/**
 * @return {String} O Ip padrão da apice, seja local ou externo.
 */
async function getIpApice() {

  // Realiza o get e retorna se a url deu certo:
  async function get(url) {
    try {
      await requests.get(`http://${url}:8093/ping`, { timeout: 1000 });
      return url;
    } catch (ex) {
      return false;
    }
  }

  let retorno = '';
  if (!retorno) {
    retorno = await get('192.168.1.252');
  }
  if (!retorno) {
    retorno = await get('apicesistemas.dyndns.org');
  }
  return retorno || 'apicesistemas.dyndns.org';
}

function regexMatch(rgx, str) {
  const m = str.match(rgx);
  return m && m.length;
}

exports.regexMatch = regexMatch;
exports.getIpApice = getIpApice;
exports.getIpInternet = getIpInternet;
exports.extrairZip = extrairZip;
