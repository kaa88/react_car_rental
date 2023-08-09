import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './CarSelect.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import FetchService from '../../../../../services/FetchService';
import { useFetching } from '../../../../../hooks/useFetching';
import CarName from '../../../Cars/CarName/CarName';
import CarImage from '../../../Cars/CarImage/CarImage';
import CarParams from '../../../Cars/CarParams/CarParams';
import CarPrice from '../../../Cars/CarPrice/CarPrice';
import { setReservation } from '../../../../../store/slices/reservationFormSlice';
import Button from '../../../../ui/Button/Button';
import Icon from '../../../../ui/Icon/Icon';
import ModalLink from '../../../../ui/Modal/ModalLink';
import Loader from '../../../../ui/Loader/Loader';


const CarSelect = memo(function CarSelect({className = '', ...props}) {

	const dispatch = useDispatch()
	// const formDataOptions = useSelector(state => state.reservationForm.options)
	const selectedCar = useSelector(state => state.reservationForm.car)


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
		if (!selectedCar) dispatch(setReservation({car: data.cars[0]}))
	}
	useEffect(() => { fetchData() }, [])
	//end carData


	function selectItem(e) {
		let car = carData.cars.find(item => item.id === Number(e.currentTarget.dataset.index))
		dispatch(setReservation({car}))
	}

	function getCarList() {
		return carData.cars.map((item, index) =>
			<div
				className={`${classes.listItem} ${selectedCar?.id === item.id ? classes.active : ''}`}
				onClick={selectItem}
				data-index={item.id}
				key={index}
			>
				<Icon className={classes.listIcon} name='icon-ok' />
				<span>{item.name}</span>
			</div>
		)
	}

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.wrapper}`} {...props}>
				{dataIsLoading && <Loader className={classes.loader} />}
				<div className={classes.info}>
					<CarImage className={classes.carImage} car={selectedCar} />
					<CarParams className={classes.carParams} car={selectedCar} carParams={carData.params} />
					<ModalLink name=''>
						<Button className={classes.infoBtn} type='button' modif='negative'>?_View details</Button>
					</ModalLink>
				</div>
				<div className={classes.list}>
					<p className={classes.listTitle}>?_Select a car</p>
					{getCarList()}
				</div>
			</div>
		</TranslateHandler>
	)
})

export default CarSelect