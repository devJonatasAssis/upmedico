const GenericErrors = require('./lib_react_backend/utils/GenericErrors');

module.exports = (class Errors extends GenericErrors {
  
  static SENHA_INCORRETA() {
    return {
      error_code: 1,
      error_message: 'A Senha informada está incorreta!',  
    };
  }

  static USUARIO_NAO_ENCONTRADO(login) {
    return {
      error_code: 2,
      error_message: 'Usuario com login "' + login + '" não foi encontrado!',  
    };
  }

});
