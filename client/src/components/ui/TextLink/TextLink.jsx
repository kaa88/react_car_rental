import React from 'react';
import classes from './TextLink.module.scss';


function TextLink({
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

export default TextLink