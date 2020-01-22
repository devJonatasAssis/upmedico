import React from 'react';

export default (props) => (
  <footer className='main-footer'> 
    <strong> 
      Copyright &copy; 2018
      <a href={props.link} target='_blank' rel="noopener noreferrer">
        {' ' + props.titulo}
      </a>.
    </strong>
  </footer>
);
