const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Produto extends EntidadeSinc {

  constructor() {
    super('tab_produto');
  }

  getFields() {
    return [
      field('cod_produto').pk(),
      field('nome_produto').varchar(130),
      field('vr_produto').decimal(),
      field('unidade_medida').varchar(),
      field('estoque').int().default(0),

    ];
  }

  getDefaults() {
    return [
      ` INSERT INTO tab_produto (nome_produto, vr_produto, unidade_medida) VALUES ('LUVA LATEX BRANCA', '21.90', 'CX');`,
      ` INSERT INTO tab_produto (nome_produto, vr_produto, unidade_medida) VALUES ('LUVA ELASTICO', '21.90', 'CX');`,
	];
  }
});
