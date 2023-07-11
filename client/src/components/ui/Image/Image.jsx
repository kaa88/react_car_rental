import React from 'react';
import classes from './Image.module.scss';


function Image({className = '', src = '', ...props}) {

	let img = src, img2x;
	if (Array.isArray(src)) [img, img2x] = src
	
	return (
		<picture>
			{/* add srcset */}
			<img
				className={`${className} ${classes.img}`}
				src={img}
				alt=''
				loading='lazy'
				{...props}
			/>
		</picture>
	)
}

export default Image