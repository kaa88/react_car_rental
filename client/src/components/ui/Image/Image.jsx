import React, { useRef } from 'react';
import classes from './Image.module.scss';


function Image({className = '', src = '', ...props}) {

	let img = src, img2x;
	if (Array.isArray(src)) [img, img2x] = src

	const imageRef = useRef()

	function hideImageOnError() {
		imageRef.current.style.visibility = 'hidden'
	}

	function refresh() {
		imageRef.current.style = ''
	}
	
	return (
		<picture>
			{/* add srcset */}
			<img
				className={`${className} ${classes.img}`}
				src={img}
				alt=''
				loading='lazy'
				onLoad={refresh}
				onError={hideImageOnError}
				ref={imageRef}
				{...props}
			/>
		</picture>
	)
}

export default Image