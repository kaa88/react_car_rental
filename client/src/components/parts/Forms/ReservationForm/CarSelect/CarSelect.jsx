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
import { setCar } from '../../../../../store/slices/reservationFormSlice';
import Button from '../../../../ui/Button/Button';


const CarSelect = memo(function CarSelect({className = '', ...props}) {

	const dispatch = useDispatch()
	const formDataOptions = useSelector(state => state.reservationForm.options)
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
		if (!selectedCar) dispatch(setCar(data.cars[0]))
	}
	useEffect(() => { fetchData() }, [])
	//end carData


	function selectItem(e) {
		let car = carData.cars.find(item => item.id === Number(e.currentTarget.dataset.index))
		dispatch(setCar(car))
	}

	function getCarList() {
		return carData.cars.map((item, index) =>
			<div
				className={`${classes.listItem} ${selectedCar?.id === item.id ? classes.active : ''}`}
				onClick={selectItem}
				data-index={item.id}
				key={index}
			>
				{item.name}
			</div>
		)
	}

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.wrapper}`} {...props}>
				<div className={classes.info}>
					<CarImage car={selectedCar} />
					<CarParams car={selectedCar} carParams={carData.params} />
					<Button type='button'>INFO</Button>
				</div>
				<div className={classes.list}>
					{getCarList()}
				</div>
			</div>
		</TranslateHandler>
	)
})

export default CarSelect