import React from 'react';
import classes from './Feedback.module.css';
import Container from './Container';
import Image from './ui/Image';
import Icon from './ui/Icon';
import Slider from './Slider';
import feedbackData from '../feedback.json';


function Feedback() {

	function fillRating(rating) {
		return new Array(Number(rating)).map((c, i) =>
			<Icon key={i} className='color04' name='icon-star' size='32px' />
		)
	}

	let swiperParams = {
		slidesPerView: 1,
		speed: 600,
		loop: true,
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		slideClass: 'swiper-slide'
	}

	let imageDir = 'img/';

	let slides = feedbackData.map((item, index) =>
		<swiper-slide key={index}>
			<div className="swiper-slide__content">
				<div className="swiper-slide__image">
					<Image src={`${imageDir}${item.img}`} />
				</div>
				<div className="swiper-slide__rating">
					{fillRating(item.rating)}
				</div>
				<p className="swiper-slide__text">
					{item.text}
				</p>
				<p className="swiper-slide__name">
					{item.name}
				</p>
			</div>
		</swiper-slide>
	)

	return (
		<section className={classes.feedback}>
			<Container>
				<h3 className='fz36 color02'>Feedback</h3>
				<Slider className='feedbackSlider' swiperParams={swiperParams}>{slides}</Slider>

				<div className="addFeedback"></div>

			</Container>
		</section>
	)
}

export default Feedback