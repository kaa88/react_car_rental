import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePopup } from '../../../../../store/reducers/popupReducer';
import script from './Period.script';
import classes from './Period.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import { useCustomElement } from '../../../../../hooks/useCustomElement';
import InputText from '../../../../ui/InputText/InputText';
import DateSelect from '../DateSelect/DateSelect';
import TimeSelect from '../TimeSelect/TimeSelect';

const Period = memo(function Period({className = '', ...props}) {

	const dispatch = useDispatch()
	// const popupStore = useSelector(state => state.activePopup)
	/*
		Строю календарь:
			- получаю дату
				- текущую при загрузке
				- установленную из ... стейта
			- проставляю в инпуты
		Кликаю в календаре, выбираю дату:
			- получаю дату из dataset числа
			- проставляю в инпуты

		ДОБАВИТЬ: обновление текущего времени периодически
		НАСТРОИТЬ closestAvailableTime, т.к. он расчитывается приблизительно
	*/
	script.init()
	// const today = script.today
	// console.log(script.getDefaultReservationPeriod());
	let [reservationPeriod, setReservationPeriod] = useState(script.getDefaultReservationPeriod())
	
	const handleDateSelect = function(date){
		setReservationPeriod({...reservationPeriod, pickup: date})
		dispatch(setActivePopup('timePopup'))
	}
	const handleTimeSelect = function(time){
		let systemFormatDate = script.addTimeToDate(reservationPeriod.pickup, time)
		setReservationPeriod({...reservationPeriod, pickup: new Date(systemFormatDate)})
		// dispatch(setActivePopup('timePopup'))
	}

	/*
		click pickupdate input
			open datepopup
			highlight pickupdate input
		click pickupdate input first time
			clean period.return
		click pickuptime
			open timepopup
			highlight pickupdate input
		click pickuptime input first time
			clean period.return

		choose something
			update period
			close prev popup
			open next popup
	*/
	const handleInputClick = function(e){
		let activePopup = ''
		if (e.target.name.match(/Date/)) activePopup = 'datePopup'
		if (e.target.name.match(/Time/)) activePopup = 'timePopup'
		dispatch(setActivePopup(activePopup))
		setActiveInput(e.target.name)
		// open e.target popup
		// check if first time
		// clean period.return
	}
	const handleInputChange = function(e){
	}

	useEffect(() => {
		// script.init({setReservationPeriod})
	}, [])


	const inputs = {
		pickupDate: {
			className: classes.dateInput,
			value: script.getStringifiedDate(reservationPeriod.pickup),
		},
		pickupTime: {
			className: classes.timeInput,
			value: script.getStringifiedTime(reservationPeriod.pickup),
		},
		returnDate: {
			className: classes.dateInput,
			value: script.getStringifiedDate(reservationPeriod.return),
		},
		returnTime: {
			className: classes.timeInput,
			value: script.getStringifiedTime(reservationPeriod.return),
		},
	}
	let [activeInput, setActiveInput] = useState('')
	// console.log(activeInput);

	const createInputElem = (name) => {
		return (
			<InputText
				modif='textCenter'
				className={`${inputs[name].className} ${name === activeInput ? classes.active : ''}`}
				name={name}
				value={inputs[name].value}
				onClick={handleInputClick}
				onChange={handleInputChange}
			/>
		)
	}
	// let inputValues = script.getInputValues(reservationPeriod)

	// console.log('render Period');
	return (
		<TranslateHandler>
			<div className={`${classes.period} ${className}`} {...props}>

				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Pick up</p>
					{createInputElem('pickupDate')}
					{createInputElem('pickupTime')}
				</div>

				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Return</p>
					{createInputElem('returnDate')}
					{createInputElem('returnTime')}
				</div>

				<DateSelect onDateSelect={handleDateSelect} dates={reservationPeriod} />
				<TimeSelect onTimeSelect={handleTimeSelect} dates={reservationPeriod} />

			</div>
		</TranslateHandler>
	)
})

export default Period