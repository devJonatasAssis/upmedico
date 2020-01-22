const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class GrauParentesco extends EntidadeSinc {

  constructor() {
    super('tab_grau_parentesco');
  }

  getFields() {
    return [
      field('cod_grau_parentesco').pk(),
      field('nome_grau_parentesco').varchar(255),
    ];
  }
    
  getDefaults() {
    return [
      ` INSERT INTO tab_grau_parentesco (nome_grau_parentesco) VALUES ('PAI');`,
      ` INSERT INTO tab_grau_parentesco (nome_grau_parentesco) VALUES ('MÃE');`,
      ` INSERT INTO tab_grau_parentesco (nome_grau_parentesco) VALUES ('AVÔ(Ó)');`,
      ` INSERT INTO tab_grau_parentesco (nome_grau_parentesco) VALUES ('TIO(A)');`,
      ` INSERT INTO tab_grau_parentesco (nome_grau_parentesco) VALUES ('IRMÃO(Ã)');`,
      ` INSERT INTO tab_grau_parentesco (nome_grau_parentesco) VALUES ('PADRASTO');`,
      ` INSERT INTO tab_grau_parentesco (nome_grau_parentesco) VALUES ('MADRASTA');`,
      ` INSERT INTO tab_grau_parentesco (nome_grau_parentesco) VALUES ('CONJUGE');`,
      ` INSERT INTO tab_grau_parentesco (nome_grau_parentesco) VALUES ('FILHO(A)');`,
      ` INSERT INTO tab_grau_parentesco (nome_grau_parentesco) VALUES ('NETO(A)');`,
    ];
  }
});
