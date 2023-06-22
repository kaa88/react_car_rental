import { memo } from 'react';
import classes from './Feedback.module.scss';
import Container from '../../ui/Container/Container';
import Image from '../../ui/Image/Image';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import Slider from '../Slider/Slider';
import feedbackData from './Feedback.data.json';
import TranslateHandler from '../../TranslateHandler';


const Feedback = memo(function Feedback() {

	let swiperParams = {
		slidesPerView: 1,
		loop: true,
		effect: 'fade',
		navigation: {
			prevEl: '.' + classes.buttonPrev,
			nextEl: '.' + classes.buttonNext
		},
		pagination: {
			el: '.' + classes.pagination,
			type: 'bullets',
			clickable: true
		},
	}

	function fillRating(rating) {
		rating = Number(rating);
		if (isNaN(rating)) return console.warn('WARN! Feedback rating is NaN. Expected "Number".')
		return new Array(rating).fill(true).map((c,i) => <Icon key={i} name='icon-star' />);
	}
	let imageDir = 'img/';
	let slides = feedbackData.map((item, index) =>
		<swiper-slide key={index}>
			<div className={classes.slide}>
				<div className={classes.image}>
					<Image src={`${imageDir}${item.img}`} />
				</div>
				<div className={classes.rating}>
					{fillRating(item.rating)}
				</div>
				<div className={classes.textBox}>
					<p className={classes.text}>
						{item.text}
					</p>
				</div>
				<p className={classes.name}>
					{item.name}
				</p>
			</div>
		</swiper-slide>
	)

	return (
		<TranslateHandler>
			<section className={classes.feedback}>
				<Container>
					<h3 className='fz36 color02 tac'>?_Feedback</h3>
					<Slider className={classes.slider} swiperParams={swiperParams}>{slides}</Slider>

					<Button className={classes.addBtn} modif='negative'>?_Leave a feedback</Button>

				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Feedback