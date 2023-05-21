import React from 'react';
import classes from './TextTitle.module.css';

function TextTitle(props) {
	return (
		<h3 className={classes.default} {...props}>
			{props.children}
		</h3>
	)
}

export default TextTitle