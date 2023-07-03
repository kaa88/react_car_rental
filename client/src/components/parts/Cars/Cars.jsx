import React, { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveModal } from '../../../store/reducers/modalReducer'
import classes from './Cars.module.scss';
import Container from '../../ui/Container/Container';
import Slider from '../Slider/Slider';
import Image from '../../ui/Image/Image';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import carData from './Cars.data.json';
import TranslateHandler from '../../TranslateHandler';
import Modal from '../../ui/Modal/Modal';

const IMAGE_DIR = 'img/'
const IMAGE_EXT = '.jpg'

const Cars = memo(function Cars() {
	// console.log('render cars');

	const swiperParams = {
		slidesPerView: 1,
		loop: true,
		effect: 'fade',
		navigation: {
			prevEl: '.' + classes.buttonPrev,
			nextEl: '.' + classes.buttonNext,
		},
		pagination: {
			el: '.' + classes.pagination,// + ' div',
			type: 'bullets',
			clickable: true
		},
	}
	const carParams = carData.parameters

	const currencyStore = useSelector(state => state.currency)
	const currency = {
		name: currencyStore.current,
		rate: currencyStore.rates[currencyStore.current]
	}

	let slides = carData.cars.map((car, index) =>
		<swiper-slide key={index}>
			<div className={classes.slide}>

				<div className={classes.image}>
					<Image src={`${IMAGE_DIR}${car.id}${IMAGE_EXT}`} />
				</div>

				<p className={classes.carName}>{car.name}</p>

				<div className={classes.info}>
					{carParams.map((param, i) =>
						<div key={i} className={classes.infoItem}>
							<Icon
								name={param.icon}
								size='16px'
								className={`${classes.infoIcon} ${
									param.icon === 'icon-engine'
									? classes.infoIcon_stroke
									: ''
								}`}
							/>
							<p>{`?_${param.name}`}: <span className='bold'>{`?_${car.params[i]}`}</span></p>
						</div>
					)}
				</div>

				<div className={classes.price}>
					<span className='bold'>
						{Math.floor(car.price * currency.rate)}
					</span>
					<span>
						<Icon className={classes.priceCurrencyIcon} name={`icon-${currency.name}`} />
					</span>
					<span>/</span>
					<span>?_per day</span>
				</div>

				<div className={classes.actionButtons}>
					<Button className={classes.actionBtn}>?_Book now</Button>
					<Button className={classes.infoBtn} modif='negative'>?_View details</Button>
				</div>

			</div>
		</swiper-slide>
	)
	
	// modal
	const dispatch = useDispatch()
	const modalName = 'cars_modal'

	function showModal() {
		console.log('show modal');
		dispatch(setActiveModal(modalName))
	}

	// end modal

	return (
		<TranslateHandler>
			<section className={classes.cars}>
				<Container>

					<h3 className='fz36 tac color02'>?_Our cars</h3>

					<Slider modif='paginationTop' className={classes.slider} swiperParams={swiperParams}>
						{slides}
					</Slider>

					<h3 className={classes.reqsTitle}>?_Requirements</h3>
					<div className={classes.reqs}>
						<p className={classes.reqsItem}>?_You must be 21+ years old</p>
						<p className={classes.reqsItem}>?_Personal driver licence</p>
						<p className={classes.reqsItem}>?_Valid credit card and 300 euro deposit</p>
						<p className={classes.reqsItem}>?_Official document (driver licence or passport) for another driver</p>
					</div>

					<button onClick={showModal} style={{width: '200px', height: '100px'}}>show modal</button>

					<Modal name={modalName}>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error porro pariatur dolorem consequuntur totam, a itaque ipsam sed ducimus doloribus? Tempora voluptate ipsa tenetur delectus deleniti aliquam eius, dignissimos pariatur ipsum temporibus omnis deserunt impedit repellendus sapiente veritatis nulla minus perferendis quaerat illo eligendi neque architecto voluptatibus velit placeat alias!</p>
					</Modal>

				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Cars