import React from 'react';
import Box from '../lib_react_adminlte/componentes/Box.jsx';

/**
 * Configurações gerais da aplicação.
 */
export default class ConfigNFCe extends React.Component {

  render() {
    const { checkbox } = this.props;
    return (
      <Box collapsible title="NFC-e" className="m-0">
        {/* Primeira coluna: */}
        <div className="col-sm-6 light-side-border">

          {checkbox('Sempre imprime a Danfe ao enviar a NFC-e?',
            'status_nfce_envia_sempre_imp_danfe')}
          {checkbox('Sempre emite NFC-e ao receber comanda?', 'status_sempre_imp_nfce')}
          {checkbox('Sempre traz checkbox desmarcado?', 'status_emissao_nfce_sempre_desm')}
          <strong>Imprime na NFC-e</strong>
          {checkbox('Cód. da Comanda?', 'status_imp_cmd_nfce')}
          {checkbox('Garçom?', 'status_imp_cmd_garcon')}
          {checkbox('Contador?', 'status_imp_contador_nfce')}

        </div>

      </Box>
    );
  }

}

