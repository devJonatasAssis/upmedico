const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Agenda extends EntidadeSinc {

  constructor() {
    super('tab_agenda');
  }

  getFields() {
    return [
      field('cod_agenda').pk(),
      field('cod_medico').int(6).default(0),
      field('cod_paciente').int(6).default(0),
      field('cod_funcionario_cadastro').int(6).default(0),
      field('dt_cadastro').datetime(),
      field('dt_agendamento').datetime(),
      field('status_atendido').enum('S', 'N').default('N'),
    ];
  }
  
  getReferences() {
    return [
      field('cod_medico').references('tab_funcionario(cod_funcionario)', 'agenda_medico'),
      field('cod_paciente').references('tab_paciente(cod_paciente)', 'agenda_paciente'),
      field('cod_funcionario_cadastro').references('tab_funcionario(cod_funcionario)', 'agenda_funcionario_cadastro'),
    ];
  }

});

