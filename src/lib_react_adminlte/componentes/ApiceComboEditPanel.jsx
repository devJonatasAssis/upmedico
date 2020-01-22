import React from 'react';
import Button from './Button.jsx';
import Input from './Input.jsx';
import GenericUtils from '../../lib_react_frontend/utils/GenericUtils.jsx';
import ModalSearch from './ModalSearch.jsx';
import { Column } from './Table.jsx';

/**
 * Componente padrão da apice de buscar registros no banco de dados.
 */
export default class ApiceComboEditPanel extends React.Component {
  static inputId = 0;

  constructor() {
    super();
    this.id = 'apice-combo-edit-panel-' + ApiceComboEditPanel.inputId++;
    this.state = {
      desc: '',
      registros: [],
      ultimoCodigoValido: '',
      valorOnFocus: 0, // Valor ao entrar no onFocus
    };
  }

  /**
   * @override
   */
  componentDidMount() {
    if (this.props.dinamico) {
    return;
    }
      this.carregarRegistros();

  }

  /**
   * @override
   */
  async componentWillReceiveProps(nextProps) {
    if (nextProps.where != this.props.where) {
      await this.carregarRegistros(nextProps.where);
    }
    if (nextProps.value != this.props.value) {
      this.carregarDesc(nextProps.value);
    }
  }

  /**
   * Handler do onChange do input de código.
   */
  onChange(e) {
    if (this.props.dinamico) {
      this.carregarRegistros(this.props.chave + '=' + e.target.value);
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
    this.carregarDesc(e.target.value);
  }

  /**
   * Chamado quando o input perde o foco.
   */
  onBlur() {
    if (!this.props.zeraCampo) {
      if (!this.state.desc) {
        this.onChange({
          target: {
            value: this.state.ultimoCodigoValido,
          },
        });
      }
    }
    if (this.campoCodigo.props.value === '') {
      this.onChange({
        target: {
          value: 0,
        },
      });
    }
    if (this.props.onBlur) {
      this.props.onBlur(this.state.valorOnFocus != this.props.value);
    }
  }

  /**
   * Chamado quando o input ganha o foco.
   */
  onFocus() {
    this.setState({ valorOnFocus: this.props.value });
  }

  /**
   * Chamado quando o modal de pesquisa for confirmado.
   */
  onConfirmModal(registro) {
    if (!registro) {
      return;
    }
    this.onChange({
      target: {
        value: registro[this.props.chave],
      },
    });
  }

  /**
   * Retorna o objeto de Api para uso no backend.
   */
  getApi() {
    if (this.props.api) {
      return this.props.api;
    }
    throw new Error('API não especificada para o componente ApiceComboEditPanel!');
  }

  /**
   * Retorna o campo de descrição do painel desabilitado.
   */
  getDesc() {
    return this.state.desc;
  }

  /**
   * Retorna o where da pesquisa do modal.
   */
  getWherePesquisa(texto) {
    return `${this.props.desc} like '%${texto}%'
            ${this.props.where ? ' and ' + this.props.where : ''}`;
  }

  /**
   * Carrega o campo de descrição com base no código que está escrito.
   */
  carregarDesc(codigo) {
    if (codigo) {
      const reg = this.state.registros.find((x) => x[this.props.chave] == codigo);
      if (reg && reg[this.props.desc]) {
        this.setState({ desc: reg[this.props.desc], ultimoCodigoValido: codigo });
      } else {
        this.setState({ desc: '' });
      }
    } else {
      this.setState({ desc: '' });
    }
  }

  /**
   * Carrega os registros do banco de dados.
   */
  async carregarRegistros(where) {
    GenericUtils.setElementoCarregando(this.divPrincipal, true, '2');
    const Api = this.getApi();
    const ret = await Api.buscar(this.props.tabela, '', where || this.props.where || '');
    if (ret.status) {
      this.setState({ registros: ret.dados }, () => {
        GenericUtils.setElementoCarregando(this.divPrincipal, false);
        this.carregarDesc(this.props.value);
      });
    }
  }

  limparUltimoCodigoValidado() {
    this.setState({ ultimoCodigoValido: 0 });
  }

  /**
   * Abre a pesquisa.
   */
  mostrarPesquisa() {
    this.modal.show(() => {
      if (this.props.value) {
        // Se tem um código definido.
        this.modal.selecionarRegistroByCampo(this.props.chave, this.props.value);
      }
    });
  }

  /**
   * Renderiza as colunas da pesquisa.
   */
  renderColunasPesquisa() {
    return this.props.colunas ? this.props.colunas.map((x) => (
      <Column key={x.props.field} style={x.props.style} header={x.props.header} field={x.props.field} />
    )) : [];
  }

  render() {
    return (
      <div className="relative" ref={e => this.divPrincipal = e}>

        {this.props.label && <label htmlFor={this.id}>{this.props.label}</label>}
        <div className="input-group d-flex flex-row mb-5">
          {/* Input do código: */}
          <Input value={this.props.value}
                 onChange={this.onChange.bind(this)}
                 onBlur={this.onBlur.bind(this)}
                 ref={e => this.campoCodigo = e}
                 onFocus={this.onFocus.bind(this)}
                 disabled={this.props.disabled}
                 id={this.id}
                 className="cod-apice-panel flex-wrap" />

          {/* Botão da lupa: */}
          <span className="input-group-bxtn flex-wrap" >
            <Button icon="fa-search"
                    tabIndex="-1"
                    className="btn-flat btn-primary"
                    disabled={this.props.disabled}
                    onClick={this.mostrarPesquisa.bind(this)} />
          </span>

          {/* Descrição: */}
          <Input disabled
                 value={this.state.desc}
                 className="flex" />
        </div>

        <ModalSearch titulo="Pesquisa de registros"
                     ref={e => this.modal = e}
                     tabela={this.props.tabela}
                     api={this.getApi()}
                     renderColunas={this.renderColunasPesquisa.bind(this)}
                     getWhere={this.getWherePesquisa.bind(this)}
                     onConfirm={this.onConfirmModal.bind(this)} />
      </div>
    );
  }

}
