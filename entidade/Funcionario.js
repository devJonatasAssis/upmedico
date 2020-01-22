const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Funcionario extends EntidadeSinc {

  constructor() {
    super('tab_funcionario');
  }

  getFields() {
    return [
      field('cod_funcionario').pk(),
      field('cod_empresa').int(6),
      field('nome_funcionario').varchar(255),
      field('especialidade').varchar(255),
      field('usuario').varchar(255),
      field('senha').varchar(255),
      field('cod_cbo').varchar(20),
      field('tp_usuario').int(1).default(1),
      field('status_ativo').enum('S', 'N').default('S'),
      field('status_volta_primeiro').enum('S', 'N').default('S'),
      field('status_entra_agenda').enum('S', 'N').default('N'),
      field('status_estorna_agenda').enum('S', 'N').default('N'),
      field('status_permite_excluir_agendamento').enum('S', 'N').default('S'),
      field('dt_cadastro').datetime(),

      // CONFIGURAÇÃO
      field('status_imp_receita').enum('S', 'N').default('N'),
      field('status_imp_exame').enum('S', 'N').default('N'),
      field('status_imp_atestado').enum('S', 'N').default('N'),
      field('status_imp_diversos').enum('S', 'N').default('N'),
      field('status_imp_cabecalho').enum('S', 'N').default('N'),
      field('conselho_regional').varchar(10),
      field('conselho_regional_nr').varchar(10),
      field('conselho_regional_uf').varchar(2),
      field('cpf').varchar(11),
      field('unimed_cidade').int(6),
      field('unimed_nr').varchar(20),
      field('cod_nivel').int(6),
      field('tipo_atestado').int(1).default(0),
      field('status_exibe_via_receita').enum('S', 'N').default('S'),
      field('status_troca_medicamento').enum('S', 'N').default('N'),
      field('recibo_sequencia').int(6),
      field('status_visualiza_antes_imprimir').enum('S', 'N').default('N'),
      field('tp_documento').int(1).default(0),
    ];
  }

  getReferences() {
    return [
      field('cod_empresa').references('tab_empresa(cod_empresa)', 'funcionario_empresa'),
      field('cod_nivel').references('tab_nivel(cod_nivel)', 'funcionario_nivel'),
      field('unimed_cidade').references('tab_cidade(cod_cidade)', 'funcionario_cidade'),
    ];
  }
   
  getDefaults() {
    return [
      ` INSERT INTO tab_funcionario (cod_empresa, nome_funcionario, especialidade, usuario, senha, cod_cbo, tp_usuario, status_ativo, status_volta_primeiro, status_entra_agenda, status_estorna_agenda, status_permite_excluir_agendamento, dt_cadastro, status_imp_receita, status_imp_exame, status_imp_atestado, status_imp_diversos, status_imp_cabecalho, conselho_regional, conselho_regional_nr, conselho_regional_uf, cpf, unimed_cidade, unimed_nr, cod_nivel, tipo_atestado, status_exibe_via_receita, status_troca_medicamento, recibo_sequencia, status_visualiza_antes_imprimir, tp_documento) VALUES (1, 'ADM DO SOFTWARE', 'ESPECIALI', 'ADMIN', 'd41d8cd98f00b204e9800998ecf8427e', '1254', 0, 'S', 'S', 'N', 'N', 'S', now(), 'N', 'N', 'N', 'N', 'N', 'COREN', '7178', 'PR', '01523695846', 1, '123456789', 1, 1, 'S', 'N', 1, 'S', 1);`,
      ` INSERT INTO tab_funcionario (cod_empresa, nome_funcionario, especialidade, usuario, senha, cod_cbo, tp_usuario, status_ativo, status_volta_primeiro, status_entra_agenda, status_estorna_agenda, status_permite_excluir_agendamento, dt_cadastro, status_imp_receita, status_imp_exame, status_imp_atestado, status_imp_diversos, status_imp_cabecalho, conselho_regional, conselho_regional_nr, conselho_regional_uf, cpf, unimed_cidade, unimed_nr, cod_nivel, tipo_atestado, status_exibe_via_receita, status_troca_medicamento, recibo_sequencia, status_visualiza_antes_imprimir, tp_documento) VALUES (1, 'DR. WAGNER LOVE', NULL, 'W', 'd41d8cd98f00b204e9800998ecf8427e', NULL, 1, 'S', 'S', 'N', 'N', 'S', NULL, 'N', 'N', 'N', 'N', 'N', NULL, NULL, NULL, NULL, NULL, NULL, 2, 1, 'S', 'N', NULL, 'N', 0);`,
      ` INSERT INTO tab_funcionario (cod_empresa, nome_funcionario, especialidade, usuario, senha, cod_cbo, tp_usuario, status_ativo, status_volta_primeiro, status_entra_agenda, status_estorna_agenda, status_permite_excluir_agendamento, dt_cadastro, status_imp_receita, status_imp_exame, status_imp_atestado, status_imp_diversos, status_imp_cabecalho, conselho_regional, conselho_regional_nr, conselho_regional_uf, cpf, unimed_cidade, unimed_nr, cod_nivel, tipo_atestado, status_exibe_via_receita, status_troca_medicamento, recibo_sequencia, status_visualiza_antes_imprimir, tp_documento) VALUES (1, 'DR. LUCAS HENRIQUE', NULL, 'L', 'd41d8cd98f00b204e9800998ecf8427e', NULL, 1, 'S', 'S', 'N', 'N', 'S', NULL, 'N', 'N', 'N', 'N', 'N', NULL, NULL, NULL, NULL, NULL, NULL, 7, 1, 'S', 'N', NULL, 'N', 0);`,
    ];
  }
});