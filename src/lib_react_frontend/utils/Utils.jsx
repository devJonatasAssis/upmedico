import accounting from 'accounting';

/**
 * Formata valores decimais ex: 100.00 para 100,00
 * @param {Float} valor é o valor a ser formatado
 * @param {Integer} casa_decimais é a quantidade de casas decimais a seram apresentada DEFAULT 2
 */
export function formatMoney(valor, casa_decimais) {
  return 'R$ ' + accounting.formatMoney(valor, '', casa_decimais || 2, '.', ',');
}
