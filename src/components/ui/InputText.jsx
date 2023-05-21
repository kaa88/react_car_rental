import React from 'react';
import classes from './InputText.module.css';


function InputText({
	modif = 'default',
	placeholder = '',
	...props
}) {
	
	return (
		<input
			type='text'
			className={classes[modif]}
			placeholder={placeholder}
			{...props}
		/>
	)
}

export default InputText