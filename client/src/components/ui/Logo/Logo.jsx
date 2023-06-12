import { memo } from 'react';
import classes from './Logo.module.scss';

const Logo = memo(function({
	href = process.env.REACT_APP_HOST || '/',
	modif = 'default',
	className,
	...props
}) {

	return (
		<div className={`${className} ${classes[modif]}`} {...props}>
			<a className={classes.link} href={href}>
				<span>RENT</span>
				<svg className={classes.icon}>
					<use href='img/sprite.svg#icon-at'></use>
				</svg>
				<span>CAR</span>
			</a>
		</div>
	)
})

export default Logo