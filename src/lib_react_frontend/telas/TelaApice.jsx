import React from 'react';
import Dialog from '../componentes/Dialog.jsx';

/**
 * Componente padrão de telas da apice. TODAS as telas devem herdar
 * dessa mesmo que de forma indireta.
 */
export default (class TelaApice extends React.Component {

  constructor() {
    super();
    this.state = {
    };

    this.onResizeBind = this.onResize.bind(this);
    Dialog.dismissAll();
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResizeBind);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResizeBind)
  }

  onResize() {
    this.setState({
    });
  }

  goToRoute(route) {
    
  }

  render(childRender) {
    return (
      <div style={{height: '100%'}}>
        {childRender}
      </div>
    );
  }

});
