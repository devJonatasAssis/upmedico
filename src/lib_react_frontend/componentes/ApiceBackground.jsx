import React from 'react';

/**
 * Componente para imagens de fundo.
 */
export default (props) => (
  <div className="apice-background" 
       style={{ backgroundImage: 'url(' + props.img + ')' }}>
    {props.children}
  </div>
);
