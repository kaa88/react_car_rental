import classes from './Container.module.scss';

function Container({
	modif = 'default',
	className = '',
	children,
	...props
}) {
	return (
		<div className={`${className} ${classes[modif]}`} {...props}>
			{children}
		</div>
	)
}

export default Container