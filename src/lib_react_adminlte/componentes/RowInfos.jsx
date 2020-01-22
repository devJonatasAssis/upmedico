import React from 'react';
import { Gauge } from 'gaugeJS';

import GraficoPizza from './PieChart.jsx';

class RowInfos extends React.Component {
  state = {
    viewmeta:0,
    titutlometas:'Meta Anual',
  }
  componentDidMount() {
  }
  Barras() {
    let count = 0;
    const AEO = [];
    while (count < this.props.vendaGrupo.length) {

      if (this.props.vendaGrupo[count].somaGrupo !== 0) {
        const porc =
          Math.round((this.props.vendaGrupo[count].somaGrupo
                / this.props.receitas.receitatotal) * 100, 2);
        AEO.push(<div key={count} className='categoriaVendidas' style={{ height:70 + 'px' }}>
                <h4 style={{ width:80 + 'px' }}>{this.props.vendaGrupo[count].nomeGrupo} </h4>
                <div className="progress progress-xs" style={{ width: 74 + '%', float:'left' }}>
                <div className="progress-bar bg-green"
                     role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100"
                     style={{ width: porc + '%' }}>
                <span>{porc}%</span>
                </div>

              </div>

              <span>
                <strong style={{ fontSize: 18 + 'px' }}>
                R$ {this.props.vendaGrupo[count].somaGrupo.toFixed(2).replace('.', ',')}
                </strong></span>
              </div>);
      }
      count++;
    }
    if (this.props.taxas.taxaservico) {
      const porc =
          Math.round((this.props.taxas.taxaservico
                / this.props.receitas.receitatotal) * 100);
        AEO.push(<div className='categoriaVendidas' style={{ height:50 + 'px' }}>
                <h4 style={{ width:80 + 'px' }}> Taxas e Serviços </h4>
                <div className="progress progress-xs" style={{ width: 74 + '%', float:'left' }}>
                <div className="progress-bar bg-green"
                     role="progressbar" aria-valuenow="73" aria-valuemin="0" aria-valuemax="100"
                     style={{ width: porc + '%' }}>
                <span>{porc}%</span>
                </div>

              </div>

              <span>
                <strong style={{ fontSize: 18 + 'px' }}>
                R$ {this.props.taxas.taxaservico.toFixed(2).replace('.', ',')}
                </strong></span>
              </div>);

    }
    return AEO;
  }
  verMeta(meta) {
    if (meta === 0) {

      this.componentDidMount();
      return;
    } else if (meta === 1) {
      this.state.viewmeta = 1;
      this.componentDidMount();
      return;
    } else if (meta === 2) {
      this.state.viewmeta = 2;
      this.componentDidMount();
      return;
    } else if (meta === 3) {
      this.state.viewmeta = 3;
      this.componentDidMount();
      return;
    }
  }
  renderGraficoMetas(meta, progresso) {
    const opts = {
      MaxValue:2000,
      angle: 0, // The span of the gauge arc
      lineWidth: 0.4, // The line thickness
      radiusScale: 1, // Relative radius
      pointer: {
      length: 0.67, // // Relative to gauge radius
      strokeWidth: 0.035, // The thickness
      color: '#000000', // Fill color
      },
      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      colorStart: '#6FADCF',   // Colors
      colorStop: '#8FC0DA',    // just experiment with them
      strokeColor: '#E0E0E0',  // to see which ones work best for you
      highDpiSupport: true,     // High resolution support


    };
    const target = document.getElementById('foo'); // your canvas element
    const gauge = new Gauge(target).setOptions(opts); // create gauge!
    gauge.setMinValue(0);  // set min value
    gauge.maxValue = meta;
    gauge.set(progresso); // set actual value
  }

  renderMetas() {
    const calcMetas = [0, 0, 0, 0];
    if (this.props.meta.tipo_meta === 0) {
      calcMetas[0] = this.props.meta.vr_meta;
      calcMetas[1] = Math.round(this.props.meta.vr_meta / 12);
      calcMetas[2] = Math.round(this.props.meta.vr_meta / 54);
      calcMetas[3] = Math.round(this.props.meta.vr_meta / 365);
    } else if (this.props.meta.tipo_meta === 1) {
      calcMetas[0] = this.props.meta.vr_meta * 12;
      calcMetas[1] = this.props.meta.vr_meta;
      calcMetas[2] = Math.round(this.props.meta.vr_meta / 4);
      calcMetas[3] = Math.round(this.props.meta.vr_meta / 30);
    } else if (this.props.meta.tipo_meta === 2) {
      calcMetas[0] = this.props.meta.vr_meta * 54;
      calcMetas[1] = this.props.meta.vr_meta * 4;
      calcMetas[2] = this.props.meta.vr_meta;
      calcMetas[3] = Math.round(this.props.meta.vr_meta / 7);
    } else if (this.props.meta.tipo_meta === 3) {
      calcMetas[0] = this.props.meta.vr_meta * 365;
      calcMetas[1] = this.props.meta.vr_meta * 30;
      calcMetas[2] = this.props.meta.vr_meta * 7;
      calcMetas[3] = this.props.meta.vr_meta;
    }

    if (this.state.viewmeta === 0) {
      const AZ = (<div>
        <div className="sidebar-widget" id='MetaGauge'>
          <h4 style={{ marginLeft: 3 + '%' }}>Progresso atual</h4>

          <canvas id='foo' width='250' height='100' />
          {document.getElementById('foo') ?
          this.renderGraficoMetas(calcMetas[0], this.props.faturamentoano.faturamento) : null}
            {this.props.faturamentoano ? (
          <div >

            <span style={{ marginLeft: 3 + '%' }}>
            R$ { this.props.faturamentoano.faturamento ?
              this.props.faturamentoano.faturamento.toFixed(2).replace('.', ',')
              : 0}
            </span>
            <span id="goal-text" style={{ marginRight: 3 + '%' }}
            className="goal-value pull-right" >R$ {calcMetas[0].toFixed(2).replace('.', ',')}</span>
            </div>
            ) : null}
          </div>
        </div>);
      return AZ;

    } else if (this.state.viewmeta === 1) {
      const AZ = (<div>
      <div className="sidebar-widget" id='MetaGauge'>
        <h4 style={{ marginLeft: 3 + '%' }}>Progresso atual</h4>

        <canvas id='foo' width='250' height='100' />
          {document.getElementById('foo') ?
          this.renderGraficoMetas(calcMetas[1], this.props.faturamentomes.faturamento) : null}
          {this.props.faturamentomes ? (
      <div >
        <span style={{ marginLeft: 3 + '%' }}>
          R$ {this.props.faturamentomes.faturamento ?
            this.props.faturamentomes.faturamento.toFixed(2).replace('.', ',')
            : 0}
        </span>
        <span id="goal-text" style={{ marginRight: 3 + '%' }}
        className="goal-value pull-right" >R$ {calcMetas[1].toFixed(2).replace('.', ',')}</span>
      </div>
      ) : null}
      </div>

        </div>);
      return AZ;
    } else if (this.state.viewmeta === 2) {
      const AZ = (<div>
        <div className="sidebar-widget" id='MetaGauge'>
      <h4 style={{ marginLeft: 3 + '%' }}>Progresso atual</h4>

      <canvas id='foo' width='250' height='100' />
      {document.getElementById('foo') ?
      this.renderGraficoMetas(calcMetas[2], this.props.faturamentosemana.faturamento) : null}
        {this.props.faturamentosemana ? (
      <div >
        <span style={{ marginLeft: 3 + '%' }}>
        R$ {this.props.faturamentosemana.faturamento ?
          this.props.faturamentosemana.faturamento.toFixed(2).replace('.', ',')
          : 0}
        </span>
        <span id="goal-text" style={{ marginRight: 3 + '%' }}
        className="goal-value pull-right" >R$ {calcMetas[2].toFixed(2).replace('.', ',')}</span>
        </div>
      ) : null}
      </div>
        </div>);
      return AZ;
    } else if (this.state.viewmeta === 3) {
      const AZ = (<div>
        <div className="sidebar-widget" id='MetaGauge'>
      <h4 style={{ marginLeft: 3 + '%' }}>Progresso atual</h4>

      <canvas id='foo' width='250' height='100' />
      {document.getElementById('foo') ?
      this.renderGraficoMetas(calcMetas[3], this.props.receitas.receitatotal) : null}
        {this.props.receitas ? (
      <div >
        <span style={{ marginLeft: 3 + '%' }}>
        R$ {this.props.receitas.receitatotal ?
          this.props.receitas.receitatotal.toFixed(2).replace('.', ',') : 0}
        </span>
        <span id="goal-text" style={{ marginRight: 3 + '%' }}
        className="goal-value pull-right" >R$ {calcMetas[3].toFixed(2).replace('.', ',')}</span>
        </div>
      ) : null}
      </div>
        </div>);
      return AZ;
    }
    const AZ = (<div>
      <div className="sidebar-widget" id='MetaGauge'>
      <h4 style={{ marginLeft: 3 + '%' }}>Progresso atual</h4>

      <canvas id='foo' width='250' height='100' />
      {document.getElementById('foo') ? this.renderGraficoMetas(1, 0) : null}

    </div></div>);
  return AZ;

  }
  renderPagamentos() {
    const pagamentos = [];
    if (this.props.dinheiro.dinheiro > 0) {
      pagamentos.push(
        <tr key='3'>
          <td style={{ width:'25px' }}>
          <span style={{ display:'block', width:'25px', height:'25px', backgroundColor:'green' }} />
          </td>
          <td>Dinheiro</td>

          <td style={{ width:30 + '%', textAlign:'right' }}>
            R$ {this.props.dinheiro.dinheiro ?
              this.props.dinheiro.dinheiro.toFixed(2).replace('.', ',') : '0,00'}
          </td>
        </tr>
      );
    } if (this.props.Ccredito.credito > 0) {
      pagamentos.push(
      <tr key='0'>
        <td style={{ width:'25px' }}>
        <span style={{ display:'block', width:'25px', height:'25px', backgroundColor:'blue' }} />
        </td>
        <td>Cartão Credito</td>

        <td style={{ width:30 + '%', textAlign:'right' }}>
        R$ {this.props.Ccredito.credito ?
          this.props.Ccredito.credito.toFixed(2).replace('.', ',') : '0,00'}</td>
        </tr>);
    } if (this.props.Cdebito.debito > 0) {
      pagamentos.push(
        <tr key='1'>
          <td style={{ width:'25px', textAlign:'right' }}>
          <span style={{ display:'block', width:'25px', height:'25px', backgroundColor:'red' }} />
          </td>
          <td>Cartão Debito</td>

          <td style={{ width:'200px', textAlign:'right' }}>
          R$ {this.props.Cdebito.debito ?
            this.props.Cdebito.debito.toFixed(2).replace('.', ',') : '0,00'}</td>
        </tr>
      );
    } if (this.props.notinhas.notas > 0) {
      pagamentos.push(
        <tr key='2'>
          <td style={{ width:'25px' }}>
          <span style={{ display:'block',
                         width:'25px',
                         height:'25px',
                         backgroundColor:'yellow' }} />
          </td>
          <td>Notinhas</td>

          <td style={{ width:30 + '%', textAlign:'right' }}>
          R$ {this.props.notinhas.notas ?
            this.props.notinhas.notas.toFixed(2).replace('.', ',') : '0,00'}</td>
          </tr>

      );
    } if (this.props.cheque.cheque > 0) {
      pagamentos.push(
        <tr key='4'>
          <td style={{ width:'25px' }}>
          <span style={{ display:'block',
                         width:'25px',
                         height:'25px',
                         backgroundColor:'purple' }} />
          </td>
          <td>Cheque</td>

          <td style={{ width:30 + '%', textAlign:'right' }}>
          R$ {this.props.cheque.cheque ?
            this.props.cheque.cheque.toFixed(2).replace('.', ',') : '0,00'}</td>
        </tr>
      );
    }

    return pagamentos;
  }


  render() {
    return (
      <div className='areaTrabalho'>
        <div className='caixaMarota' >
          <div className="headerQuadro">
            <div className='tituloQuadro'>
              <h3>Vendas Por Grupo</h3>
              </div>

            </div>
            {this.Barras()
            }

          </div>
        <div className='caixaMarota' >
          <div className="headerQuadro">
            <div className='tituloQuadro'>
              <h3>Formas de Recebimentos</h3>
              </div>
            </div>
            <div className="x_content" style={{ marginRight: 2 + '%' }}>

            <table className="" style={{ width: 100 + '%' }}>
              <tbody><tr>
                <th style={{ width: 34 + '%' }}>
                  <p>Distribuição</p>
                </th>
                <th>
                  <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                    <p className="">Descrição</p>
                  </div>
                  <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                    <p className="text-right">Valor</p>
                  </div>
                </th>
              </tr>
              <tr>
                <td style={{ width:32 + '%' }}>
                  <GraficoPizza dinheiro={this.props.dinheiro}
                                cheque={this.props.cheque}
                                Ccredito={this.props.Ccredito}
                                Cdebito={this.props.Cdebito}
                                notinhas={this.props.notinhas}  />
                </td>
                <td>

                  <table style={{ width: 100 + '%' }}>
                  <tbody>
                    {this.renderPagamentos()}


                  </tbody>
                  </table>
                </td>
              </tr>
            </tbody></table>
            </div>

          </div>


        <div className='caixaMarota' >


            <div className="headerQuadro">
            <div className='tituloQuadro'>
              <h3 >{this.state.titutlometas}</h3>
              </div>
            </div>
            <div className="x_content">
            <div className="dashboard-widget-content">
              <ul className="quick-list"
                style={{ listStyle:'none', cursor:'pointer', marginLeft:-20 + 'px' }}>
                <li>
                  <i className="fa fa-line-chart" style={{ paddingRight:10 + 'px' }}  />
                  <a onClick={() => { this.setState({ viewmeta: 0,
                    titutlometas: 'Meta Anual' }); }}
                  range="anual">Meta Anual</a></li>
                <li>
                  <i className="fa fa-calendar"style={{ paddingRight:10 + 'px' }} />
                  <a onClick={() => { this.setState({ viewmeta: 1,
                    titutlometas: 'Meta Mensal' }); }}
                  range="mensal">Meta Mensal</a></li>
                <li>
                  <i className="fa fa-calendar-o"style={{ paddingRight:10 + 'px' }} />
                  <a onClick={() => { this.setState({ viewmeta: 2,
                  titutlometas: 'Meta Semanal' }); }}
                  range="semanal">Meta Semanal</a></li>
                <li>
                  <i className="fa fa-check-square-o" style={{ paddingRight:10 + 'px' }} />
                  <a onClick={() => { this.setState({ viewmeta: 3,
                  titutlometas: 'Meta Diária' }); }}
                  range="diaria">Meta Diária</a></li>
              </ul>

              {this.renderMetas()}
              </div>
            </div>


          </div>
        </div>

  );
  }
  }
  export default RowInfos;
