import React from 'react';

import Button from '../lib_react_adminlte/componentes/Button.jsx';
import InputGroup from '../lib_react_adminlte/componentes/InputGroup.jsx';
import { Table } from '../lib_react_adminlte/componentes/Table.jsx';

export default class InputTextArea extends React.Component {
  
  state = {
    filtro: '',
  }
  /**
   * Renderiza a página de listagem do cadastro.
   * Deve ser mandado o prop 'renderColunas' para esse componente.
   */
  renderList() {
    const actions = [{
      label: 'Incluir',
      icone: 'fa-plus',
      className: ' btn-primary ',
      tipo: Table.ACAO_CABECALHO,
    }, {
      label: 'Alterar',
      icone: 'fa-pencil',
      className: ' btn-primary ',
      tipo: Table.ACAO_CABECALHO,
    }, {
      label: 'Excluir',
      icone: 'fa-trash',
      className: ' btn-danger btn-primary ',
      tipo: Table.ACAO_CABECALHO,
    },
    ...(this.props.botoes || {})
    ];
    return (
      <div>
        <div className="d-flex flex-row">
          {/* Input de filtro: */}
          <div className="flex ml-5">
            <InputGroup value={this.state.filtro}
                        onChange={e => this.setState({ filtro: e.target.value })}
                        placeholder="Digite seu filtro"
                        buttonLabel="Filtrar!"
                        buttonClassName={'btn-success'} />
          </div>
        </div>

        <div className="relative" style={{ overflow: 'auto' }}>
          {/* Tabela de registros: */}
          <Table header="Registros"
                 data={this.props.dados || []}
                 hideActions
                 actions={actions}>
            {this.props.children}
          </Table>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div >
        {this.renderList()}
      </div>
    );
  }


  /**
   * Evento chamado quando o componente de input é mudado.
   */
  // onChange(e) {
  //   if (this.props.uppercase === undefined || this.props.uppercase === true) {
  //     e.target.value = e.target.value.toUpperCase();
  //   }
  //   if (this.props.onChange) {
  //     this.props.onChange(e.target.value);
  //   }
  // }

  // render() {
  //   const { uppercase, ...rest } = this.props;
  //   return (
  //     <div>
  //       <label>{this.props.label}</label>
  //       <textarea {...rest}
  //                 className={'form-control text-uppercase ' + this.props.classname}
  //                 onChange={this.onChange.bind(this)} />
  //     </div>
  //   );
  // }

};