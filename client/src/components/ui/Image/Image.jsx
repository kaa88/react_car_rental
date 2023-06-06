import React from 'react';
import classes from './Image.module.css';


function Image({className, ...props}) {
	
	return (
		<picture>
			{/* add srcset */}
			<img
				className={classes.img}
				src=''
				alt=''
				loading='lazy'
				{...props}
			/>
		</picture>
	)
}

export default Image