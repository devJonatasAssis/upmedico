
const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Exame extends EntidadeSinc {

  constructor() {
    super('tab_exame');
  }

  getFields() {
    return [
      field('cod_exame').pk(),
      field('nome_exame').varchar(255),
      field('codigo_amb').varchar(50),
      field('codigo_tuss').varchar(50),
    ];
  }

  getDefaults() {
    return [
      ` INSERT INTO tab_exame (nome_exame, codigo_amb) VALUES ('HEMOGRANA', '01010101');`,
      ` INSERT INTO tab_exame (nome_exame, codigo_amb) VALUES ('ÀCIDO URICO', '40301150');`,
    ];
  }

});

