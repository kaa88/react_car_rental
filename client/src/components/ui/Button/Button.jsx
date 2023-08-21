import classes from './Button.module.scss';


function Button({
	modif = 'default',
	className = '',
	children = 'Button',
	...props
}) {

	return (
		<button className={`${className} ${classes[modif]}`} {...props}>
			{children}
		</button>
	)
}

export default Button