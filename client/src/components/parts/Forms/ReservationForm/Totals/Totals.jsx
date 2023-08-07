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

	const currency = useSelector(state => state.currency)
	console.log(currency);
	const currencyName = currency.current
	const currencyRate = currency.rates[currencyName]

	let totalPrice = 0
	if (selectedCar?.price && numOfDays) totalPrice = selectedCar.price * numOfDays + differentLocationTax
	totalPrice = Math.floor(totalPrice * currencyRate)

	useEffect(() => {
		dispatch(setTotalPrice(totalPrice))
	}, [totalPrice])


	const fields = [
		{
			title: 'Car',
			text: selectedCar?.name || '',
			className: '',
			icon: 'icon-star',
		},
		{
			title: 'Date',
			text: `${PeriodScript.getStringifiedDate(pickupDate)} - ${PeriodScript.getStringifiedDate(returnDate)}`,
			className: '',
			icon: 'icon-calendar',
		},
		{
			title: 'Time',
			text: PeriodScript.getStringifiedTime(pickupDate),
			className: '',
			icon: 'icon-clock',
		},
		{
			title: 'Location',
			text: location,
			className: '',
			icon: 'icon-point',
		},
		{
			title: 'Return to different location',
			text: isDifferentReturnLocation ? 'yes' : 'no',
			className: '',
			icon: 'icon-globe',
		},
		{
			title: 'Car price per day',
			text: selectedCar?.price || '',
			className: 'carPrice',
			icon: `icon-${currencyName}`,
			rightSideIcon: true
		},
		{
			title: 'Number of days',
			text: numOfDays,
			className: 'days',
			icon: '',
		},
		{
			title: 'Return location tax',
			text: differentLocationTax,
			className: 'returnTax',
			icon: `icon-${currencyName}`,
			rightSideIcon: true
		},
		{
			title: 'Total price',
			text: totalPrice,
			className: 'totalPrice',
			icon: `icon-${currencyName}`,
			rightSideIcon: true
		},
	]

	return (
		<TranslateHandler>
			<div className={`${className} ${classes.wrapper}`} {...props}>
				{fields.map((item, i) =>
					<div className={`${classes.item} ${classes[item.className]}`} key={i}>
						{!!item.icon && !item.rightSideIcon &&
							<Icon className={classes.icon} name={item.icon} />
						}
						<span className={classes.title}>
							<span>?_{item.title}</span>
							<span>:</span>
						</span>
						<span className={classes.text}>{item.text}</span>
						{!!item.icon && item.rightSideIcon &&
							<Icon className={classes.currencyIcon} name={item.icon} />
						}
					</div>
				)}
			</div>
		</TranslateHandler>
	)
})

export default Totals