import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { reducer as toastrReducer } from 'react-redux-toastr';


import TelaLogin from './telas/TelaLogin.jsx';
import TelaApp from './telas/TelaApp.jsx';
import ApiceToaster from './lib_react_frontend/componentes/ApiceToaster.jsx';

// Importa o estilo padrão da lib:
import './lib_react_frontend/style/common.css';
// Importa o estilo padrão do LTE:
import './lib_react_adminlte/style/styles.jsx';

import tabReducer from './lib_react_adminlte/template/tab/tabReducer';
import funcionarioReducer from './utils/funcionarioReducer';
import mesasReducer from './utils/mesasReducer';
import socketConnectionReducer from './utils/socketConnectionReducer';
import configReducer from './utils/configReducer';

// Cria a store:
const store = createStore(combineReducers({
  funcionario: funcionarioReducer,
  tab: tabReducer,
  toastr: toastrReducer,
  config: configReducer,
  mesas: mesasReducer,
  socketConnection: socketConnectionReducer,
}));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className="wrapper" style={{ height: '100%' }} >
        <Route component={ApiceToaster} />
        <Switch>
          <Route exact path="/" component={TelaLogin} />
          <Route path="/app" component={TelaApp} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
