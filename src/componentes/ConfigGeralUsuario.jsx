import React from 'react';
import Box from '../lib_react_adminlte/componentes/Box.jsx';
import { Column } from '../lib_react_adminlte/componentes/Table.jsx';

/**
 * Configurações gerais da aplicação.
 */
export default class ConfigGeral extends React.Component {

  render() {
    const { checkbox, input, inputNumber, inputCalc } = this.props;
    return (
      <Box collapsible title="Geral - Usuario" className="m-0">
        {/* Primeira coluna: */}
        <div className="col-sm-4 light-side-border">

          {inputCalc('Vr. Couvert por Pessoa (R$):', 'vr_couvert')}
          {inputCalc('Perc. Serviço (%):', 'perc_servico')}
          {input('Vr. adicional pizza (por sabor):', 'vr_adicional_pizza')}
          {inputNumber('Vr. taxa de entrega:', 'vr_tx_entrega')}
          <h4> <strong> Titulos</strong></h4>
          {input('Título do local:', 'titulo_local')}
          <div className="row">
            <div className="col-xs-4">
              {input('Mesa (PV):', 'texto_ponto_venda')}
            </div>
            <div className="col-xs-4">
              {input('Balcão:', 'texto_ponto_venda_balcao')}
            </div>
            <div className="col-xs-4">
              {input('Entrega:', 'texto_ponto_venda_entrega')}
            </div>
          </div>
        </div>
        {/*Segunda Coluna*/}
        <div className="col-sm-4 light-side-border">
        <div className="light-full-border mt-10" >
            <strong>Quantidade de pontos de casa (Máx. 1000 pontos)</strong>
            <div className="row">
              <div className="col-xs-6">
                {inputNumber('Mínimo:', 'qtde_min_ponto_casa')}
              </div>
              <div className="col-xs-6">
                {inputNumber('Máximo:', 'qtde_ponto_casa')}
              </div>
            </div>
          </div>
          {inputNumber('Qtde de Saltos na Impressão da Comanda:', 'imp_qtde_saltos_pedido')}
          {checkbox('Usa pesquisa cod./ref. de produto?', 'status_usa_pesq_cod_ref_produto')}
        </div>
        {/* Terceira coluna: */}
        <div className="col-sm-4 light-side-border">


          {inputNumber('Série comanda:', 'serie_pv_nr')}
          {inputNumber('Minutos para alerta de sem consumo', 'qtde_min_alert_consumo', '1', '59')}
        </div>
      </Box>
    );
  }

}

