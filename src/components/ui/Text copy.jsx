import React from 'react';
import classes from './Text.module.css';

function Text({
	modif = 'default',
	tag,
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