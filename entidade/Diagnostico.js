const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Diagnostico extends EntidadeSinc {

  constructor() {
    super('tab_diagnostico');
  }

  getFields() {
    return [
      field('cod_diagnostico').pk(),
      field('nome_diagnostico').varchar(255),
    ];
  }

});

