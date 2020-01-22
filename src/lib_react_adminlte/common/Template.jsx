import React from 'react';
import { Column } from '../componentes/Table.jsx';

export function getColunasFuncionario() {
  return [
    <Column key={1} field="cod_funcionario"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={2} field="nome_funcionario"
                    style={{ width:110 + 'px' }} header="Funcionário" />,
    <Column key={3} field="tp_usuario"
                    style={{ width:45 + 'px' }} header="Tipo Funcionário" />,
  ];
}

export function getColunasNivel() {
  return [
    <Column key={0} field="cod_nivel"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="descricao" header="Nível" />,
  ];
}

export function getColunasEmpresa() {
  return [
    <Column key={0} field="cod_empresa"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="nome_fantasia" header="Nome Fantasia" />,
  ];
}

export function getColunasCompraProduto() {
  return [
    <Column key={0} field="cod_produto"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="nome_produto" header="Produto" />,
  ];
}

export function getColunasCompraFornecedor() {
  return [
    <Column key={0} field="cod_funcionario"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="nome_funcionario" header="Fornecedor" />,
  ];
}

export function getColunasAgendaPaciente() {
  return [
    <Column key={0} field="cod_paciente"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="nome_paciente" header="Paciente" />,
  ];
}

export function getColunasAgendaMedico() {
  return [
    <Column key={0} field="cod_funcionario"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="nome_funcionario" header="Médico" />,
  ];
}

export function getColunasConvenio() {
  return [
    <Column key={0} field="cod_convenio"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="nome_convenio" header="Convênio" />,
  ];
}

export function getColunasEstadoCivil() {
  return [
    <Column key={0} field="cod_estado_civil"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="estado_civil" header="Estado Civil" />,
  ];
}

export function getColunasEscolaridade() {
  return [
    <Column key={0} field="cod_escolaridade"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="escolaridade" header="Escolaridade" />,
  ];
}

export function getColunasSexo() {
  return [
    <Column key={0} field="cod_sexo"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="descricao" header="Sexo" />,
  ];
}

export function getColunasCidade() {
  return [
    <Column key={0} field="cod_cidade"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="cidade" header="Cidade" />,
  ];
}

export function getColunasBairro() {
  return [
    <Column key={0} field="cod_bairro"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="bairro" header="Bairro" />,
  ];
}

export function getColunasResponsavel() {
  return [
    <Column key={0} field="cod_paciente"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="nome_paciente" header="Responsável" />,
  ];
}

export function getColunasGrauParentesco() {
  return [
    <Column key={0} field="cod_grau_parentesco"
                    style={{ width:35 + 'px' }} header="Código" />,
    <Column key={1} field="nome_grau_parentesco" header="GrauParentesco" />,
  ];
}
