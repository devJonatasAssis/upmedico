const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Documento extends EntidadeSinc {

  constructor() {
    super('tab_documento');
  }

  getFields() {
    return [
      field('cod_documento').pk(),
      field('nome_documento').varchar(255),
    ];
  }

});

