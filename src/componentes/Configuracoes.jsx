import React from 'react';
import { connect } from 'react-redux';

import ContentWrapper from '../lib_react_adminlte/componentes/ContentWrapper.jsx';
import Button from '../lib_react_adminlte/componentes/Button.jsx';
import Checkbox from '../lib_react_adminlte/componentes/Checkbox.jsx';
import LabeledInput from '../lib_react_adminlte/componentes/LabeledInput.jsx';
import GenericUtils from '../lib_react_frontend/utils/GenericUtils.jsx';
import ApiceComboEditPanel from '../lib_react_adminlte/componentes/ApiceComboEditPanel.jsx';
import InputDate from '../lib_react_adminlte/componentes/InputDate.jsx';
import InputTime from '../lib_react_adminlte/componentes/InputTime.jsx';
import InputCalc from '../lib_react_adminlte/componentes/InputCalc.jsx';
import { RadioButton } from '../lib_react_adminlte/componentes/RadioGroup.jsx';

import Api from '../utils/Api.jsx';

import ConfigGeral from './ConfigGeral.jsx';
import ConfigGeralUsuario from './ConfigGeralUsuario.jsx';
import ConfigSenha from './ConfigSenha.jsx';

/**
 * Componente de configurações.
 */
class Configuracoes extends React.Component {

  state = {
    tab_config: {},
    // tab_config2: {},
    // tab_config3: {},
    // tab_config7: {},
    // tab_config9: {},
    // tab_config12: {},
  };

  async componentWillMount() {
    // Vamos mapear as configurações que estão no state, transformando-as em um array:
    const arr = [];
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        arr.push(key);
      }
    }

    // Vamos requisitar essas tabelas no back:
    const ret = await Api.getConfigs(arr);
    if (ret.status) {
      this.setState(ret.dados);
    }
  }

  /**
   * Handler de um change de checkbox.
   */
  onCheckboxChange(tabela, nome, valor) {
    this.setState({
      [tabela]: {
        ...this.state[tabela],
        [nome]: valor ? 'S' : 'N',
      },
    });
  }

  /**
   * Handler de um change de input
   */
  onInputChange(tabela, nome, valor) {
    this.setState({
      [tabela]: {
        ...this.state[tabela],
        [nome]: valor,
      },
    });
  }

  /**
   * Salva as configurações no banco de dados.
   */
  async salvar() {
    GenericUtils.setElementoCarregando(this.divConfigs, true);

    // Percorrer as configs:
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        // Iremos percorrer os campos de cada configuração e transformar
        // em maiusculo, para corrigir os enums que ficam minusculo ou não:
        const config = Object.assign({}, this.state[key]);
        for (const configKey in config) {
          if (config.hasOwnProperty(configKey)) {
            if (typeof config[configKey] === 'string') {
              config[configKey] = config[configKey].toUpperCase();
            }
          }
        }
      }
    }

    await Api.setConfigs(this.state);
    GenericUtils.setElementoCarregando(this.divConfigs, false);
    this.props.dispatch({
      type: 'set_config',
      config: (await Api.getConfigs(['tab_config'])).dados
    })
  }

  /**
   * Renderiza um checkbox.
   */
  renderCheckbox(text, campo, config, className) {
    const tabConfig = (config || 'tab_config');
    return (
      <Checkbox text={text}
                className={className}
                checked={this.state[tabConfig][campo] === 'S'}
                onChange={e => this.onCheckboxChange(tabConfig, campo, e.target.checked)} />
    );
  }

  /**
   * Renderiza um input com label porém que só pode numeros.
   */
  renderInputNumber(label, campo, min, max, config) {
    const tabConfig = (config || 'tab_config');
    return (
      <LabeledInput label={label}
                    value={this.state[tabConfig][campo]}
                    min={min}
                    max={max}
                    type="number"
                    onChange={e => this.onInputChange(tabConfig, campo, e.target.value)}
                    className="mb-5" />
    );
  }

  /**
   * Renderiza um input com label
   */
  renderLabeledEdit(label, campo, config) {
    const tabConfig = (config || 'tab_config');
    return (
      <LabeledInput label={label}
                    value={this.state[tabConfig][campo]}
                    onChange={e => this.onInputChange(tabConfig, campo, e.target.value)}
                    className="mb-5" />
    );
  }
  
  /**
   * Renderiza um Colorpicker
   *
   */
  renderColor(label, campo, config) {
    const tabConfig = (config || 'tab_config');
    return (
      <LabeledInput label={label}
                    type={'color'}
                    value={this.state[tabConfig][campo]}
                    onChange={e => this.onInputChange(tabConfig, campo, e.target.value)}
                    className="mb-5" />
    );
  }
  /**
   * Renderiza o componente padrão de registros da apice.
   */
  renderApiceComboEditPanel(label, campo, tabela, chave, desc, colunas, config) {
    const tabConfig = (config || 'tab_config');
    return (
      <ApiceComboEditPanel label={label}
                           tabela={tabela}
                           chave={chave}
                           desc={desc}
                           colunas={colunas}
                           value={this.state[tabConfig][campo]}
                           onChange={e => this.onInputChange(tabConfig, campo, e.target.value)}
                           api={Api} />
    );
  }

  /**
   * Renderiza uma radioButton.
   */
  renderRadioButton(campo, label, valor, config) {
    const tabConfig = (config || 'tab_config');
    return (
      <RadioButton name={campo}
                   text={label}
                   checked={this.state[tabConfig][campo] === valor}
                   onChange={() => this.onInputChange(tabConfig, campo, valor)} />
    );
  }

  /**
   * Renderiza um input que somente aceita datas.
   */
  renderInputDate(label, campo, config) {
    const tabConfig = (config || 'tab_config');
    return (
      <InputDate value={this.state[tabConfig][campo]}
                 label={label}
                 onChange={e => this.onInputChange(tabConfig, campo, e.target.value)} />
    );
  }

  /**
   * Renderiza um input que aceita pontos flutuantes.
   */
  renderInputCalc(label, campo, config) {
    const tabConfig = (config || 'tab_config');
    return (
      <InputCalc value={this.state[tabConfig][campo]}
                 label={label}
                 onChange={e => this.onInputChange(tabConfig, campo, e)} />
    );
  }

  /**
   * Renderiza um input que aceita horários.
   */
  renderInputTime(label, campo, config) {
    const tabConfig = (config || 'tab_config');
    return (
      <InputTime value={this.state[tabConfig][campo]}
                 label={label}
                 onChange={e => this.onInputChange(tabConfig, campo, e.target.value)} />
    );
  }

  /**
   * Renderiza uma configuração do sistema.
   */
  renderConfig(Config) {
    return (
      <Config checkbox={this.renderCheckbox.bind(this)}
              input={this.renderLabeledEdit.bind(this)}
              inputNumber={this.renderInputNumber.bind(this)}
              inputDate={this.renderInputDate.bind(this)}
              inputTime={this.renderInputTime.bind(this)}
              inputCalc={this.renderInputCalc.bind(this)}
              inputColor={this.renderColor.bind(this)}
              apiceComboEditPanel={this.renderApiceComboEditPanel.bind(this)}
              radioButton={this.renderRadioButton.bind(this)} />
    );
  }

  render() {
    if (this.props.funcionario) {
      if (this.props.funcionario.cod_nivel === 1) {
        return (
          <ContentWrapper title="Configurações do sistema"
                          small="Configure seu sistema!">

            <div className="relative mb-10"
                 ref={e => this.divConfigs = e}>

              {this.renderConfig(ConfigGeral)}
            </div>

            <Button icon="fa-check"
                    label="Gravar alterações"
                    className="btn-success"
                    onClick={this.salvar.bind(this)} />
          </ContentWrapper>
        );
      }
      return (<ContentWrapper title="Configurações do sistema"
                          small="Configure seu sistema!">

            <div className="relative mb-10"
                 ref={e => this.divConfigs = e}>

              {this.renderConfig(ConfigGeralUsuario)}
              {this.renderConfig(ConfigSenha)}
            </div>

            <Button icon="fa-check"
                    label="Gravar alterações"
                    className="btn-success"
                    onClick={this.salvar.bind(this)} />
          </ContentWrapper>);

    }
    return (
      <ContentWrapper title="Configurações do sistema"
                          small="Configure seu sistema!" />
    );
  }

}
export default connect((state) => ({
  funcionario: state.funcionario,
}))(Configuracoes);
