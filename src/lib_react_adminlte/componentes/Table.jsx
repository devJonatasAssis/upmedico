import React from 'react';
import $ from 'jquery';
import Button from './Button';

/**
 * Componente de tabela padrão do LTE.
 */
export class Table extends React.Component {

  static uniqueId = 0;

  // Os tipos de ação:
  static ACAO_CABECALHO = 1;
  static ACAO_TABELA    = 2;

  constructor() {
    super();
    this.id = 'table-' + Table.uniqueId++;
  }

  componentDidMount() {
    $('#' + this.id).dblclick(() => {
      if (this.props.onDoubleClick) {
        this.props.onDoubleClick();
      }
    });
  }

  /**
   * Chamado quando o usuário clica em uma das ações.
   */
  onActionClick(nome, item) {
    if (this.props.onActionClick) {
      this.props.onActionClick(nome, item);
    }
  }

  onSelectItem(item) {
    if (this.props.onSelectItem) {
      this.props.onSelectItem(item);
    }
  }

  getActions(tipo) {
    return (this.props.actions || []).filter(x => x.tipo === tipo);
  }

  getRowStyle(item, col) {
    const style = {};
    if (this.props.tableColor) {
      for (const c of this.props.tableColor) {
        const cond = c.condition;
        for (const key in cond) {
          if (cond.hasOwnProperty(key) && item[key] === cond[key]) {
            style.backgroundColor = c.backgroundColor;
            style.fontWeight = c.fontWeight || 'bold';
            style.color = c.color || 'white';
          }
        }
      }
    }
    if (this.props.selectedItem === item) {
      style.backgroundColor = 'rgba(60, 141, 188, .92)';
      style.fontWeight = 'bold';
      style.color = 'white';
    }
    if (col.props.style) {
    style.width = col.props.style.width;
    } else {
      style.width = '130px';
    }
    return style;

  }

  /**
   * Retorna as colunas passadas como filhas e uma coluna adicional de ações.
   */
  getColumns() {
    let children = [];
    if (this.props.children.length) {
      children = [...this.props.children];
    } else {
      children.push(this.props.children);
    }
    if (!this.props.hideActions) {
      // Só podemos mostrar se não temos que esconder a ação.
      children.push(<Column action key={-1} header="Ações" className='th-action' />);
    }
    return children;
  }

  /**
   * Renderiza o thead.
   */
  renderColumns() {
    const c = this.getColumns();
    const o = [];
    for (let i = 0; i < c.length; i++) {
      o.push(c[i].props.action ? (
        <th key={c[i].key}
            className={'text-center th-actxion'}>
          {c[i].props.header}
        </th>
      ) : (
        <th key={c[i].key}
            aria-controls="example2"
            style={c[i].props.style || { width: 130 + 'px' }}
            rowSpan="1"
            colSpan="1"
            className={'sorting' + c[i].props.className}>
          {c[i].props.header}
        </th>
      ));
    }
    return o;
  }

  /**
   * Renderiza o tbody.
   */
  renderRows() {
    return this.props.data.map((item, index) => (
      <tr key={index}>
        {this.getColumns().map((col) => {
          let value = item[col.props.field];
          if (col.props.field && col.props.field.indexOf('.') >= 0) {
            value = item[col.props.field.split('.')[0]];
            value = value[col.props.field.split('.')[1]];
          }
          return col.props.action ? (
            // Se for a coluna de ações, então vamos mandar as ações
            // padrões ao invés do conteúdo do item:
            <td key={col.key} className="text-center wx-100 mt-5 mb-5 th-actxion">
              {/* Renderiza as ações do cabeçalho: */}
              {this.getActions(Table.ACAO_TABELA).map(x => (
                <Button key={x.id}
                        className={x.className}
                        icon={x.icone}
                        disabled={x.disabled}
                        onClick={this.onActionClick.bind(this, x.id, item)} />
              ))}
            </td>
          ) : (
            <td key={col.key}
                className={this.props.selectable ?
                  'selectable-td ' + col.props.className : '' + col.props.className}
                style={this.getRowStyle(item, col)}
                onClick={this.onSelectItem.bind(this, item)}>
              {value}
            </td>
          );
        })}
      </tr>

    ));
  }

  renderMsgVazio() {
    return (
      <div className="msg-table-vazio">
        Nenhum registro encontrado
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        <fieldset className="mt-10">
          {/* Título: */}
          <legend className="table-legend">{this.props.header}</legend>

          {/* Renderiza as ações do cabeçalho: */}
          <div className="inline-block mb-10">
            {this.getActions(Table.ACAO_CABECALHO).map(x => (
              <Button key={x.id}
                      className={x.className + ' mr-5'}
                      icon={x.icone}
                      label={x.label}
                      disabled={x.disabled}
                      onClick={this.onActionClick.bind(this, x.id)} />
            ))}
          </div>
          {this.props.inputPesquisa}
          {/* Table: */}
          <table className={(this.props.tableClassName ? this.props.tableClassName : '')
                            + 'table table-border table-hover dataTable ' +
                            (this.props.scrollable ? ' scrollable ' : '')}
                 id={this.id}
                 role="grid">
            <thead>
              <tr role="row">
                {this.renderColumns()}
              </tr>
            </thead>
            {this.props.data && !this.props.data.length ? (
              this.renderMsgVazio()
            ) : (
              <tbody style={{ maxHeight: this.props.maxHeight }}>
                {this.renderRows()}
              </tbody>
            )}
          </table>
        </fieldset>
      </div>
    );
  }

}

export class Column extends React.Component {
  field  = '';
  header = '';
  action = false;
  icon   = '';
  key    = '';
  style  = {};
  className = ''; // Para usar quando action
}
