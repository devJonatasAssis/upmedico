import React from 'react';
import { Doughnut as DoughChart } from 'react-chartjs';
  function chartData() {
    return [
      {
          value: 30,
          color:'#F7464A',
          highlight: '#FF5A5E',
          label: 'Red',
      },
      {
          value: 25,
          color: '#46BFBD',
          highlight: '#5AD3D1',
          label: 'Green',
      },
      {
          value: 50,
          color: '#FDB45C',
          highlight: '#FFC870',
          label: 'Yellow',
      },
      {
          value: 10,
          color: '#949FB1',
          highlight: '#A8B3C5',
          label: 'Grey',
      },
      {
          value:40,
          color: '#4D5360',
          highlight: '#616774',
          label: 'Dark Grey',
      },
      ];
  }
/*data: [50, 50, 11, 11, 11],
    backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']*/


class DoughChartClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: chartData(),
      options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
      },
    };
  }

  render() {
    return (


        <DoughChart data={this.state.data} options={this.state.options}
          width="100" height="70" />


    );
  }
}

export default DoughChartClass;
