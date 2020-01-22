import moment from 'moment';

/**
 * 
 * @param {String} valor Remove caracteres do parâmetro 'valor'  . - / , ( ) _
 */
export function removeCaracteres(valor) {
    return valor.replace(/\.|-|\/|,|\(|\)|_/gi, '');
}

/**
 * 
 * @param {String} data Informar a data / Quando utilizado o componente InputMascara
 * @param {Boolean} dataAutomatica Caso seja enviado a data gerado pelo automático / New Date() / Usar true
 */
export function inverteData(data, dataAutomatica) {
  
  if (dataAutomatica === true) {
    return data = moment(data).format('YYYY-MM-DD HH:mm:ss');
  }

  if (data) {
    var split = data.split('/');
    var novaData = split[1] + '/' + split[0] + '/' + split[2];
    novaData = moment(novaData).format('YYYY-MM-DD HH:mm:ss');
    
    return novaData;
  }

  return data;
}