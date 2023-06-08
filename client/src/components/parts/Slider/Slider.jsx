import React, { useEffect, useRef } from 'react';
import './Slider.scss';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';


function Slider({className = '', children, swiperParams, ...props}) {

	let swiperEl = useRef();
	useEffect(() => {
		let sw = Object.assign(swiperEl.current, swiperParams);
		sw.initialize();
	})

	return (
		<div className={className}>
			<swiper-container ref={swiperEl} init='false'>
				{children}
			</swiper-container>
			<div className={`swiper-pagination ${swiperParams.pagination.el.substring(1)}`}></div>
			<Button className={`swiper-button-prev ${swiperParams.navigation.prevEl.substring(1)}`} modif='negative'>
				<Icon name='icon-arrow-short' size='28px' style={{marginLeft: '2px'}} />
			</Button>
			<Button className={`swiper-button-next ${swiperParams.navigation.nextEl.substring(1)}`} modif='negative'>
				<Icon name='icon-arrow-short' size='28px' style={{marginLeft: '2px'}} />
			</Button>
		</div>
	)
}

export default Slider