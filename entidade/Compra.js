const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Compra extends EntidadeSinc {

  constructor() {
    super('tab_compra');
  }

  getFields() {
    return [
      field('cod_compra').pk(),
      field('cod_fornecedor').int(6).default('0'),
      field('dt_cadastro').datetime(),
      field('dt_fechamento').datetime(),
      field('vr_total').decimal(),
      field('vr_desconto').decimal(),
      field('vr_acrescimo').decimal(),
      field('obs_compra').varchar(),
      field('status_fechado').enum('S', 'N').default('N'),
    ];
  }

  getReferences() {
    return [
      field('cod_fornecedor').references('tab_fornecedor(cod_fornecedor)', 'compra_fornecedor'),
    ];
  }

});
