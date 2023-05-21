import React from 'react';
import classes from './Text.module.css';

function Text({
	// modif = 'default',
	tag,
	style = {},
	col,
	ff,
	fz,
	fw,
	...props
}) {
	let Tag = tag || 'p';
	
	return (
		<Tag className={classes.default} {...props}>
			{props.children}
		</Tag>
	)
}

export default Text

/*
ff
fz
fw
col
tag

*/