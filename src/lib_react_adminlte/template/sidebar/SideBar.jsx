import React from 'react';

export default (props) => (
	<aside className='main-sidebar'>
		<section className='sidebar'>

			<ul className='sidebar-menu'>
				{/* Items do menu */}
				{props.children}
			</ul>

		</section>
	</aside>
);
