import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetching } from '../../../hooks/useFetching';
import classes from './Cars.module.scss';
import images from './img'
import Container from '../../ui/Container/Container';
import Requirements from './Requirements/Requirements';
import Slider from '../Slider/Slider';
import Button from '../../ui/Button/Button';
import TranslateHandler from '../../TranslateHandler';
import ModalLink from '../../ui/Modal/ModalLink'
import Image from '../../ui/Image/Image';
import Icon from '../../ui/Icon/Icon';
import FetchService from '../../../services/FetchService';
import Loader from '../../ui/Loader/Loader';
import LoadError from '../../ui/Loader/LoadError';

// Note: хотел сделать разбивку на компоненты, но swiper отказывается работать с множественной вложенностью (а может другая причина), перестают инициализироваться кнопки навигации и пагинация... Пришлось напихать всё сюда

const Cars = memo(function Cars() {

	const defaultCarData = {
		cars: [],
		params: [],
		options: []
	}
	let [carData, setCarData] = useState(defaultCarData)
	let [fetchData, dataIsLoading, loadingError] = useFetching(getCarData)
	let [needToUpdateModal, setNeedToUpdateModal] = useState(false)

	async function getCarData() {
		let data = {
			cars: await FetchService.getCars(),
			params: await FetchService.getCarParams(),
			options: await FetchService.getCarOptions(),
		}
		setCarData(data)
		setNeedToUpdateModal(true)
	}
	
	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		if (needToUpdateModal) {
			updateModalContent()
			setNeedToUpdateModal(false)
		}
	})


	const currencyStore = useSelector(state => state.currency)
	let currency = {
		name: currencyStore.current,
		rate: currencyStore.rates[currencyStore.current]
	}

	const modalName = 'cars'
	const defaultCurrentSlideModalContent = getCurrentSlideModalContent(0)
	let [currentSlideModalContent, setCurrentSlideModalContent] = useState(defaultCurrentSlideModalContent)

	function getCurrentSlideModalContent(index = 0) {
		const car = carData.cars[index] || {}
		return {
			carId: car.shortName || '',
			carName: car.name || '',
			carImage: getCarImage(car) || '',
			carParams: getCarParams(car) || [],
			carOptions: getCarOptions(car) || [],
		}
	}
	function updateModalContent(index) {
		setCurrentSlideModalContent(getCurrentSlideModalContent(index))
	}

	function getCarImage(car) {
		return <Image src={images[car.shortName]} />
	}

	function getCarParams(car) {
		const carParams = carData.params
		return carParams.map((param, i) =>
			<div className={classes.carParamsItem} key={i}>
				{param.abbr &&
					<Icon className={classes.carParamsIcon} name={`icon-${param.abbr}`} />
				}
				{param.name && car.params[i] &&
					<p>{`?_${param.name}`}: <span className='bold'>{`?_${car.params[i]}`}</span></p>
				}
			</div>
		)
	}

	function getCarOptions(car) {
		const optNames = carData.options
		if (!car.options || !optNames.length) return null

		return car.options.map((option, i) => {
			let item = optNames.find((item) => item.id === option)
			return item ? <p key={i}>{`?_${item.name}`}</p> : ''
		})
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

	function getModalContent() {
		const content = currentSlideModalContent
		return (
			<div className={classes.modalContent}>
				<Container className={classes.container}>
					<div className={classes.carName}>{content.carName}</div>
					<div className={classes.carImage}>{content.carImage}</div>
					<div className={classes.carParams}>{content.carParams}</div>
					<div className={classes.carOptions}>{content.carOptions}</div>
					<ModalLink name={modalName} content={getModalReadMoreContent}>
						<div className={classes.readMoreBtn}>
							<span>{`?_Read more`}</span>
							<Icon className={classes.readMoreBtnIcon} name='icon-arrow-short' />
						</div>
					</ModalLink>
					<Button className={classes.actionBtn} data-car-id={content.carId}>?_Book now</Button>
					<ModalLink name=''>
						<div className={classes.returnButton}>?_Return</div>
					</ModalLink>
				</Container>
			</div>
		)
	}

	function getModalReadMoreContent() {
		const content = currentSlideModalContent
		return (
			<div className={classes.modalReadMoreContent}>
				<Container className={classes.container}>
					<div className={classes.carName}>{content.carName}</div>
					<div className={classes.carOptions}>{content.carOptions}</div>
					<ModalLink name={modalName} content={getModalContent}>
						<div className={classes.returnButton}>?_Return</div>
					</ModalLink>
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
						<Button className={classes.actionBtn} data-car-id={car.shortName}>?_Book now</Button>
						<ModalLink name={modalName} content={getModalContent}>
							<Button className={classes.infoBtn} data-car-id={car.shortName} modif='negative'>?_View details</Button>
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
					<div className={classes.sliderBox}>
						{dataIsLoading && <Loader className={classes.loader} />}
						{loadingError && <LoadError className={classes.loadError} />}
						{!!carData.cars.length &&
							<Slider
								modif='paginationTop'
								className={classes.slider}
								swiperParams={swiperParams}
								onSlideChange={updateModalContent}
							>
								{getSlides()}
							</Slider>
						}
					</div>
					<Requirements />
				</Container>
			</section>
		</TranslateHandler>
	)
})

export default Cars