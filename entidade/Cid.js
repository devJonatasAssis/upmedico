const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Cid extends EntidadeSinc {

  constructor() {
    super('tab_cid');
  }

  getFields() {
    return [
      field('cod_cid').pk(),
      field('cod_funcionario').int(6).default('0'),
      field('codigo_cid').varchar(255),
      field('nome_cid').varchar(255),
    ];
  }
  
  getReferences() {
    return [
      field('cod_funcionario').references('tab_funcionario(cod_funcionario)', 'cid_funcionario'),
    ];
  }

});

