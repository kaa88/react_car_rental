import React from 'react';
import classes from './IconButton.module.css';


function IconButton({
	modif = 'default',
	...props
}) {
	
	return (
		<button
			className={classes[modif]}
			{...props}
		>
			{props.children || '<'}
		</button>
	)
}

export default IconButton