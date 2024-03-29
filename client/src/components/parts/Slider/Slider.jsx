import { useEffect, useRef } from 'react';
import './Slider.scss';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';


function Slider({
	modif = '',
	className = '',
	children,
	swiperParams = {},
	// onSlideChange = function(carId){},
	...props
}) {

	const swiperEl = useRef()
	useEffect(() => {
		const sw = Object.assign(swiperEl.current, swiperParams)
		sw.initialize()
		// swiperEl.current.addEventListener('slidechange', (e) => {
		// 	onSlideChange(e.detail[0].realIndex)
		// 	console.log(e.detail[0].realIndex);
		// })
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	const prevButtonClassName = `swiper-button-prev ${swiperParams.navigation.prevEl.substring(1)}`
	const nextButtonClassName = `swiper-button-next ${swiperParams.navigation.nextEl.substring(1)}`
	const paginationClassName = `swiper-pagination ${swiperParams.pagination.el.substring(1)}`

	return (
		<div className={`${className} ${modif} swiper`} {...props}>
			<swiper-container ref={swiperEl} init='false'>
				{children}
			</swiper-container>
			<div className="swiperNavigationBox">
				<Button className={prevButtonClassName} modif='negative'>
					<Icon name='icon-arrow-short' />
				</Button>
				<div className={paginationClassName}>
					<div></div>
				</div>
				<Button className={nextButtonClassName} modif='negative'>
					<Icon name='icon-arrow-short' />
				</Button>
			</div>
		</div>
	)
}

export default Slider