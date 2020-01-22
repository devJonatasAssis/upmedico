import React from 'react';
import _ from 'lodash';
import { Table } from './Table.jsx';
import Button from './Button.jsx';
import Input from './Input.jsx';
export default class RecordSelect extends React.Component {

  state = {
    empresaNIndex: null,
    empresaIndex: null,
    listaTemp: [],
    filtro:'',
  }

  componentWillReceiveProps(nextProps) {
    if (!this.first && nextProps.listaNaoAdicionado.length) {
      this.first = true;
      this.setState({ listaTemp: nextProps.listaNaoAdicionado });
    }
  }

  onClickMudar(tipo) {
    const tempNaoAdicionado = Object.assign([], this.props.listaNaoAdicionado);
    const tempAdicionado = Object.assign([], this.props.listaAdicionado);
    if (tipo === 1 /* Vincular */) {
      const item = _.remove(tempNaoAdicionado, (x) => x.id == this.state.empresaNIndex.id);
      this.props.onChangeNaoAdicionado(tempNaoAdicionado);
      this.props.onChangeAdicionado(tempAdicionado.concat(item));
      this.setState({ empresaNIndex: null }, () => this.pesquisar());
    } else {
      const item = _.remove(tempAdicionado, (x) => x.id == this.state.empresaIndex.id);
      this.props.onChangeNaoAdicionado(tempNaoAdicionado.concat(item));
      this.props.onChangeAdicionado(tempAdicionado);
      this.setState({ empresaIndex: null }, () => this.pesquisar());
    }
  }
  pesquisar() {
    const exibir = [];
    for (const x of this.props.listaNaoAdicionado) {
      if (x.razao_social.indexOf(this.state.filtro) !== -1 || x.doc_federal.indexOf(this.state.filtro) !== -1) {
        exibir.push(x);
      }
    }
    this.setState({ listaTemp: exibir });
  }
  renderSeparator() {
    return (
      <div className=" flex-wrap d-flex flex-col"
           style={{ marginRight: '10px', 
           justifyContent: 'center',
                    marginLeft: '10px' }}>
        <div className="flex" 
          style={{ verticalAlign: 'middle', justifyContent: 'center', marginTop:80 + 'px' }}>
          <Button icon="fa-arrow-right" 
                  className="btn-primary btn-flat" 
                  disabled={!this.state.empresaNIndex} 
                  onClick={this.onClickMudar.bind(this, 1)} />
          <Button icon="fa-arrow-left" 
                  className="btn-primary btn-flat" 
                  disabled={!this.state.empresaIndex} 
                  onClick={this.onClickMudar.bind(this, 2)} />
        </div>
      </div>
    );
  }

  renderTable(header, lista, nomeItem, input) {
    let inputPesquisa;
    if (input) {
      inputPesquisa = (<Input value={this.state.filtro}
        placeholder='Pesquisar'
        onChange={e => this.setState({ filtro: e.target.value },
        () => { this.pesquisar(); })}  />);
    }


    return (<div>
     
      <Table hideActions header={header} 
             data={lista}
             inputPesquisa={inputPesquisa}
             tableClassName='hx-300 '
             selectable
             onSelectItem={e => this.setState({ [nomeItem]: e })}
             selectedItem={this.state[nomeItem]}>
        {this.props.colunas}
      </Table>
      
      </div>
    );
  }

  render() {
    return (   
        <div className="d-flex flex-row">
          
          {this.renderTable(this.props.tituloNaoAdicionado, this.state.listaTemp, 'empresaNIndex', 1)}
          
          {this.renderSeparator()}
          {this.renderTable(this.props.tituloAdicionado, this.props.listaAdicionado, 'empresaIndex')}
        </div>   
    );
  }

}
