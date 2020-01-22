const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Escolaridade extends EntidadeSinc {

  constructor() {
    super('tab_escolaridade');
  }

  getFields() {
    return [
      field('cod_escolaridade').pk(),
      field('escolaridade').varchar(255),
    ];
  }
    
  getDefaults() {
    return [
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('NÃO ALFABETIZADO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('ENSINO PRIMÁRIO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('ENSINO FUNDAMENTAL');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('ENSINO MÉDIO CURSANDO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('ENSINO MÉDIO COMPLETO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('ENSINO SUPERIOR CURSANDO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('ENSINO SUPERIOR COMPLETO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('CURSO TÉCNICO CURSANDO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('CURSO TÉCNICO COMPLETO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('PÓS - GRADUAÇÃO CURSANDO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('PÓS - GRADUAÇÃO COMPLETO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('MESTRADO CURSANDO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('MESTRADO COMPLETO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('DOUTORADO CURSANDO');`,
      ` INSERT INTO tab_escolaridade (escolaridade) VALUES ('DOUTORADO COMPLETO');`,
    ];
  }
});