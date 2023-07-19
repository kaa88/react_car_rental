import classes from './Loader.module.scss';
import Icon from '../Icon/Icon';

const Loader = function({
	modif = 'dark',
	className,
	...props
}) {

	return (
		<div className={`${className} ${classes[modif]}`} {...props}>
			<Icon className={classes.loadIcon} name='icon-spinner' />
		</div>
	)
}

export default Loader