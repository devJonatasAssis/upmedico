const EntidadeSinc = require('../lib_react_backend/sincronizacao/EntidadeSinc');
const field = require('../lib_react_backend/sincronizacao/field');

module.exports = (class Empresa extends EntidadeSinc {

  constructor() {
    super('tab_empresa');
  }

  getFields() {
    return [
      field('cod_empresa').pk(),
      field('nome_fantasia').varchar(255),
      field('razao_social').varchar(255),
      field('nr_palheta_ativa').int(2).default(1),
      field('cnpj').varchar(50),
      field('inscricao_estadual').varchar(20),

      // FILIAL
      field('status_compartilha_paciente').enum('S', 'N').default('N'),
      field('status_traduzir').enum('S', 'N').default('N'),
      field('status_foto').enum('S', 'N').default('N'),
      field('status_agenda_nr_prontuario').enum('S', 'N').default('S'),
      field('status_dados_financeiros_ficha').enum('S', 'N').default('S'),
      field('cod_usuario').int(6).default('0'),
      field('codigo_cnes').varchar(10),
      field('endereco_filial').varchar(20),
      field('default_cidade').int(6).default('0'),
      field('default_bairro').int(6).default('0'),
      field('default_cep').varchar(8),
      field('telefone_filial').varchar(15),
      field('default_profissao').varchar(30),
      field('tipo_agenda').enum('H', 'O').default('H'),
      field('dados_extra').text(),

      // UNIMED
      field('status_atende_unimed').enum('S', 'N').default('S'),
      field('cod_convenio').int(6).default('0'),
      field('cidade_unimed').int(6).default('0'),
      field('vr_ch').decimal().default(0),
      field('unimed_usuario').varchar(255),
      field('unimed_senha').varchar(255),
      field('unimed_site_login').varchar(255),
      field('unimed_site_solicitacao').varchar(255),
      field('unimed_site_consulta1').varchar(255),
      field('unimed_site_consulta2').varchar(255),
      field('dt_expiracao').datetime(),
      field('status_impressoras').enum('S', 'N').default('N'),
      field('cod_faturamento').int(6).default('0'),
      field('unimed_login').enum('0', '1').default('0'),
      field('cod_idioma').int(6).default('0'),

    ];
  }

  getReferences() {
    return [
      field('cod_usuario').references('tab_funcionario(cod_funcionario)', 'empresa_funcionario'),
      field('default_cidade').references('tab_cidade(cod_cidade)', 'empresa_cidade'),
      field('default_bairro').references('tab_bairro(cod_bairro)', 'empresa_bairro'),
      field('cod_convenio').references('tab_convenio(cod_convenio)', 'empresa_convenio'),
      field('cidade_unimed').references('tab_cidade(cod_cidade)', 'empresa_cidade_unimed'),
    ];
  }
  
  getDefaults() {
    return [
      ` INSERT INTO tab_empresa (cod_empresa, nome_fantasia, razao_social, nr_palheta_ativa, cnpj, inscricao_estadual, status_compartilha_paciente, status_traduzir, status_foto, status_agenda_nr_prontuario, status_dados_financeiros_ficha, cod_usuario, codigo_cnes, endereco_filial, default_cidade, default_bairro, default_cep, telefone_filial, default_profissao, tipo_agenda, dados_extra, status_atende_unimed, cod_convenio, cidade_unimed, vr_ch, unimed_usuario, unimed_senha, unimed_site_login, unimed_site_solicitacao, unimed_site_consulta1, unimed_site_consulta2, dt_expiracao, status_impressoras, cod_faturamento, unimed_login, cod_idioma) VALUES 
        (NULL, 'FANTASIA DA EMPRESA', 'RAZÃO SOCIAL DA EMPRESA', 1, '01002003000104', '12542-23', 'N', 'N', 'N', 'S', 'S', 1, NULL, 'ENDEREÇO DA EMPRESA', 1, 1, '87710120', '34232323', 'PROFISSÃO DO DEFAULT', 'H', "DADOS COMPLEMENTARES (EXTRA)", 'S', 12345, 1, 0.2300000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'N', '0', '0', '0');`,
    ];
  }
});
