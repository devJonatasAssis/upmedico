import React from 'react';
import Box from '../lib_react_adminlte/componentes/Box.jsx';

/**
 * Configurações gerais da aplicação.
 */
export default class ConfigSenha extends React.Component {

  render() {
    const { checkbox, input, inputNumber } = this.props;
    return (
      <Box collapsible title="Configuração Senha" className="m-0">

        {/* Primeira coluna: */}
        <div className="col-sm-6 light-side-border">

          {checkbox('Usa senha de pedidos (Balcão)?', 'status_contador_pedidos')}

          {inputNumber('Senha de pedidos:', 'contador_pedidos')}

          {checkbox('Senha aleatório?', 'status_contador_aleatorio')}
          {checkbox('Imprime senha?', 'status_imp_senha_balcao')}

          {input('Texto da Senha:', 'texto_senha_comanda')}

          {checkbox('Usa senha de pedidos (Entrega)?', 'status_contador_pedidos_entr')}


        </div>

      </Box>
    );
  }

}

