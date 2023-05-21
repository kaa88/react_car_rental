import React from 'react';
import classes from './Link.module.css';


function Link({
	modif = 'default',
	...props
}) {
	
	return (
		<a
			className={classes[modif]}
			href='#'
			{...props}
		>
			<span>
				{props.children || 'Link'}
			</span>
		</a>
	)
}

export default Link