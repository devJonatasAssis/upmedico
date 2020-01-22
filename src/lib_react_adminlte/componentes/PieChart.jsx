import React from 'react';
import { Pie as PieChart } from 'react-chartjs';

/*data: [50, 50, 11, 11, 11],
    backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']*/


class PieChartClass extends React.Component {
  chartData() {
    return [
      {
          value: this.props.Ccredito.credito,
          color:'#3f3fff',
          highlight: '#0000ee',
          label: 'C. Credito',
      },
      {
        value: this.props.Cdebito.debito,
        color:'#B22222',
        highlight: '#FF0000',
        label: 'C. Debito',
      },
      {
        value: this.props.notinhas.notas,
        color:'#FFD700',
        highlight: '#FFFF00	',
        label: 'Notas',
      },
      {
          value: this.props.dinheiro.dinheiro,
          color: '#66cd00',
          highlight: '#458b00',
          label: 'Dinheiro',
      },
      {
          value: this.props.cheque.cheque,
          color: '#D15FEE',
          highlight: '#7D26CD',
          label: 'Cheque',
      },
      ];
  }


  render() {
    return (


        <PieChart data={this.chartData()}
          width="150" height="100" />


    );
  }
}

export default PieChartClass;
