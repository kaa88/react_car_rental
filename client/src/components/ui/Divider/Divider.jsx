import React from 'react';
import classes from './Divider.module.scss';

function Divider({className = '', ...props}) {

	return (
		<span className={`${className} ${classes.divider}`} {...props}></span>
	)
}

export default Divider