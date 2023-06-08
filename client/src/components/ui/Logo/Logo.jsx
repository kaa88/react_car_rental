import React from 'react';
import classes from './Logo.module.scss';

function Logo({
	href = '/',
	modif = 'default',
	...props
}) {
	return (
		<div className={classes[modif]} {...props}>
			<a className={classes.link} href={href}>
				<span>RENT</span>
				<svg className={classes.icon}>
					<use href='img/sprite.svg#icon-at'></use>
				</svg>
				<span>CAR</span>
			</a>
		</div>
	)
}

export default Logo