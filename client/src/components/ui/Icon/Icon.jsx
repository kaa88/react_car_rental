import React from 'react';
import classes from './Icon.module.scss';


function Icon({
	name = '',
	size,
	style = {},
	className = '',
	...props
}) {
	if (size) style.width = style.height = size;
	return (
		<svg
			className={`${className} ${classes.svg}`}
			style={style}
			{...props}
		>
			<use href={'img/sprite.svg#' + name}></use>
		</svg>
	)
}

export default Icon