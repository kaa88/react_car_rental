import { memo, useEffect, useState } from 'react';
import classes from './Feedback.module.scss';
import Container from '../../ui/Container/Container';
import Image from '../../ui/Image/Image';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import Slider from '../Slider/Slider';
import TranslateHandler from '../../TranslateHandler';
import { useFetching } from '../../../hooks/useFetching';
import FetchService from '../../../services/fetch';
import Loader from '../../ui/Loader/Loader';
import LoadError from '../../ui/Loader/LoadError';

const IMAGE_DIR = 'img/user_photos/'

const Feedback = memo(function Feedback() {

	const defaultFeedbackData = []
	let [feedbackData, setFeedbackData] = useState(defaultFeedbackData)
	let [fetchData, dataIsLoading, loadingError] = useFetching(getFeedbacks)

	async function getFeedbacks() {
		let data = await FetchService.getFeedback()
		console.log(data);
		setFeedbackData(data)
	}

	useEffect(() => {
		fetchData()
	}, [])

	function fillRating(rating) {
		rating = Number(rating)
		if (isNaN(rating)) return console.warn('WARN! Feedback rating is NaN. Expected "Number".')
		return new Array(rating).fill(true).map((c,i) => <Icon key={i} name='icon-star' />)
	}

	let slides = feedbackData.map((item, index) =>
		<swiper-slide key={index}>
			<div className={classes.slide}>
				<div className={classes.image}>
					<div className={classes.imgWrapper}>
						{item.image && <Image src={IMAGE_DIR + item.image} />}
					</div>
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
					{item.author}
				</p>
			</div>
		</swiper-slide>
	)

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

	return (
		<TranslateHandler>
			<section className={classes.feedback}>
				<Container className={classes.container}>
					<h3 className='fz36 color02 tac'>?_Feedback</h3>

					<div className={classes.sliderBox}>
						{dataIsLoading && <Loader className={classes.loader} />}
						{loadingError && <LoadError className={classes.loadError} />}
						{!!feedbackData.length &&
							<Slider className={classes.slider} swiperParams={swiperParams}>{slides}</Slider>
						}
					</div>
					
					<Button className={classes.addBtn} modif='negative'>?_Leave a feedback</Button>
				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Feedback