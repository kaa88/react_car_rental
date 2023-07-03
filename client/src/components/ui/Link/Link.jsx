import React from 'react';
import classes from './Link.module.scss';


function Link({
	modif = 'default',
	className = '',
	...props
}) {
	
	return (
		<a
			className={`${className} ${classes[modif]}`}
			href='#'
			{...props}
		>
			<span>
				{props.children}
			</span>
		</a>
	)
}

export default Link