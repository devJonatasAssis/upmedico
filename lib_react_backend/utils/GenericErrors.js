module.exports = (class GenericErrors {

  static ENTIDADE_COM_ID_NAO_ENCONTRADA(nomeEntidade, id) {
    return {
      error_code: 1001,
      error_message: nomeEntidade + ' com o código "' + id + '" não foi encontrado(a)!',  
    };
  }

  static CONDICAO_ON_INVALIDA(nomeEntidade) {
    return {
      error_code: 1002,
      error_message: `Condição "on" não especificada ou inválida para a entidade ${nomeEntidade}`,  
    };
  }

  static CAMPO_NAO_FINALIZADO_COM_VIRGULA(campo) {
    return {
      error_code: 1003,
      error_message: `Campo "${campo}" deve ter uma virgula no final!`,  
    };
  }

});
