import classes from './Loader.module.scss';
import TranslateHandler from '../../TranslateHandler';
import Icon from '../Icon/Icon';

const LoadError = function({
	modif = 'dark',
	className,
	...props
}) {

	return (
		<TranslateHandler>
			<div className={`${className} ${classes[modif]}`} {...props}>
				<Icon className={classes.errIcon} name='icon-cross' />
				<p className={classes.errMsg}>?_Data load error</p>
			</div>
		</TranslateHandler>
	)
}

export default LoadError