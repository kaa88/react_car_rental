import { memo, useMemo, useState } from 'react';
import script from './Period.script';
import classes from './Period.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import { useCustomElement } from '../../../../../hooks/useCustomElement';
import Divider from '../../../../ui/Divider/Divider';
import InputText from '../../../../ui/InputText/InputText';
import Select from '../../../../ui/Select/Select';
import Popup from '../Popup/Popup';

const Period = memo(function Period({className = '', ...props}) {
	const now = new Date()
	const currentYear = now.getFullYear()
	const currentMonth = now.getMonth()
	const currentDate = now.getDate()
	const currentTime = now.getHours()

	const defaultReservationPeriod = {
		pickup: new Date(currentYear, currentMonth, currentDate, currentTime + 3),
		return: new Date(currentYear, currentMonth, currentDate + 1, currentTime + 3),
	}
	console.log(defaultReservationPeriod);
	let [reservationPeriod, setReservationPeriod] = useState(defaultReservationPeriod)

	let [monthId, setMonthId] = useState(currentMonth)

	const monthSelectData = useMemo(() => script.getMonthSelectData(monthId), [monthId])

	const createMonthElem = (monthId, isNextMonth) => {
		const calendar = script.getCalendar(monthId)
		const days = script.getDays()
		return (
			<div className={classes.popupMonthBox}>
				{
					!isNextMonth
						? <Select modif='reservation' data={monthSelectData} onSelect={handleMonthSelect} />
						: <div className={classes.popupTitle}>{`?_${calendar.monthName}`}</div>
				}
				<div className={classes.popupDays}>
					{days.map((item, index) =>
						<div key={index}>{`?_${item}`}</div>
					)}
				</div>
				<div className={classes.popupDates}>
					{calendar.dateList.map((item, index) =>
						<div className={`${classes.popupDateItem} ${item ? '' : classes.disabled}`} key={index}>
							{item ? item : ''}
						</div>
					)}
				</div>
			</div>
		)}

	const handleMonthSelect = function(value){
		setMonthId(script.getMonthIndex(value))
	}

	let inputValues = {
		pickupDate: [
			reservationPeriod.pickup.getDate(),
			reservationPeriod.pickup.getMonth(),
			reservationPeriod.pickup.getFullYear(),
		].join('.'),
		pickupTime: [
			reservationPeriod.pickup.getHours(),
			reservationPeriod.pickup.getMinutes(),
		].join(':'),
		returnDate: [
			reservationPeriod.return.getDate(),
			reservationPeriod.return.getMonth(),
			reservationPeriod.return.getFullYear(),
		].join('.'),
		returnTime: [
			reservationPeriod.return.getHours(),
			reservationPeriod.return.getMinutes(),
		].join(':'),
	}

	console.log('render period');
	return (
		<TranslateHandler>
			<div className={`${classes.period} ${className}`} {...props}>

				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Pick up</p>
					<InputText className={classes.dateInput} modif='textCenter' value={inputValues.pickupDate} />
					<InputText className={classes.timeInput} modif='textCenter' value={inputValues.pickupTime} />
				</div>

				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Return</p>
					<InputText className={classes.dateInput} modif='textCenter' value={inputValues.returnDate} />
					<InputText className={classes.timeInput} modif='textCenter' value={inputValues.returnTime} />
				</div>

				<Popup className={classes.popup}>
					{createMonthElem(monthId)}
					<Divider className={classes.divider} modif='dark' />
					{createMonthElem(monthId + 1, true)}
				</Popup>

			</div>
		</TranslateHandler>
	)
})

export default Period