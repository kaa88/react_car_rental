import { useState } from 'react';
import classes from './InputCheckbox.module.scss';
import Icon from '../Icon/Icon';


function InputCheckbox({
	className = '',
	name = '',
	onChange = function(){},
	checked = false,
	children,
	...props
}) {

	let [state, setState] = useState(checked)

	function handleChange() {
		let newState = state ? false : true
		setState(newState)
		onChange(name, newState)
	}

	return (
		<label className={`${className} ${classes.wrapper}`}>
			<input
				type='checkbox'
				name={name}
				checked={state}
				onChange={handleChange}
				{...props}
			/>
			<span className={classes.box}>
				<Icon className={classes.boxIcon} name='icon-ok' />
			</span>
			<span className={classes.text}>{children}</span>
		</label>
	)
}

export default InputCheckbox