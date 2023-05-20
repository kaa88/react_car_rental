import React from 'react';
import classes from './IconButton.module.css';


function IconButton({type = 'default', ...props}) {

	return (
		<button className={classes[type]} {...props}>
			{props.children || '<'}
		</button>
	)
}

export default IconButton