import { useState } from 'react';
import classes from './InputEmail.module.scss';


function InputEmail({
	modif = 'default',
	className = '',
	required = false,
	onChange = function(obj) {},
	...props
}) {

	let [value, setValue] = useState('')

	function handleChange(e) {
		let value = e.target.value
		setValue(value)
		onChange({
			isValid: validate(value, required),
			value
		})
	}

	function validate(value, required) {
		if (!value && required) return false
		else if (value.length < 4) return false
		else return true
	}

	return (
		<input
			type='text'
			className={`${className} ${classes[modif]}`}
			value={value}
			onChange={handleChange}
			{...props}
		/>
	)
}

export default InputEmail