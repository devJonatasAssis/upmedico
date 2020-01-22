import $ from 'jquery';
import 'moment';
import 'bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
//import DatePicker from 'bootstrap-daterangepicker';
import React from 'react';
import GraficoLinha from './LineChart.jsx';
import Api from '../../utils/Api.jsx';
import Input from './Input.jsx';
import Box from './Box.jsx';

class RowFaturamento extends React.Component {

  state = {
    ativador:0,
    valores:[0],
  }

  renderGrafico() {
    return (<GraficoLinha valoresIniciais={this.props.valoresIniciais}
                          ativador={this.state.ativador}
                          valores={this.state.valores} />);

  }

  renderTop() {
    const AZ = [];    
    if (this.state.ativador === 0) {
    if (this.props.topIniciais[0].cod_cliente) {
    if (this.props.topIniciais[0].cod_cliente) {
      AZ.push(
        <li key={6} className='LItops'>
        <a  className='topFotoLink' href="">
          <img className="topFoto" src="https://st2.depositphotos.com/5266903/8129/v/950/depositphotos_81290276-stock-illustration-client-icon.jpg" alt="" />
        </a>
        <div className='nomeClienteTop'>
          <a href="">{this.props.topIniciais[0].nome_cliente}</a>
          <p>
            <a href="">
              <strong>
                R$ {this.props.topIniciais[0].valortop.toFixed(2).replace('.', ',')}
                </strong>
              "Compras do Periodo"
            </a>
          </p>
          <p>
            <small>4 pedidos no periodo</small>
          </p>

        </div>

        </li>
      );
      }
      return AZ;
    } }
    let count = 0;
    if (this.state.topclientes) {
      while (count < this.state.topclientes.length) {
        if (this.state.topclientes[0].cod_cliente) {
            AZ.push(
              <li key={count} className='LItops'>
              <a  className='topFotoLink' href="">
                <img className="topFoto" src="https://st2.depositphotos.com/5266903/8129/v/950/depositphotos_81290276-stock-illustration-client-icon.jpg" alt="" />
              </a>
              <div className='nomeClienteTop'>
                <a href="">{this.state.topclientes[count].nome_cliente}</a>
                <p>
                  <a href="">
                    <strong>
                    R$ {this.state.topclientes[count].valortop.toFixed(2).replace('.', ',')}
                    </strong>
                    "Compras do Periodo"
                  </a>
                </p>
                <p>
                  <small>4 pedidos no periodo</small>
                </p>

              </div>

              </li>
            );
        }
        count++;
        }
      }
    return AZ;

  }
  render() {
   $(() => {
      $('.DateBalacoMesmo').daterangepicker({
        opens: 'left',
        locale: {
          format: 'DD/MM/YYYY',
           monthNames :['Janeiro',
           'Fevereiro',
            'Março',
             'Abril',
             'Maio',
             'Junho',
             'Julho',
             'Agosto',
             'Setembro',
             'Outubro',
             'Novembro',
             'Dezembro',
            ],
        },

      }, async (startDate, endDate) => {
        const ret = await Api.getValoresDate(startDate, endDate);
        this.setState({ ...ret.dados,
           ativador:1,
           inicio: startDate,
           fim: endDate }, () => {
        });
      });
    });
    return (
      <div className='areaTrabalho'>
            <Box>
            {//<div className='box no-sdw'>
            }
              <div className="headerQuadro">
                <div className='tituloQuadro'>
                  <h3>Faturamento Diário
                    <small> Progressão diária
                      </small>
                      {this.state.inicio ? (
                      <h5>De {this.state.inicio.format('DD/MM/YYYY')
                    } a {this.state.fim.format('DD/MM/YYYY')}</h5>
                      ) : null}
                      </h3>
                  </div>
                <div className="filtro">
                  <Input className='DateBalacoMesmo fl w-90 ' placeholder='AEEEEOOO' />
                  {/*<input type="text"
                  name="daterange"

                    value="" />*/}
                </div>
                </div>
              <div className='conteudoQuadro'>
                <div className='areaGraficoFatu'>
                  <div className='graficoLinhaFatu'>
                  {this.renderGrafico()}
                  </div>

                </div>
                <div className='topClientes'>
                  <div className='headerTopClientes'>
                    <div className='tituloTopClientes'>
                    <h3>Top Clientes
                      <small> do Periodo</small></h3>
                    </div>
                  </div>
                  <div className='listaTops'>
                  <ul className='ULtops'>
                    {this.renderTop()}
                  </ul>
                  </div>
                </div>
                </div>


          {//</div>
          }
          </Box>
      </div>

    );
  }

}
export default RowFaturamento;
