import React from 'react';
import classes from './Icon.module.css';


function Icon({
	modif = 'default',
	name = '',
	...props
}) {

	return (
		<svg className={classes[modif]} {...props}>
			<use href={'img/sprite.svg#' + name}></use>
		</svg>
	)
}

export default Icon