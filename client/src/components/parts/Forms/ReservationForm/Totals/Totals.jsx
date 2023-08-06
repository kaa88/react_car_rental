import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Totals.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import Icon from '../../../../ui/Icon/Icon';
import PeriodScript from '../Period/Period.script'
import { setTotalPrice } from '../../../../../store/slices/reservationFormSlice';


const Totals = memo(function Totals({className = '', ...props}) {

	const dispatch = useDispatch()
	const formData = useSelector(state => state.reservationForm)
	const selectedCar = formData.car
	const pickupDate = formData.pickup
	const returnDate = formData.return
	const numOfDays = Math.ceil((returnDate - pickupDate) / 60 / 60 / 24 / 1000)
	const location = formData.location
	const isDifferentReturnLocation = formData.options.isDifferentReturnLocation
	const differentLocationTax = isDifferentReturnLocation ? 50 : 0
	let totalPrice = 0
	if (selectedCar?.price && numOfDays) totalPrice = selectedCar.price * numOfDays + differentLocationTax

	useEffect(() => {
		dispatch(setTotalPrice(totalPrice))
	}, [totalPrice])

	const fields = [
		{
			title: 'Car',
			text: selectedCar?.name || '',
			className: 'carName',
			icon: '',
		},
		{
			title: 'Date',
			text: `${PeriodScript.getStringifiedDate(pickupDate)} - ${PeriodScript.getStringifiedDate(returnDate)}`,
			className: 'text',
			icon: 'icon-calendar',
		},
		{
			title: 'Time',
			text: PeriodScript.getStringifiedTime(pickupDate),
			className: 'text',
			icon: 'icon-clock',
		},
		{
			title: 'Days',
			text: numOfDays,
			className: 'text',
			icon: '',
		},
		{
			title: 'Location',
			text: location,
			className: 'text',
			icon: 'icon-point',
		},
		{
			title: 'Return to different location',
			text: isDifferentReturnLocation ? 'yes' : 'no',
			className: 'text',
			icon: '',
		},
		{
			title: 'carPricePerDay',
			text: selectedCar?.price || '',
			className: 'text',
			icon: 'icon-dollar',
		},
		{
			title: 'totalPrice',
			text: totalPrice,
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