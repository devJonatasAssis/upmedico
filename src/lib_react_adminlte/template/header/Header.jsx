import React from 'react';
import Navbar from './Navbar';

export default (props) => (
	<header className='main-header'>

		<a href={props.rota} className='logo'>
			{/* O Logo pequeno: */}
			<span className='logo-mini'>
				{props.tituloPequeno}
			</span>

			{/* O Logo grande com ícone: */}
			<span className='logo-lg'>
				{props.icon && <i className={'fa ' + props.icon} />}
				<span style={{ marginLeft: '5px' }} />
				{props.tituloGrande}
			</span>
		</a>

		{/* A Barra: */}
		<nav className='navbar navbar-static-top'>
			<a className='sidebar-toggle' data-toggle='offcanvas' />
      <Navbar usuario={props.usuario}
              options={props.options}
					    onLogout={props.onLogout} />
		</nav>

	</header>
);
