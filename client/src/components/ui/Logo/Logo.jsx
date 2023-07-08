import { memo } from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.scss';

const Logo = memo(function({
	href = process.env.REACT_APP_HOST || '/',
	modif = 'default',
	className,
	...props
}) {

	return (
		<div className={`${className} ${classes[modif]}`} {...props}>
			<Link to={href} className={classes.link}>
				<span>RENT</span>
				<svg className={classes.icon}>
					<use href='img/sprite.svg#icon-at'></use>
				</svg>
				<span>CAR</span>
			</Link>
		</div>
	)
})

export default Logo