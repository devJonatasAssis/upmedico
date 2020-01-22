const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Nivel extends EntidadeSinc {

  constructor() {
    super('tab_nivel');
  }

  getFields() {
    return [
      field('cod_nivel').pk(),
      field('descricao').varchar(255),
    ];
  }
    
  getDefaults() {
    return [
      ` INSERT INTO tab_nivel (descricao) VALUES ('ADMINISTRADOR');`,
      ` INSERT INTO tab_nivel (descricao) VALUES ('PROPRIETÁRIO');`,
      ` INSERT INTO tab_nivel (descricao) VALUES ('GERENTE');`,
      ` INSERT INTO tab_nivel (descricao) VALUES ('MÉDICO');`,
      ` INSERT INTO tab_nivel (descricao) VALUES ('RECEPÇÃO');`,
      ` INSERT INTO tab_nivel (descricao) VALUES ('CAIXA');`,
      ` INSERT INTO tab_nivel (descricao) VALUES ('VENDEDOR');`,
    ];
  }
});
