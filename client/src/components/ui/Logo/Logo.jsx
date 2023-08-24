import { memo } from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.scss';
import Icon from '../Icon/Icon';

const Logo = memo(function({
	modif = 'default',
	className,
	...props
}) {

	return (
		<div className={`${className} ${classes[modif]}`} {...props}>
			<Link to='/' className={classes.link}>
				<span>RENT</span>
				<Icon className={classes.icon} name='icon-at' />
				<span>CAR</span>
			</Link>
		</div>
	)
})

export default Logo