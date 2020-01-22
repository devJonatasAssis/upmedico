const requestify = require('requestify');

/**
 * Realiza uma requisição GET.
 * @param {String} url A Url que será consumida.
 */
async function get(url, opts) {
  const response = await requestify.get(url, opts);
  return response.getBody();
}

/**
 * Realiza uma requisição POST.
 * @param {String} url A Url que será consumida.
 * @param {*} dados Os dados passados para o req.body. 
 * @param {Object} opts Um objeto de opções do requestify. 
 */
async function post(url, dados, opts) {
  const response = await requestify.post(url, dados, opts);
  return response.getBody();
}

exports.post = post;
exports.get = get;
