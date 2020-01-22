import React from 'react';
import { Line as LineChart } from 'react-chartjs';


class LineChartClass extends React.Component {

  getDias() {
    if (this.props.ativador === 1) {

    let count = 0;
    const datas = [];
    while (count < this.props.valores.length) {
      if (this.props.valores[count].dataregistro) {
      datas.push(this.props.valores[count].dataregistro.substring(0, 10));
      count++;
      }
    }
    return datas;
    }
    /*Valores iniciais*/
    let count = 0;
    const datas = [];
    while (count < this.props.valoresIniciais.length) {
      if (this.props.valoresIniciais[count].dataregistro) {
      datas.push(this.props.valoresIniciais[count].dataregistro.substring(0, 10));

    }
    count++;
    }
    return datas;

  }
  getValores() {
    if (this.props.ativador === 1) {
      let count = 0;
      const datas = [];
      while (count < this.props.valores.length) {
        if (this.props.valores[count].dataregistro) {

        datas.push(this.props.valores[count].somaFaturamento);
        count++;
      }
     }
      return datas;
    }
    /*Valores iniciais*/
      let count = 0;
      const datas = [];
      while (count < this.props.valoresIniciais.length) {
        if (this.props.valoresIniciais[count].dataregistro) {
        datas.push(this.props.valoresIniciais[count].somaFaturamento);

      }
      count++;
      }
      return datas;

  }
  getOptions() {
    return {
      bezierCurve: false,
      scaleShowVerticalLines:false,
      responsive:true,
      maintainAspectRatio:false,
      pointHitDetectionRadius : 0,

      };
    }

  chartData() {

    return {
      labels: this.getDias(),
      datasets: [
        {
          string: '2018',
          fillColor: 'rgba(0,0,225,0.4)',
          strokeColor: 'rgba(0,0,0,0.8)',
          pointColor: 'rgba(0,0,0,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: this.getValores(),
        },
      ],
    };
  }

  render() {
    return (
        <LineChart data={this.chartData()}
        options={this.getOptions()} width="1200" height="350" redraw />

    );
  }
}


export default LineChartClass;
