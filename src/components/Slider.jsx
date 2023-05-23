import React, { useEffect, useRef } from 'react';
import './Slider.css';
import Icon from './ui/Icon';
import Button from './ui/Button';


function Slider({className = '', children, swiperParams, ...props}) {

	let swiperEl = useRef();
	useEffect(() => {
		let sw = Object.assign(swiperEl.current, swiperParams);
		sw.initialize();
	})

	return (
		<swiper-container ref={swiperEl} class={className} init='false'>
			{children}
			<div className="swiper-pagination"></div>
			<Button className="swiper-button-prev" modif='negative'>
				<Icon name='icon-arrow-short' size='28px' style={{marginLeft: '2px'}} />
			</Button>
			<Button className="swiper-button-next" modif='negative'>
				<Icon name='icon-arrow-short' size='28px' style={{marginLeft: '2px'}} />
			</Button>
		</swiper-container>
	)
}

export default Slider