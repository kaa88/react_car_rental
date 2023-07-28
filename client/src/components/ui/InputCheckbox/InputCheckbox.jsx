import { useState } from 'react';
import classes from './InputCheckbox.module.scss';
import Icon from '../Icon/Icon';


function InputCheckbox({
	modif = 'dark',
	className = '',
	name = '',
	onChange = function(){},
	checked = false,
	clickableText = true,
	children,
	...props
}) {

	let [state, setState] = useState(checked)

	function handleChange() {
		let newState = state ? false : true
		setState(newState)
		onChange(name, newState)
	}

	const textEl = <span className={classes.text}>{children}</span>

	return (
		<div className={`${className} ${classes[modif]} ${classes.wrapper}`}>
			<label className={classes.label}>
				<input
					type='checkbox'
					name={name}
					checked={state}
					onChange={handleChange}
					{...props}
				/>
				<i className={classes.box}>
					<Icon className={classes.boxIcon} name='icon-ok' />
				</i>
				{clickableText ? textEl : ''}
			</label>
			{clickableText ? '' : textEl}
		</div>
	)
}

export default InputCheckbox