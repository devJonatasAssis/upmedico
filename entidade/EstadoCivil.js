
const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class EstadoCivil extends EntidadeSinc {

  constructor() {
    super('tab_estado_civil');
  }

  getFields() {
    return [
      field('cod_estado_civil').pk(),
      field('estado_civil').varchar(255),
    ];
  }
    
  getDefaults() {
    return [
      ` INSERT INTO tab_estado_civil (estado_civil) VALUES ('SOLTEIRO(A)');`,
      ` INSERT INTO tab_estado_civil (estado_civil) VALUES ('CASADO(A)');`,
      ` INSERT INTO tab_estado_civil (estado_civil) VALUES ('DIVORCIADO(A)');`,
      ` INSERT INTO tab_estado_civil (estado_civil) VALUES ('SEPARADO(A)');`,
      ` INSERT INTO tab_estado_civil (estado_civil) VALUES ('VIUVO(A)');`,
      ` INSERT INTO tab_estado_civil (estado_civil) VALUES ('OUTROS');`,
    ];
  }
});
