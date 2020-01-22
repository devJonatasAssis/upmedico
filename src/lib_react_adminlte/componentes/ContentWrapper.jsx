import React from 'react';
import Content from '../../lib_react_adminlte/template/content/Content.jsx';
import ContentHeader from '../../lib_react_adminlte/template/content/ContentHeader.jsx';
import ApiceFadeIn from '../../lib_react_frontend/componentes/ApiceFadeIn.jsx';

export default class ContentWrapper extends React.Component {

  componentDidMount() {
    this.apiceFadeIn.fadeIn();
    setTimeout(() => {
      // Para atualizar o conteúdo:
      window.dispatchEvent(new Event('resize'));
    }, 50);
  }

  componentWillUnmount() {
    this.apiceFadeIn.fadeOut();
  }

  /**
   * Retorna o título que vai ser colocado no cabeçalho da tela
   */
  getTitulo() {
    // Filhos podem implementar para retornar o título grande
  }

  /**
   * Retorna o sub-titulo que fica do lado do título e é mais
   * pequeno.
   */
  getSubTitulo() {
    // Filhos podem implementar isso para retornar
  }

  render() {
    return (
      <ApiceFadeIn ref={e => this.apiceFadeIn = e}>
        <div className="content-wrapper mb-50"> 
          <ContentHeader title={this.props.title}
                          small={this.props.small} />
          <Content>
            {this.props.children}
          </Content> 
        </div>
      </ApiceFadeIn>
    );
  }

}
