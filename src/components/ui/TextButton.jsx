import React from 'react';
import classes from './TextButton.module.css';


function TextButton({type = 'default', ...props}) {

	return (
		<button className={classes[type]} {...props}>
			{props.children || 'TextButton'}
		</button>
	)
}

export default TextButton