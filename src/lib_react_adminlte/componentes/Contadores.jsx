import React from 'react';

class Contadores extends React.Component {
  getDiferenca() {

    const var1 = this.props.faturamento.faturamento;
    const var2 = this.props.faturamentoAnt.faturamentoant;
    const var3 = Math.round(((var1 / var2) * 100) - 100);

    return var3;

  }
  getReceita() {
    const var1 = this.props.receitas.receitatotal - this.props.cancelamentos.cancelamentos;
    return var1.toFixed(2).replace('.', ',');
  }
  getVendas() {
    const var1 = this.props.vendas.vendatotal - this.props.cancelamentos.cancelamentos;
    return var1.toFixed(2).replace('.', ',');
  }
  renderTotal() {
    if (this.props.totalPessoas) {
    return (
    <div className="info-box" id='totalPessoas'>
    <span className="info-box-icon bg-purple"
      style={{ width:25 + '%' }}><i className="fa fa-users" /></span>
    <div className="info-box-content">
      <span className="info-box-text">Total de Pessoas</span>
      <span className="info-box-number" style={{ fontSize: 26 + 'px' }}>
        {this.props.totalPessoas ? this.props.totalPessoas.length : 0}</span>
      <span className='rodaContador'>
      {this.props.pessoasLocal ? this.props.pessoasLocal.length : 0} no local</span>
      </div>
      </div>);
      }
      return;
  }
  renderPermMedia() {
   if (this.props.permMedia) {
     return (<div className="info-box" id='PermaMedia' >
      <span className="info-box-icon bg-blue"
      style={{ width:25 + '%' }}><i className="fa fa-refresh" /></span>
      <div className="info-box-content">
      <span className="info-box-text">Permanencia Media</span>
      <span className="info-box-number" style={{ fontSize: 26 + 'px' }}>
      {this.props.permMedia.permanencia ? this.props.permMedia.permanencia : 0}
      </span>
      </div>
      </div>);
  }
    return null;
  }
  renderReceita() {
    if (this.props.receitas) {
      return (<div className="info-box" id='receitas'>
      <span className="info-box-icon bg-green"
        style={{ width:25 + '%' }}><i className="fa fa-money" /></span>
      <div className="info-box-content">
        <span className="info-box-text">Receitas</span>
        <span className="info-box-number" style={{ fontSize: 26 + 'px' }}>
          R$ {this.getReceita() ? this.getReceita() : 0}
        </span>
        <span className='rodaContador'>
        R$ {this.getVendas() ? this.getVendas() : 0} Vendas
        </span>

      </div>
      </div>);
   }
     return null;
   }

  renderFaturamento() {
    if (this.props.faturamento) {
      return (<div className="info-box" id='faturamento'>
      <span className="info-box-icon bg-yellow"
        style={{ width:25 + '%' }}><i className="fa fa-area-chart" /></span>
      <div className="info-box-content">
        <span className="info-box-text">Faturamento</span>
        <span className="info-box-number" style={{ fontSize: 26 + 'px' }}>
        R$ {this.props.faturamento.faturamento ?
            this.props.faturamento.faturamento.toFixed(2).replace('.', ',') : 0}</span>
        <span className='rodaContador'>
          {this.getDiferenca()} % de aumento no periodo
          </span>
      </div>
     </div>);
   }
     return null;
   }

  renderDespesas() {
    if (this.props.despesas) {
      return (<div className="info-box" id='despesas'>
      <span className="info-box-icon bg-red"
        style={{ width:25 + '%' }}><i className="fa fa-shopping-cart" /></span>
      <div className="info-box-content">
        <span className="info-box-text">Despesas</span>
        <span className="info-box-number" style={{ fontSize: 26 + 'px' }}>
          R$ {this.props.despesas.despesasmes ?
            this.props.despesas.despesasmes.toFixed(2).replace('.', ',') : '0,00'} </span>
        <span className='rodaContador'>
          R$ {this.props.despesasDia.despesasdia ?
            this.props.despesasDia.despesasdia.toFixed(2).replace('.', ',') : '0,00'} pago</span>
      </div>
      </div>);
   }
     return null;
   }

  renderClientes() {
    if (this.props.numClientes) {
      return (<div className="info-box" id='pessoas' >
      <span className="info-box-icon bg-purple"
        style={{ width:25 + '%' }}><i className="fa fa-user" /></span>
      <div className="info-box-content">
        <span className="info-box-text">Pessoas</span>
        <span className="info-box-number" style={{ fontSize: 26 + 'px' }}>
        {this.props.numClientes.length}</span>
        <span className='rodaContador'>
          {this.props.novosClientes ? this.props.novosClientes.length : 0} Pessoas Novas Cadastradas
        </span>
      </div>
      </div>);
   }
     return null;
   }

  render() {
    return (
      <div className='Contadores'>
        {this.renderTotal()}
        {this.renderPermMedia()}
        {this.renderReceita()}
        {this.renderFaturamento()}
        {this.renderDespesas()}
        {this.renderClientes()}
      </div>

    );
  }
}
export default Contadores;
