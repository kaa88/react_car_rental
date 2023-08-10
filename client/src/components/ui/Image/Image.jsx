import React, { useRef } from 'react';
import classes from './Image.module.scss';

// TODO: add picture source for media queries

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
		<img
			className={`${className} ${classes.img}`}
			src={img}
			srcSet={img2x ? `${img2x} 2x` : ``}
			alt=''
			loading='lazy'
			onLoad={refresh}
			onError={hideImageOnError}
			ref={imageRef}
			{...props}
		/>
	)
}

export default Image