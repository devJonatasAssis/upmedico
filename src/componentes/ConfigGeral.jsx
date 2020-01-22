import React from 'react';
import { connect } from 'react-redux';

import Box from '../lib_react_adminlte/componentes/Box.jsx';
import { RadioGroup } from '../lib_react_adminlte/componentes/RadioGroup.jsx';

/**
 * Configurações gerais da aplicação.
 */
class ConfigGeral extends React.Component {

  render() {
    const { checkbox, input, inputNumber, upComboEditPanel, radioButton, inputCalc } = this.props;
    return (
      <Box collapsible title="Geral" className="m-0">

        {/* Linha 1 */}
        <div className="col-sm-12">            
          <RadioGroup title="Configurações de Edit:" className="mt-10">
            <div className="flex">
              {checkbox('Campos em Maiusculo?', 'status_edit_maiusculo', 'tab_config', 'inline mr-10')}
            </div> 
          </RadioGroup>
        </div>
        {/* Linha 1 */}

        {/* Linha 2 */}
        <div className="col-sm-12">            
          <RadioGroup title="Configurações de Menu:" className="mt-10">
            <div className="flex">
              {checkbox('Usa Menu Aberto?', 'status_usa_menu_aberto', 'tab_config', 'inline mr-10')}
            </div>  
         </RadioGroup>
        </div>
        {/* Linha 2 */}

        {/* <div className="col-sm-4 light-side-border">

        //   <RadioGroup title="Controle de mesa"
        //               className="mt-10">
        //     <div className="row">
        //       <div className="col-sm-6">
        //         {radioButton('status_usa_controle_mesa', 'Nenhum', '0')}
        //       </div>
        //       <div className="col-sm-6">
        //         {radioButton('status_usa_controle_mesa', 'Reserva', '2')}
        //       </div>
        //     </div>
        //     <div  className="row">
        //       <div className="col-sm-6">
        //         {radioButton('status_usa_controle_mesa', 'Lista de espera', '1')}
        //       </div>
        //       <div className="col-sm-6">
        //         {radioButton('status_usa_controle_mesa', 'Ambos', '3')}
        //       </div>
        //     </div>
        //   </RadioGroup>

        //   <div className="light-full-border mt-10" >
        //     <strong>Padrão dos produtos:</strong>
        //   </div>
        // </div>

        // <div className="col-sm-4 light-side-border">
        //   {checkbox('Imprime nome da empresa?', 'imp_nome_empresa')}
        //   {checkbox('Comissiona funcionários?', 'status_func_com')}
        //   {checkbox('Permite fechar caixa com comanda aberta?', 'status_perm_fech_cx_com_aberta')}
        //   {checkbox('Sempre limpa comanda com valor zerado para fechamento do caixa?',
        //             'status_limp_mes_zer_fec_cx')}
        //   {checkbox('Exibe usa paleta de arquivo morto?', 'status_usa_pal_arq_morto')}
        //   {checkbox('Exibe filtro no frente de caixa?', 'status_exibe_filtro_nome_telefone')}
        //   {checkbox('Exibe totais de mesa/cartão aberto/fechado no Mov. de Caixa?',
        //             'status_exib_tot_mov_caixa')}
        //   {checkbox('Exibe extrato fechamento?',
        //             'status_exib_fech_caixa')}
        // </div>

        // <div className="col-sm-4 light-side-border">
        //   <strong>Título</strong>
        //   <div className="row">
        //     <div className="col-xs-4">
        //       {input('Mesa (PV):', 'texto_ponto_venda')}
        //     </div>
        //     <div className="col-xs-4">
        //       {input('Balcão:', 'texto_ponto_venda_balcao')}
        //     </div>
        //     <div className="col-xs-4">
        //       {input('Entrega:', 'texto_ponto_venda_entrega')}
        //     </div>
        //   </div>
        //   {input('Título do local:', 'titulo_local')}
        //   {inputCalc('Vr. Couvert por Pessoa (R$):', 'vr_couvert')}
        //   {inputCalc('Perc. Serviço (%):', 'perc_servico')}
        //   {inputNumber('Série comanda:', 'serie_pv_nr')}
        //   {inputNumber('Minutos para alerta de sem consumo', 'qtde_min_alert_consumo', '1', '59')}
        // </div> */}
      </Box>
    );
  }

}
export default connect((state) => ({
  config: state.config,
}))(ConfigGeral);