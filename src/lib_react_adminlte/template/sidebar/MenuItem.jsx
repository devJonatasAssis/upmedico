import React from 'react';
import { Link } from 'react-router-dom';

export default props => (
	<li> 
		<Link to={props.path} onClick={() => {}}>
			<i className={`fa ${props.icon}`} /> 
			<span>{props.label}</span>
		</Link>
	</li>
);
