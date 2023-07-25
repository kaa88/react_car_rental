import { useEffect, useState } from 'react';
import classes from './InputPassword.module.scss';
import Icon from '../Icon/Icon';

const PASSWORD = 'password'
const TEXT = 'text'

function InputPassword({
	modif = 'default',
	className = '',
	// validation = true,
	// required = false,
	// onChange = function(obj) {},
	...props
}) {

	let [value, setValue] = useState('')
	let [type, setType] = useState(PASSWORD)

	const icons = {
		[PASSWORD]: 'icon-eye-close',
		[TEXT]: 'icon-eye'
	}

	function handleChange(e) {
		let value = e.target.value
		setValue(value)
		// onChange({
		// 	isValid: validate(value),
		// 	value
		// })
	}

	function changeVisibility() {
		if (type === PASSWORD) setType(TEXT)
		else setType(PASSWORD)
	}

	function resetType() {
		if (type !== PASSWORD) setType(PASSWORD)
	}

	// function validate(value, required) {
	// 	if (!value && required) return false
	// 	if (value && !validation) return true
	// 	else if (value.length < 4) return false
	// 	else return true
	// }

	useEffect(() => {
		// onChange({
		// 	isValid: validate(value),
		// 	value
		// })
		resetType()
		return () => resetType()
	}, [])

	return (
		<div className={`${className} ${classes.inputBox}`}>
			<input
				type={type}
				className={classes[modif]}
				value={value}
				onChange={handleChange}
				{...props}
			/>
			<div className={classes.iconBox}>
				<Icon className={classes.icon} name={icons[type]} onClick={changeVisibility} />
			</div>
		</div>
	)
}

export default InputPassword