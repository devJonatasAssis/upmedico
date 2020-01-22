const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class CompraItem extends EntidadeSinc {

  constructor() {
    super('tab_compra_item');
  }

  getFields() {
    return [
      field('cod_compra_item').pk(),
      field('cod_produto').int(6).default('0'),
      field('cod_compra').int(6).default('0'),
      field('vr_item').decimal(),
      field('qtde_item').int(),
      field('vr_total_item').decimal(),
      field('unidade_medida').varchar(),
    ];
  }

  getReferences() {
    return [
      field('cod_compra').references('tab_compra(cod_compra)', 'compra_item_compra'),
      field('cod_produto').references('tab_produto(cod_produto)', 'compra_item_produto'),
    ];
  }

});
