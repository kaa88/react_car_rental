import React from 'react';
import classes from './Logo.module.css';

function Logo({href = '/', ...props}) {
	return (
		<div className={classes.logo} {...props}>
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