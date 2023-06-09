import React from 'react';
import classes from './Divider.module.scss';

function Divider({modif = 'light', className = '', ...props}) {

	return (
		<span className={`${className} ${classes[modif]}`} {...props}></span>
	)
}

export default Divider