import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetching } from '../../../hooks/useFetching';
import classes from './Cars.module.scss';
import Container from '../../ui/Container/Container';
import Requirements from './Requirements/Requirements';
import Slider from '../Slider/Slider';
import Button from '../../ui/Button/Button';
import TranslateHandler from '../../TranslateHandler';
import ModalLink from '../../ui/Modal/ModalLink'
import FetchService from '../../../services/FetchService';
import Loader from '../../ui/Loader/Loader';
import LoadError from '../../ui/Loader/LoadError';
import Anchor from '../../ui/Anchor/Anchor';
import CarImage from './CarImage/CarImage';
import CarModalContent from './CarModalContent/CarModalContent';
import CarParams from './CarParams/CarParams';
import CarPrice from './CarPrice/CarPrice';
import CarName from './CarName/CarName';
import { useNavigate } from 'react-router-dom';
import { setReservation } from '../../../store/slices/reservationFormSlice';

// Note: хотел сделать разбивку на компоненты, но swiper отказывается работать с множественной вложенностью (а может другая причина), перестают инициализироваться кнопки навигации и пагинация... Пришлось напихать всё сюда

const Cars = memo(function Cars() {

	const navigate = useNavigate()
	const dispatch = useDispatch()

	// carData
	const defaultCarData = {
		cars: [],
		params: [],
		options: []
	}
	let [carData, setCarData] = useState(defaultCarData)
	let [fetchData, dataIsLoading, loadingError] = useFetching(getCarData)

	async function getCarData() {
		let data = {
			cars: await FetchService.getCars(),
			params: await FetchService.getCarParams(),
			options: await FetchService.getCarOptions(),
		}
		setCarData(data)
	}
	useEffect(() => { fetchData() }, [])
	//end carData


	const modalName = 'cars'

	function getModalContent(index) {
		return <CarModalContent carIndex={index} carData={carData} />
	}

	function createReservation(e) {
		dispatch(setReservation({car: carData.cars.find(item => item.id === Number(e.currentTarget.dataset.carId))}))
		navigate('/reservation')
	}

	function getSlides() {
		return carData.cars.map((car, index) =>
			<swiper-slide key={index}>
				<div className={classes.slide}>
					<CarImage className={classes.carImage} car={car} />
					<CarName className={classes.carName} car={car} />
					<CarParams className={classes.carParams} car={car} carParams={carData.params} />
					<CarPrice className={classes.carPrice} car={car} />
					<div className={classes.actionButtons}>
						<Button className={classes.actionBtn} data-car-id={car.id} onClick={createReservation}>?_Book now</Button>
						<ModalLink name={modalName} content={getModalContent.bind(null, index)}>
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
				<Anchor name='cars' />

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
								// onSlideChange={updateModalContent}
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