import React from 'react';
import classes from './TextButton.module.css';


function TextButton({
	modif = 'default',
	...props
}) {
	
	return (
		<button
			className={classes[modif]}
			{...props}
		>
			{props.children || 'TextButton'}
		</button>
	)
}

export default TextButton