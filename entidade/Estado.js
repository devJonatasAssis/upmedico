const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Estado extends EntidadeSinc {

  constructor() {
    super('tab_estado');
  }

  getFields() {
    return [
      field('cod_estado').pk(),
      field('estado').varchar(255),
      field('sigla').varchar(2),
      field('cod_ibge').int(2),
    ];
  }

  getDefaults() {
    return [
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('PARANÁ', 'PR', 41);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('AMAPÁ', 'AP', 16);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('SÃO PAULO', 'SP', 35);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('SANTA CATARINA', 'SC', 42);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('MINAS GERAIS', 'MG', 31);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('RIO DE JANEIRO', 'RJ', 33);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('MATO GROSSO', 'MT', 51);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('MATO GROSSO DO SUL', 'MS', 50);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('RIO GRANDE DO SUL', 'RS', 43);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('DISTRITO FEDERAL', 'DF', 53);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('GOIÁS', 'GO', 52);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('BAHIA', 'BA', 29);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('ESPÍRITO SANTO', 'ES', 32);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('TOCANTINS', 'TO', 17);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('PARÁ', 'PA', 15);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('RONDONIA', 'RO', 11);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('ALAGOAS', 'AL', 27);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('AMAZONAS', 'AM', 13);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('CEARÁ', 'CE', 23);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('PIAUÍ', 'PI', 22);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('PERNAMBUCO', 'PE', 26);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('SERGIPE', 'SE', 28);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('PARAÍBA', 'PB', 25);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('RIO GRANDE DO NORTE', 'RN', 24);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('MARANHÃO', 'MA', 21);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('ACRE', 'AC', 12);`,
      ` INSERT INTO tab_estado (estado, sigla, cod_ibge) VALUES ('RORAIMA', 'RR', 14);`,
    ];
  }
});
