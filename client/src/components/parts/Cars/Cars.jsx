import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import carData from './Cars.data.json';
import classes from './Cars.module.scss';
import Container from '../../ui/Container/Container';
import Requirements from './Requirements/Requirements';
import Slider from '../Slider/Slider';
import Button from '../../ui/Button/Button';
import TranslateHandler from '../../TranslateHandler';
import ModalLink from '../../ui/Modal/ModalLink'
import Image from '../../ui/Image/Image';
import Icon from '../../ui/Icon/Icon';

const IMAGE_DIR = 'img/'
const IMAGE_EXT = '.jpg'

// Note: хотел сделать разбивку на компоненты, но swiper отказывается работать с множественной вложенностью (а может другая причина), почему-то перестают инициализироваться кнопки навигации и пагинация... Пришлось напихать всё сюда

const Cars = memo(function Cars() {

	const currencyStore = useSelector(state => state.currency)
	let currency = {
		name: currencyStore.current,
		rate: currencyStore.rates[currencyStore.current]
	}

	function getCarImage(car) {
		return <Image src={`${IMAGE_DIR}${car.id}${IMAGE_EXT}`} />
	}

	function getCarParams(car) {
		const carParams = carData.parameters
		return carParams.map((param, i) =>
			<div className={classes.carParamsItem} key={i}>
				<Icon className={classes.carParamsIcon} name={param.icon} />
				<p>{`?_${param.name}`}: <span className='bold'>{`?_${car.params[i]}`}</span></p>
			</div>
		)
	}

	function getCarAdditionalParams(car) {
		const paramsFullNames = carData.additional
		return car.additionalParams.map((paramId, i) =>
			<p key={i}>{`?_${paramsFullNames[paramId]}`}</p>
		)
	}

	function getCarPrice(car) { return (
		<>
			<span className='bold'>
				{Math.floor(car.price * currency.rate)}
			</span>
			<span>
				<Icon className={classes.priceCurrencyIcon} name={`icon-${currency.name}`} />
			</span>
			<span>/</span>
			<span>?_per day</span>
		</>
	)}

	function getModalContent(car) {
		return (
			<div className={classes.modalContent}>
				<Container className={classes.container}>
					<div className={classes.carName}>{car.name}</div>
					<div className={classes.carImage}>{getCarImage(car)}</div>
					<div className={classes.carParams}>{getCarParams(car)}</div>
					<div className={classes.carAdditionalParams}>{getCarAdditionalParams(car)}</div>
					<Button className={classes.actionBtn} data-car-id={car.id}>?_Book now</Button>
					{/* button read more */}
					{/* button return */}
				</Container>
			</div>
		)
	}

	function getSlides() {
		return carData.cars.map((car, index) =>
			<swiper-slide key={index}>
				<div className={classes.slide}>
					<div className={classes.carImage}>{getCarImage(car)}</div>
					<p className={classes.carName}>{car.name}</p>
					<div className={classes.carParams}>{getCarParams(car)}</div>
					<p className={classes.carPrice}>{getCarPrice(car)}</p>
					<div className={classes.actionButtons}>
						<Button className={classes.actionBtn} data-car-id={car.id}>?_Book now</Button>
						<ModalLink name={car.id} content={getModalContent(car)}>
							<Button className={classes.infoBtn} modif='negative'>?_View details</Button>
						</ModalLink>
					</div>
				</div>
			</swiper-slide>
		)
	}

	const swiperParams = {
		slidesPerView: 1,
		loop: true,
		effect: 'fade',
		navigation: {
			prevEl: '.' + classes.buttonPrev,
			nextEl: '.' + classes.buttonNext,
		},
		pagination: {
			el: '.' + classes.pagination,
			type: 'bullets',
			clickable: true
		},
	}

	return (
		<TranslateHandler>
			<section className={classes.cars}>
				<Container>
					<h3 className='fz36 tac color02'>?_Our cars</h3>
					<Slider modif='paginationTop' className={classes.slider} swiperParams={swiperParams}>
						{getSlides()}
					</Slider>
					<Requirements />
				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Cars