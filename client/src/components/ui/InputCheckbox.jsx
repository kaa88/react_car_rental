import React from 'react';
import classes from './InputCheckbox.module.css';
import Icon from './Icon';


function InputCheckbox({
	children,
	...props
}) {
	return (
		<label className={classes.wrapper}>
			<input
				type='checkbox'
				{...props}
			/>
			<span className={classes.box}>
				<Icon name='icon-ok' className={classes.boxIcon} style={{width: '7.4px', height: '5.7px'}} />
			</span>
			<span className={classes.text}>{children}</span>
		</label>
	)
}

export default InputCheckbox