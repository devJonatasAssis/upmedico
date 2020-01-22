import React from 'react';
import { connect } from 'react-redux';
import ApiceFadeIn from './ApiceFadeIn.jsx';
import GenericApi from '../utils/GenericApi.jsx';

/**
 * Valida a sessão do usuário, caso o usuário não possua permissão para
 * visitar a página ela não será mostrada a ele.
 */
class ApiceValidadorSessao extends React.Component {

  state = {
    validado: false,
  }

  componentDidMount() {
    // Valida a autenticação
    this.validarAuth();
  }

  /**
   * Valida a autenticação do usuário, caso a autenticação dele esteja
   * de alguma maneira falha, ele é redirecionado para a página de login
   * novamente.
   */
  async validarAuth() {
    let ret = null;
    if (this.props.api) {
      ret = await this.props.api.validarAuth();
    } else {
      ret = await GenericApi.validarAuth();
    }
    if (!ret.status) {

      // Se não estamos autenticados vamos voltar ao inicio
      // Growl.add('info', 'Não autenticado!', 'Faça o login para entrar nessa página', 3000);

      // this.props.dispatch(ActionCreator.addGrowl('error', 'Erro!',
      //         'Não autenticado! Por favor realize o login antes de acessar essa página!',
      //         2000));
      // this.props.dispatch(GenericActionCreator.addGrowl(
      //   'danger',
      //   'Não autenticado! Por favor realize o login antes de acessar essa página!',
      // ));

      this.props.history.push('/');
    } else {
      // Porém se estamos, libera a tela:
      this.setState({ validado: true }, () => {
        this.apiceFadeIn.fadeIn();
      });
    }
  }

  render() {
    return (
      <ApiceFadeIn ref={e => this.apiceFadeIn = e}>
        {this.state.validado ? this.props.children : <div />}
      </ApiceFadeIn>
    );
  }

}

export default connect(null, (dispatch) => ({
  dispatch,
}))(ApiceValidadorSessao);
