import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetching } from '../../../hooks/useFetching';
import classes from './Feedback.module.scss';
import Container from '../../ui/Container/Container';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import Slider from '../Slider/Slider';
import TranslateHandler from '../../TranslateHandler';
import FetchService from '../../../services/FetchService';
import Loader from '../../ui/Loader/Loader';
import LoadError from '../../ui/Loader/LoadError';
import UserPhoto from '../../ui/UserPhoto/UserPhoto';
import ModalLink from '../../ui/Modal/ModalLink'
import Anchor from '../../ui/Anchor/Anchor';

const IMAGE_DIR = process.env.REACT_APP_USER_PHOTOS_DIR


const Feedback = memo(function Feedback() {

	const userID = useSelector(state => state.user.id)

	const defaultFeedbackData = []
	let [feedbackData, setFeedbackData] = useState(defaultFeedbackData)
	let [fetchData, dataIsLoading, loadingError] = useFetching(getFeedbacks)

	async function getFeedbacks() {
		let data = await FetchService.getFeedback()
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
						<UserPhoto src={IMAGE_DIR + '/' + item.image} />
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
				<Anchor name='feedback' />

				<Container className={classes.container}>
					<h3 className='fz36 color02 tac'>?_Feedback</h3>

					<div className={classes.sliderBox}>
						{dataIsLoading && <Loader className={classes.loader} />}
						{loadingError && <LoadError className={classes.loadError} />}
						{!!feedbackData.length &&
							<Slider className={classes.slider} swiperParams={swiperParams}>{slides}</Slider>
						}
					</div>
					<ModalLink name={userID ? 'new_feedback' : 'login'}>
						<Button className={classes.addBtn} modif='negative'>?_Leave a feedback</Button>
					</ModalLink>
				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Feedback