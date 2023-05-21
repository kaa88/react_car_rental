import React from 'react';
import classes from './Container.module.css';

function Container({modif = 'default', ...props}) {
	return (
		<div className={classes[modif]} {...props}>
			{props.children}
		</div>
	)
}

export default Container