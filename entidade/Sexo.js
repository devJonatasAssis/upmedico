const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Sexo extends EntidadeSinc {

  constructor() {
    super('tab_sexo');
  }

  getFields() {
    return [
      field('cod_sexo').pk(),
      field('descricao').varchar(255),
    ];
  }
    
  getDefaults() {
    return [
      ` INSERT INTO tab_sexo (descricao) VALUES ('MASCULINO');`,
      ` INSERT INTO tab_sexo (descricao) VALUES ('FEMININO');`,
      ` INSERT INTO tab_sexo (descricao) VALUES ('HOMOSEXUAL');`,
      ` INSERT INTO tab_sexo (descricao) VALUES ('TRASSEXUAL');`,
      ` INSERT INTO tab_sexo (descricao) VALUES ('LESBICA');`,
      ` INSERT INTO tab_sexo (descricao) VALUES ('GAY');`,
      ` INSERT INTO tab_sexo (descricao) VALUES ('TRANSGÊNERO');`,
      ` INSERT INTO tab_sexo (descricao) VALUES ('OUTROS');`,
      ` INSERT INTO tab_sexo (descricao) VALUES ('PREFIRO NÃO INFORMAR');`,
    ];
  }
});
