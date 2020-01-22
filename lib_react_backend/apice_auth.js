const tokens = [];
const uniqueString = require('shortid');

function putToken(params) {
  const str = uniqueString.generate();
  tokens.push({
    token: str,
    params,
  });
  return str;
}

function isTokenValid(token) {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].token === token) {
      return true;
    }
  }
  return false;
}

function validate(req, res, next) {
  const token = req.headers.token;
  if (isTokenValid(token)) {
    next();
  } else {
    res.send({ status: false, erro: { error_code: 0, error_message: 'Token inválido! '}});
  }
}

function getParamsByToken(token) {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].token === token) {
      return tokens[i].params;
    }
  }
  return undefined;
}

exports.putToken = putToken;
exports.isTokenValid = isTokenValid;
exports.validate = validate;
exports.getParamsByToken = getParamsByToken;