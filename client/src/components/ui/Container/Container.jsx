import React from 'react';
import classes from './Container.module.scss';

function Container({modif = 'default', children, ...props}) {
	return (
		<div className={classes[modif]} {...props}>
			{children}
		</div>
	)
}

export default Container