import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Telalogin from '../telas/TelaLogin.jsx';

/**
 * Componente de configuração de rotas da aplicação:
 */
export default () => (
  <Switch>
    <Route exact path="/" component={Telalogin} />
  </Switch>
);
