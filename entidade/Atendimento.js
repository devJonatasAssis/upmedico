const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Atendimento extends EntidadeSinc {

  constructor() {
    super('tab_atendimento');
  }

  getFields() {
    return [
      field('cod_atendimento').pk(),
      field('cod_medico').int(6).default(0),
      field('cod_paciente').int(6).default(0),
      field('cod_agenda').int(6).default(0),
      field('dt_agendamento').datetime(),
      field('dt_atendimento').datetime(),
      field('status_atendido').enum('S', 'N').default('N'),
      field('anamnese_atendimento').text(),
    ];
  }
  
  getReferences() {
    return [
      field('cod_medico').references('tab_funcionario(cod_funcionario)', 'atendimento_medico'),
      field('cod_paciente').references('tab_paciente(cod_paciente)', 'atendimento_paciente'),
      field('cod_agenda').references('tab_agenda(cod_agenda)', 'atendimento_agenda'),
    ];
  }

});

