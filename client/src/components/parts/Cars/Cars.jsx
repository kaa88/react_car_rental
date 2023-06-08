import React, { useState } from 'react';
import store from '../../../store/index'
import classes from './Cars.module.scss';
import Container from '../../ui/Container/Container';
import Slider from '../Slider/Slider';
import Image from '../../ui/Image/Image';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import carData from './Cars.data.json';
import {Translate} from '../../../script/translate';


function Cars() {
	// console.log('render cars');

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

	function getCurrency(){
		const storeData = store.getState().currency
		return {
			name: storeData.current,
			rate: storeData.rates[storeData.current]
		}
	}
	let [currency, setCurrency] = useState(getCurrency())
	store.subscribe(() => setCurrency(getCurrency()))

	let carParams = carData.parameters;
	let imageDir = 'img/';

	let slides = carData.cars.map((car, index) =>
		<swiper-slide key={index}>

			<div className={classes.slide}>
				<div className={classes.image}>
					<Image src={`${imageDir}${car.id}.jpg`} />
				</div>

				<div className={classes.info}>
					<p className='bold'>{car.name}</p>
					{
						carParams.map((param, i) =>
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
						)
					}
				</div>

				<div className={classes.action}>
					<div className={classes.price}>
						<span className='bold'>
							{Math.floor(car.price * currency.rate)}
						</span>
						<span>
							<Icon className={classes.priceCurrency} name={`icon-${currency.name}`} />
						</span>
						<span>/</span>
						<span>?_per day</span>
					</div>
					<div className={classes.actionButtons}>
						<Button className={classes.actionBtn}>?_Book now</Button>
						<Button className={classes.infoBtn} modif='negative'>?_View details</Button>
					</div>
				</div>
			</div>

		</swiper-slide>
	)

	return (
		<Translate>
			<section className={classes.cars}>
				<Container>

					<h3 className='fz36 tac color02'>?_Our cars</h3>
					<Slider className={classes.slider} swiperParams={swiperParams}>{slides}</Slider>

					<h3 className={classes.reqsTitle}>?_Requirements</h3>
					<div className={classes.reqs}>
						<p className={classes.reqsItem}>?_You must be 21+ years old</p>
						<p className={classes.reqsItem}>?_Personal driver licence</p>
						<p className={classes.reqsItem}>?_Valid credit card and 300 euro deposit</p>
						<p className={classes.reqsItem}>?_Official document (driver licence or passport) for another driver</p>
					</div>

				</Container>
			</section>
		</Translate>
	)
}

export default Cars