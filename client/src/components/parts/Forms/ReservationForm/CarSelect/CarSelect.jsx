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


const CarSelect = memo(function CarSelect({className = '', ...props}) {

	const dispatch = useDispatch()
	const formDataOptions = useSelector(state => state.reservationForm.options)


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

	let [selectedCar, setSelectedCar] = useState(0)

	function selectItem(e) {
		setSelectedCar(Number(e.currentTarget.dataset.index))
	}

	function getCarList() {
		console.log(selectedCar);
		return carData.cars.map((item, index) =>
			<div
				className={`${classes.listItem} ${selectedCar === index ? classes.active : ''}`}
				onClick={selectItem}
				data-index={index}
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
					<CarName car={carData.cars[selectedCar]} />
					<CarImage car={carData.cars[selectedCar]} />
					<CarParams car={carData.cars[selectedCar]} carParams={carData.params} />
					<CarPrice car={carData.cars[selectedCar]} />
				</div>
				<div className={classes.list}>
					{getCarList()}
				</div>
			</div>
		</TranslateHandler>
	)
})

export default CarSelect