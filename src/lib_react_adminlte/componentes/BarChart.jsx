import React from 'react';
import { Bar as BarChart } from 'react-chartjs';

function chartData() {
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'My Second dataset',
        fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,1)',
        data: [28, 48, 40, 19, 86, 27, 90],
      },
    ],
  };
}

function getOptions() {
    return {
      elements: {
        line: {
          tension: 0,
        },
      },
    };
}

class BarChartClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: chartData(),
      options: getOptions(),
    };
  }

  render() {
    return (
        <BarChart data={this.state.data}
        options={this.state.options}
          width="600" height="250" />

    );
  }
}

export default BarChartClass;
