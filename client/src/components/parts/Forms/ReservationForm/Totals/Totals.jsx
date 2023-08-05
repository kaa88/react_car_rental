import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Totals.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import FetchService from '../../../../../services/FetchService';
import { useFetching } from '../../../../../hooks/useFetching';
import Icon from '../../../../ui/Icon/Icon';


const Totals = memo(function Totals({className = '', ...props}) {

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

	const fields = [
		{
			title: 'Car',
			text: 'carName',
			className: 'carName',
			icon: '',
		},
		{
			title: 'Date',
			text: 'Date',
			className: 'date',
			icon: 'icon-calendar',
		},
		{
			title: 'Time',
			text: 'Time',
			className: 'time',
			icon: 'icon-clock',
		},
		{
			title: 'Days',
			text: 'Days',
			className: 'days',
			icon: '',
		},
		{
			title: 'Location',
			text: 'Location',
			className: 'location',
			icon: 'icon-point',
		},
		{
			title: 'diffReturn',
			text: 'diffReturn',
			className: 'diffReturn',
			icon: '',
		},
		{
			title: 'carPricePerDay',
			text: 'carPricePerDay',
			className: 'carPricePerDay',
			icon: 'icon-dollar',
		},
		{
			title: 'totalPrice',
			text: 'totalPrice',
			className: 'totalPrice',
			icon: 'icon-dollar',
		},
	]

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.wrapper}`} {...props}>
				{fields.map((item, i) =>
					<div className={classes.item} key={i}>
						{!!item.icon && <Icon className={classes.icon} name={item.icon} />}
						<span>?_{item.title}</span>
						<span>: </span>
						<span className={classes[item.className]}>{item.text}</span>
					</div>
				)}
			</div>
		</TranslateHandler>
	)
})

export default Totals