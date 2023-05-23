import React, { useState } from 'react';
import classes from './Cars.module.css';
import Container from './Container';
import Slider from './Slider';
import Image from './ui/Image';
import Icon from './ui/Icon';
import Button from './ui/Button';
import carData from '../cars.json';
import currencyData from '../currencies.json';


function Cars() {

	let swiperParams = {
		slidesPerView: 1,
		loop: true,
		effect: 'fade',
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
	}

	let carParams = carData.parameters;
	let [currency, setCurrency] = useState(currencyData.rub);
	let imageDir = 'img/';

	let slides = carData.cars.map((car, index) =>
		<swiper-slide key={index}>

			<div className="swiper-slide__content">
				<div className="swiper-slide__image">
					<Image src={`${imageDir}${car.id}.jpg`} />
				</div>

				<div className="swiper-slide__info color02 fz20">
					<p className='bold'>{car.name}</p>
					{
						carParams.map((param, i) =>
							<div key={i} className="swiper-slide__infoItem">
								<Icon
									name={param.icon}
									size='16px'
									className={`swiper-slide__infoIcon${
										param.icon === 'icon-engine'
										? ' swiper-slide__infoIcon--stroke'
										: ''
									}`}
								/>
								<p>{param.name}: <span className='bold'>{car.params[i]}</span></p>
							</div>
						)
					}
				</div>

				<div className="swiper-slide__action">
					<div className="swiper-slide__price fz20 color02">
						<span className='bold'>
							{Math.floor(car.price * currency.rate)}
						</span>
						<span>
							<Icon className='swiper-slide__price-currency' name={currency.icon} />
						</span>
						<span>
							/per day
						</span>
					</div>
					<div className="swiper-slide__actionButtons">
						<Button>Book now</Button>
						<Button modif='negative'>View details</Button>
					</div>
				</div>
			</div>

		</swiper-slide>
	)

	return (
		<section className={classes.cars}>
			<Container>
				<h3 className='fz36 tac color02'>Our cars</h3>
				<Slider className='carSlider' swiperParams={swiperParams}>{slides}</Slider>

				<h3 className={`${classes.reqsTitle} fz36 tac color02`}>Reqierments</h3>
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