import { memo, useEffect, useMemo, useState } from 'react';
import script from './Period.script';
import classes from './Period.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import { useCustomElement } from '../../../../../hooks/useCustomElement';
import Divider from '../../../../ui/Divider/Divider';
import InputText from '../../../../ui/InputText/InputText';
import Select from '../../../../ui/Select/Select';
import Popup from '../Popup/Popup';

const Period = memo(function Period({className = '', ...props}) {
	/*
		Строю календарь:
			- получаю дату
				- текущую при загрузке
				- установленную из ... стейта
			- проставляю в инпуты
		Кликаю в календаре, выбираю дату:
			- получаю дату из dataset числа
			- проставляю в инпуты
	*/
	const today = new Date()
	const currentYear = today.getFullYear()
	const currentMonth = today.getMonth()
	const currentDate = today.getDate()
	const currentTime = today.getHours()

	const defaultReturnPeriod ={ date: 1, hour: 3 }
	
	const defaultReservationPeriod = {
		pickup: new Date(currentYear, currentMonth, currentDate, currentTime + defaultReturnPeriod.hour),
		return: new Date(currentYear, currentMonth, currentDate + defaultReturnPeriod.date, currentTime + defaultReturnPeriod.hour),
	}
	let [reservationPeriod, setReservationPeriod] = useState(defaultReservationPeriod)
	let [selectorCurrentMonth, setSelectorCurrentMonth] = useState(new Date(currentYear, currentMonth)) //currentMonth

	const monthSelectData = useMemo(() => script.getMonthSelectData(selectorCurrentMonth), [selectorCurrentMonth])


	const createMonthElem = (date, isNextMonth) => {
		if (isNextMonth) date.setMonth(date.getMonth() + 1)
		console.log(date);
		const calendar = script.getCalendar(date)
		const daysLettersCount = 2
		const days = script.getDays(daysLettersCount)
		return (
			<div className={classes.popupMonthBox}>
				{!isNextMonth
					? <Select modif='reservation' data={monthSelectData} onSelect={handleMonthSelect} />
					: <div className={classes.popupTitle}>{`?_${calendar.monthName}`}</div>
				}
				<div className={classes.popupDays}>
					{days.map((day, i) =>
						<div key={i}>{`?_${day}`}</div>
					)}
				</div>
				<div className={classes.popupDates}>
					{calendar.dateList.map((item, index) => {
						let className = classes.popupDateItem
						if (!item) {
							className += ' ' + classes.disabled
							return <div className={className} key={index}></div>
						} else {
							let itemDate = new Date(date.getTime())
							itemDate.setDate(item)
							let systemDateString = script.getStringifiedSystemDate(itemDate)
							if (systemDateString === script.getStringifiedSystemDate(reservationPeriod.pickup))
								className += ' ' + classes.active
							if (systemDateString === script.getStringifiedSystemDate(reservationPeriod.return))
								className += ' ' + classes.activeReturn
							return (
								<div className={className} data-date={systemDateString} onClick={handleDateSelect} key={index}>
									{item}
								</div>
							)
						}
					})}
				</div>
			</div>
		)}

	const handleMonthSelect = function(value){
		// setSelectorCurrentMonth(new Date(script.getMonthIndex(value)))
	}
	const handleDateSelect = function(e){
		console.log(e.target.dataset.date);
	}

	useEffect(() => {
		handleMonthSelect()
		script.init({setReservationPeriod})
	}, [])


	let inputValues = script.getInputValues(reservationPeriod)

	console.log('render Period');
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
					{createMonthElem(selectorCurrentMonth)}
					<Divider className={classes.divider} modif='dark' />
					{createMonthElem(selectorCurrentMonth, true)}
				</Popup>

				{/* <Popup className={classes.popup}>
					{createMonthElem(reservationPeriod.pickup)}
					<Divider className={classes.divider} modif='dark' />
					{createMonthElem(reservationPeriod.pickup, true)}
				</Popup>

				<Popup className={classes.popup}>
					{createMonthElem(reservationPeriod.pickup)}
					<Divider className={classes.divider} modif='dark' />
					{createMonthElem(reservationPeriod.pickup, true)}
				</Popup>

				<Popup className={classes.popup}>
					{createMonthElem(reservationPeriod.pickup)}
					<Divider className={classes.divider} modif='dark' />
					{createMonthElem(reservationPeriod.pickup, true)}
				</Popup> */}

			</div>
		</TranslateHandler>
	)
})

export default Period