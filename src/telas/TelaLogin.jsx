import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Input from '../lib_react_adminlte/componentes/Input.jsx';
import Button from '../lib_react_adminlte/componentes/Button.jsx';
import Row from '../lib_react_adminlte/componentes/Row.jsx';
import Api from '../utils/Api.jsx';
import Cookies from '../lib_react_frontend/utils/Cookies.jsx';
import ApiceFadeIn from '../lib_react_frontend/componentes/ApiceFadeIn.jsx';

/**
 * Tela de login no sistema, ao realizar o login essa tela já seta
 * o cookie para futura utilização.
 */
class TelaLogin extends React.Component {

  constructor() {
    super();
    this.state = {
      login: '',
      senha: '',
    };

    // Padrão do LTE:
    document.body.className = 'hold-transition login-page';
  }

  /**
   * @override
   */
  componentDidMount() {
    // Foca o input do login:
    this.inputLogin.focus();
    // Faz a tela aparecer lentamente:
    this.apiceFadeIn.fadeIn();
  }

  /**
   * Trata as validações antes de realizar o login.
   */
  realizarValidacoes() {
    if (!this.state.login) {
      this.inputLogin.focus();
      toastr.error('Atenção!', 'Informe o login!');
      return;
    }
    return true;
  }

  /**
   * Realiza o login no backend.
   */
  async realizarLogin() {
    if (!this.realizarValidacoes()) {
      return;
    }
    const ret = await Api.login(this.state.login.toUpperCase(), this.state.senha);
    if (ret.status) {
      // Sucesso no login!
      const dezAnos = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 365 * 10));
      Cookies.set('sistema_medico_auth', ret.dados.token, dezAnos);
      this.props.history.push('/app');
    } else {
      toastr.error('Atenção Login!', ret.erro.error_message);
    }
  }

  render() {
    return (
      <ApiceFadeIn ref={e => this.apiceFadeIn = e}>
        <div className="login-box">
          {/* Header: */}
          <div className="login-logo">
          Sistema<b>Médico</b>
          </div>

          {/* Corpo: */}
          <div className="login-box-body">

            {/* Login: */}
            <div className="form-group has-feedback ">
              <Input placeholder="Digite seu login"
                    value={this.state.login}
                    ref={e => this.inputLogin = e}
                    onKeyEnter={() => this.inputSenha.focus()}
                    onChange={(e) => this.setState({ login: e.target.value })} />
              <i className="fa fa-sign-in form-control-feedback" />
            </div>

            {/* Senha: */}
            <div className="form-group has-feedback">
              <Input placeholder="Digite sua senha"
                    value={this.state.senha}
                    ref={e => this.inputSenha = e}
                    onChange={(e) => this.setState({ senha: e.target.value })}
                    onKeyEnter={this.realizarLogin.bind(this)}
                    type="password" />
              <i className="fa fa-lock form-control-feedback" />
            </div>

            {/* Linha de realizar login: */}
            <Row>
              <div className="col-sm-2 col-sm-offset-4 text-center">
                <Button icon="fa-sign-in"
                        label="Entrar"
                        className="btn-primary btn-blocsk"
                        onClick={this.realizarLogin.bind(this)} />
              </div>
            </Row>
          </div>
        </div>
      </ApiceFadeIn>
    );
  }

}

export default connect(null, (dispatch) => ({
  dispatch,
}))(TelaLogin);
