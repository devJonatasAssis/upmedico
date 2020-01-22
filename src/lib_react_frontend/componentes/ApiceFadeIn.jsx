import React from 'react';

/**
 * Componente de fadein, todos os componentes que são filhos desse
 * serão renderizados inicialmente com um fade-in.
 */
export default class ApiceFadeIn extends React.Component {

  constructor() {
    super();
    this.state = {
      ...this.state,
      visivel: false,
    };
  }

  /**
   * Retorna o classname da div principal
   */
  getClassName() {
    return this.state.visivel ? 'opacity-1 trans-03s h-100 ' : 'opacity-0 trans-03s h-100 ';
  }

  /**
   * Faz a tela aparecer
   */
  fadeIn() {
    setTimeout(() => {
      this.setState({ visivel: true });
    }, 50);
  }

  /**
   * Faz a tela desaparecer
   */
  fadeOut() {
    this.setState({ visivel: false });
  }

  render() {
    return (
      <div className={this.getClassName() + ' ' + this.props.className}>
        {this.props.children}
      </div>
    );
  }
  
}
