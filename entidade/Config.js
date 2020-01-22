const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Config extends EntidadeSinc {

  constructor() {
    super('tab_config');
  }

  getFields() {
    return [
      field('cod_config').pk(),
      field('status_edit_maiusculo').enum('S', 'N').default('S'),
      field('status_usa_menu_aberto').enum('S', 'N').default('S'),
    ];
  }
  
  getDefaults() {
    return [
      ` INSERT INTO tab_config (status_edit_maiusculo, status_usa_menu_aberto) 
        VALUES ('S', 'S');`,
    ];
  }
});
