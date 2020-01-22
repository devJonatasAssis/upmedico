import React from 'react';
import { Pie as PieChart } from 'react-chartjs';
import $ from 'jquery';

export default class ApicePieChart extends React.Component {

  static uniqueId = 0;

  constructor() {
    super();
    this.id = 'apice-pie-chart' + (++ApicePieChart.uniqueId);
  }

  state = {
    visible: true,
  }

  componentDidMount() {
    $('#' + this.id).click((e) => {
      const chart = this.chart;
      const val = (chart.getChart().getSegmentsAtEvent(e))[0];
      if (this.props.onClick) {
        this.props.onClick(val);
      }
    });
  }

  refresh() {
    this.setState({ visible: false }, () => {
      this.setState({ visible: true });
    });
  }

  render() {
    return (
      <div className="apice-pie-chart-container">
        <div className="apice-pie-chart-wrapper">
          <PieChart data={this.state.visible ? this.props.dados : []} 
                    width={this.props.width} 
                    height={this.props.height}
                    className="apice-pie-chart" 
                    ref={e => this.chart = e}
                    id={this.id} />
        </div>
      
        {this.props.mostrarLegenda && <div className="apice-pie-legenda-container">
          {this.props.dados.map((x, i) => (
            <div className="apice-pie-legenda-wrapper">
              <div style={{ backgroundColor: x.color }} />
              <span>{(i + 1) + '. '} {x.labelLegenda}</span>
            </div>
          ))}
        </div>}
      </div>
    );
  }

}
