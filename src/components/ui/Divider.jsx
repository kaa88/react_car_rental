import React from 'react';
import classes from './Divider.module.css';

function Divider(props) {
	return (
		<span className={classes.divider} {...props}></span>
	)
}

export default Divider