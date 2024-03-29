import classes from './CarModalContent.module.scss';
import Button from '../../../ui/Button/Button';
import Container from '../../../ui/Container/Container';
import Icon from '../../../ui/Icon/Icon';
import ModalLink from '../../../ui/Modal/ModalLink';
import CarImage from '../CarImage/CarImage';
import CarName from '../CarName/CarName';
import CarOptions from '../CarOptions/CarOptions';
import CarParams from '../CarParams/CarParams';
import TranslateHandler from '../../../TranslateHandler';
import { useNavigate } from 'react-router-dom';
import { setReservation } from '../../../../store/slices/reservationFormSlice';
import { useDispatch, useSelector } from 'react-redux';

const CarModalContent = function({carId, carData = {}, modif = ''}) {

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userID = useSelector(state => state.user.id)
	const modalName = 'cars'

	const car = carData.cars.find(item => item.id === carId)
	const currentSlideModalContent = {
		carId: car ? car.shortName : '',
		carName: <CarName className={classes.carName} car={car} />,
		carImage: <CarImage className={classes.carImage} car={car} />,
		carParams: <CarParams className={classes.carParams} car={car} carParams={carData.params} />,
		carOptions: <CarOptions className={classes.carOptions} car={car} optionNames={carData.options} />,
	}

	function createReservation(e) {
		if (!userID) return;
		dispatch(setReservation({car}))
		navigate('/reservation')
	}

	function getModalContent() {
		const content = currentSlideModalContent
		return (
			<div className={classes.modalContent}>
				<Container className={classes.container}>
					{content.carName}
					{content.carImage}
					{content.carParams}
					{content.carOptions}
					<ModalLink name={modalName} content={getModalReadMoreContent}>
						<div className={classes.readMoreBtn}>
							<span>{`?_Read more`}</span>
							<Icon className={classes.readMoreBtnIcon} name='icon-arrow-short' />
						</div>
					</ModalLink>
					{modif !== 'reservation' &&
						<ModalLink name={userID ? '' : 'login'}>
							<Button className={classes.actionBtn} data-car-id={content.carId} onClick={createReservation}>?_Book now</Button>
						</ModalLink>
					}
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
					{content.carName}
					{content.carOptions}
					<ModalLink name={modalName} content={getModalContent}>
						<div className={classes.returnButton}>?_Return</div>
					</ModalLink>
				</Container>
			</div>
		)
	}

	return (
		<TranslateHandler>
			{getModalContent()}
		</TranslateHandler>
	)
}
export default CarModalContent