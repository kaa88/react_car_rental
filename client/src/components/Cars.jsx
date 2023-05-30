import React, { useState } from 'react';
import classes from './Cars.module.css';
import Container from './Container';
import Slider from './Slider';
import Image from './ui/Image';
import Icon from './ui/Icon';
import Button from './ui/Button';
import carData from '../data/cars.json';
import currencyData from '../data/currencies.json';

import __ from './script/translate'

__('car')

function Cars() {

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

	let carParams = carData.parameters;
	let [currency, setCurrency] = useState(currencyData.rub);
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
								<p>{param.name}: <span className='bold'>{car.params[i]}</span></p>
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
							<Icon className={classes.priceCurrency} name={currency.icon} />
						</span>
						<span>
							/per day
						</span>
					</div>
					<div className={classes.actionButtons}>
						<Button className={classes.actionBtn}>Book now</Button>
						<Button className={classes.infoBtn} modif='negative'>View details</Button>
					</div>
				</div>
			</div>

		</swiper-slide>
	)

	return (
		<section className={classes.cars}>
			<Container>
				<h3 className='fz36 tac color02'>Our cars</h3>
				<Slider className={classes.slider} swiperParams={swiperParams}>{slides}</Slider>

				<h3 className={classes.reqsTitle}>Reqierments</h3>
				<div className={classes.reqs}>
					<p className={classes.reqsItem}>You must be 21+ years old</p>
					<p className={classes.reqsItem}>Personal driver licence</p>
					<p className={classes.reqsItem}>Valid credit card and 300 euro deposit</p>
					<p className={classes.reqsItem}>Official document (driver licence or passport) for another driver</p>
				</div>

			</Container>
		</section>
	)
}

export default Cars