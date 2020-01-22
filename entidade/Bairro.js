const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Bairro extends EntidadeSinc {

  constructor() {
    super('tab_bairro');
  }

  getFields() {
    return [
      field('cod_bairro').pk(),
      field('bairro').varchar(255),
    ];
  }

  getDefaults() {
    return [
      ` INSERT INTO tab_bairro (bairro) VALUES ('CENTRO');`,
      ` INSERT INTO tab_bairro (bairro) VALUES ('SÃO JORGE');`,
    ];
  }

});

