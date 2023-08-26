import React from 'react';
import classes from './Icon.module.scss';
import iconSprite from './sprite.svg';


function Icon({
	name = '',
	size,
	style = {},
	className = '',
	...props
}) {
	const path = `${iconSprite}#${name}`

	if (size) style.width = style.height = size;
	return (
		<svg
			className={`${className} ${classes.svg}`}
			name={name}
			style={style}
			{...props}
		>
			<use href={path}></use>
		</svg>
	)
}

export default Icon