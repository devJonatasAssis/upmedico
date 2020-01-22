const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Convenio extends EntidadeSinc {

  constructor() {
    super('tab_convenio');
  }

  getFields() {
    return [
      field('cod_convenio').pk(),
      field('nome_convenio').varchar(130),
      field('registro_ans').varchar(80),
      field('status_emite_tiss').enum('S', 'N').default('N'),
      field('nr_tabela').varchar(10),
      field('cod_tipo_documento_exame_tiss_frente_a4').int(6).default('0'),
      field('cod_tipo_documento_exame_tiss_verso_a4').int(6).default('0'),
      field('cod_tipo_documento_exame_tiss_frente_a5').int(6).default('0'),
      field('cod_tipo_documento_exame_tiss_verso_a5').int(6).default('0'),
      field('cod_tipo_documento_guia_internacao').int(6).default('0'),

    ];
  }

  getDefaults() {
    return [
	  ` INSERT INTO tab_convenio (nome_convenio, registro_ans, status_emite_tiss, nr_tabela, cod_tipo_documento_exame_tiss_frente_a4, cod_tipo_documento_exame_tiss_verso_a4, cod_tipo_documento_exame_tiss_frente_a5, cod_tipo_documento_exame_tiss_verso_a5, cod_tipo_documento_guia_internacao) VALUES ('UNIMED', '320862', 'S', NULL, 923, 0, 0, 0, 0);`,
	  ` INSERT INTO tab_convenio (nome_convenio, registro_ans, status_emite_tiss, nr_tabela, cod_tipo_documento_exame_tiss_frente_a4, cod_tipo_documento_exame_tiss_verso_a4, cod_tipo_documento_exame_tiss_frente_a5, cod_tipo_documento_exame_tiss_verso_a5, cod_tipo_documento_guia_internacao) VALUES ('PRIMÍCIA', NULL, 'N', NULL, 0, 0, 0, 0, 0);`,
	  ` INSERT INTO tab_convenio (nome_convenio, registro_ans, status_emite_tiss, nr_tabela, cod_tipo_documento_exame_tiss_frente_a4, cod_tipo_documento_exame_tiss_verso_a4, cod_tipo_documento_exame_tiss_frente_a5, cod_tipo_documento_exame_tiss_verso_a5, cod_tipo_documento_guia_internacao) VALUES ('PARTICULAR', NULL, 'N', NULL, 0, 0, 0, 0, 0);`,
	  ` INSERT INTO tab_convenio (nome_convenio, registro_ans, status_emite_tiss, nr_tabela, cod_tipo_documento_exame_tiss_frente_a4, cod_tipo_documento_exame_tiss_verso_a4, cod_tipo_documento_exame_tiss_frente_a5, cod_tipo_documento_exame_tiss_verso_a5, cod_tipo_documento_guia_internacao) VALUES ('CORREIO', NULL, 'N', NULL, 0, 0, 0, 0, 0);`,
	  ` INSERT INTO tab_convenio (nome_convenio, registro_ans, status_emite_tiss, nr_tabela, cod_tipo_documento_exame_tiss_frente_a4, cod_tipo_documento_exame_tiss_verso_a4, cod_tipo_documento_exame_tiss_frente_a5, cod_tipo_documento_exame_tiss_verso_a5, cod_tipo_documento_guia_internacao) VALUES ('SINDICATO', NULL, 'N', NULL, 0, 0, 0, 0, 0);`,
	  ` INSERT INTO tab_convenio (nome_convenio, registro_ans, status_emite_tiss, nr_tabela, cod_tipo_documento_exame_tiss_frente_a4, cod_tipo_documento_exame_tiss_verso_a4, cod_tipo_documento_exame_tiss_frente_a5, cod_tipo_documento_exame_tiss_verso_a5, cod_tipo_documento_guia_internacao) VALUES ('AMB', NULL, 'N', NULL, 0, 0, 0, 0, 0);`,
	  ` INSERT INTO tab_convenio (nome_convenio, registro_ans, status_emite_tiss, nr_tabela, cod_tipo_documento_exame_tiss_frente_a4, cod_tipo_documento_exame_tiss_verso_a4, cod_tipo_documento_exame_tiss_frente_a5, cod_tipo_documento_exame_tiss_verso_a5, cod_tipo_documento_guia_internacao) VALUES ('CORTESIA', NULL, 'N', NULL, 0, 0, 0, 0, 0);`,
	  ` INSERT INTO tab_convenio (nome_convenio, registro_ans, status_emite_tiss, nr_tabela, cod_tipo_documento_exame_tiss_frente_a4, cod_tipo_documento_exame_tiss_verso_a4, cod_tipo_documento_exame_tiss_frente_a5, cod_tipo_documento_exame_tiss_verso_a5, cod_tipo_documento_guia_internacao) VALUES ('ASSEFAZ', '346926', 'S', '94', 0, 0, 0, 0, 0);`,
	  ` INSERT INTO tab_convenio (nome_convenio, registro_ans, status_emite_tiss, nr_tabela, cod_tipo_documento_exame_tiss_frente_a4, cod_tipo_documento_exame_tiss_verso_a4, cod_tipo_documento_exame_tiss_frente_a5, cod_tipo_documento_exame_tiss_verso_a5, cod_tipo_documento_guia_internacao) VALUES ('COPEL', '355151', 'S', '22', 923, 0, 0, 0, 0);`,
	  ` INSERT INTO tab_convenio (nome_convenio, registro_ans, status_emite_tiss, nr_tabela, cod_tipo_documento_exame_tiss_frente_a4, cod_tipo_documento_exame_tiss_verso_a4, cod_tipo_documento_exame_tiss_frente_a5, cod_tipo_documento_exame_tiss_verso_a5, cod_tipo_documento_guia_internacao) VALUES ('SANEPAR', '338648', 'S', '22', 923, 0, 0, 0, 0);`,
	];
  }
});
