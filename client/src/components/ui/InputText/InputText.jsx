import classes from './InputText.module.scss';


function InputText({
	modif = 'default',
	className = '',
	...props
}) {
	
	return (
		<input type='text' className={`${className} ${classes[modif]}`} {...props} />
	)
}

export default InputText