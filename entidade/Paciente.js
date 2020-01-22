const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Paciente extends EntidadeSinc {

  constructor() {
    super('tab_paciente');
  }

  getFields() {
    return [
      field('cod_paciente').pk(),
      field('nome_paciente').varchar(255),
      field('nr_prontuario').int(6).default('0'),
      field('cod_convenio').int(6).default('0'),
      field('dt_nascimento').datetime(),
      field('dt_cadastro').datetime(),
      field('idade_anos').int(3).default('0'),

      // IDENTIFICAÇÃO
      field('cod_estado_civil').int(6).default('0'),
      field('cod_escolaridade').int(6).default('0'),
      field('cod_sexo').int(3).default('0'),
      field('altura').decimal(),
      field('cpf').varchar(11),
      field('rg').varchar(15),
      field('endereco').varchar(50),
      field('cod_cidade').int(6).default('0'),
      field('cod_bairro').int(6).default('0'),
      field('cep').varchar(10),
      field('telefone_1').varchar(30),
      field('telefone_2').varchar(30),
      field('cod_responsavel').int(6).default('0'),
      field('cod_grau_parentesco').int(6).default('0'),
      field('responsavel_profissao').varchar(50),
      field('email').varchar(80),
      field('anamnese_paciente').text(),
    ];
  }

  getReferences() {
    return [
      field('cod_convenio').references('tab_convenio(cod_convenio)', 'paciente_convenio'),
      field('cod_sexo').references('tab_sexo(cod_sexo)', 'paciente_sexo'),
      field('cod_cidade').references('tab_cidade(cod_cidade)', 'paciente_cidade'),
      field('cod_bairro').references('tab_bairro(cod_bairro)', 'paciente_bairro'),
      field('cod_responsavel').references('tab_paciente(cod_paciente)', 'paciente_paciente_responsavel'),
      field('cod_grau_parentesco').references('tab_grau_parentesco(cod_grau_parentesco)', 'paciente_grau_parentesco'),
      field('cod_estado_civil').references('tab_estado_civil(cod_estado_civil)', 'paciente_estado_civil'),
      field('cod_escolaridade').references('tab_escolaridade(cod_escolaridade)', 'paciente_escolaridade'),
    ];
  }
  
  // getDefaults() {
  //   return [
  //     ` INSERT INTO tab_paciente (nome_paciente, apelido_paciente, nr_prontuario, cod_funcionario, cod_convenio, dt_nascimento, dt_cadastro, idade_anos, nr_convenio, plano_convenio, dt_validade_convenio, nome_cartao_unimed, nr_cns, profissao, local_trabalho, cod_estado_civil, cod_escolaridade, natural_de, particularidades, indicado, procedencia, cod_sexo, cutis, altura, peso_nascimento, tipo_sangue, fator_rh, cpf, rg, dt_expedicao, orgao_espedicao, perimetro_cefalico, endereco, cod_cidade, cod_bairro, cep, telefone_1, telefone_2, telefone_3, cod_responsavel, nome_responsavel, cod_grau_parentesco, responsavel_profissao, filiacao, email, obito_dt_hr, obito_informado, trh_dt_inicio, trh_dt_suspenso, trh_intermitente, indice_gail_dt, indice_gail, parto, leite_materno, idade_amamentado, filhos_casal, idade_meses, status_financeiro, status_guia, dt_hr_ultima_alteracao, ecocardiograma, holter, mapa, exames_laboratorias, ergometrico, status_excluido) VALUES 
  //       ('VALDEMIR DA SILVA', 'VAL', 1, 2, 1, '1990-01-17 17:34:07', '2018-08-07 17:34:46', 28, '9854', '150 1497279', '2020-01-01 18:06:47', 'VALDEMIR DA SILVA', '123', 'PROGRAMADOR', 'UPGRADE SISTEMAS', 2, 7, 1, NULL, NULL, NULL, 1, 'B', 1.7300000, NULL, 'O', NULL, '08223565478', '156786852', NULL, 'SSP', NULL, 'RUA ALBUQUERQUE', 1, 2, '87720231', '998606554', NULL, NULL, 0, NULL, 0, NULL, NULL, NULL, NULL, 'N', NULL, NULL, 'N', NULL, NULL, NULL, 'S', NULL, 0, 0, 'N', 'N', NULL, NULL, NULL, NULL, NULL, NULL, 'N');`,
  //   ];
  // }
});
