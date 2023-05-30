import React from 'react';
import classes from './Button.module.css';


function Button({
	modif = 'default',
	className = '',
	children = 'Button',
	...props
}) {

	// console.log(className);

	return (
		<button className={`${className} ${classes[modif]}`} {...props}>
			{children}
		</button>
	)
}

export default Button