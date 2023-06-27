import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePopup } from '../../../../../store/reducers/formPopupReducer';
import script from './Period.script';
import classes from './Period.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import InputText from '../../../../ui/InputText/InputText';
import DateSelect from '../DateSelect/DateSelect';
import TimeSelect from '../TimeSelect/TimeSelect';

const Period = memo(function Period({className = '', ...props}) {
	/* TODO:
		- translate
	*/
	script.init()
	const dispatch = useDispatch()

	let [reservationPeriod, setReservationPeriod] = useState(script.getDefaultReservationPeriod())

	const toggleActiveDataType = function(e) {
		e.stopPropagation()
		let active = e.currentTarget === window ? '' : e.target.dataset.name
		dispatch(setActivePopup(active))
		setActiveInput(active)
	}
	useEffect(() => {
		window.addEventListener('click', toggleActiveDataType)
		return () => window.removeEventListener('click', toggleActiveDataType)
	}, [])

	// INPUTS
	const inputs = {}
	inputs[script.PICKUP_DATE] = {
		className: classes.dateInput,
		value: script.getStringifiedDate(reservationPeriod.pickup),
	}
	inputs[script.PICKUP_TIME] = {
		className: classes.timeInput,
		value: script.getStringifiedTime(reservationPeriod.pickup),
	}
	inputs[script.RETURN_DATE] = {
		className: classes.dateInput,
		value: script.getStringifiedDate(reservationPeriod.return),
	}
	inputs[script.RETURN_TIME] = {
		className: classes.timeInput,
		value: script.getStringifiedTime(reservationPeriod.return),
	}
	let [activeInput, setActiveInput] = useState('')
	const inputQueue = [script.PICKUP_DATE, script.PICKUP_TIME, script.RETURN_DATE, script.RETURN_TIME]

	const goToNextInput = function(inputName){
		let nextInput = inputQueue[inputQueue.indexOf(inputName) + 1] || ''
		dispatch(setActivePopup(nextInput))
		setActiveInput(nextInput)
	}
	const handleInputClick = function(e){
		toggleActiveDataType(e)
	}
	const handleInputChange = function(){}
	const createInputElem = (name) => { return (
		<div
			className={`${inputs[name].className} ${name === activeInput ? classes.active : ''}`}
			data-name={name}
			value={inputs[name].value}
			onClick={handleInputClick}
			onChange={handleInputChange}
		>{inputs[name].value}</div>
	)}
	// end INPUTS

	// POPUPS
	const handleSelect = function(selectedItemValue, dataType){
		let newPeriod = script.getNewReservationPeriod(selectedItemValue, dataType, reservationPeriod)
		setReservationPeriod(newPeriod)
		goToNextInput(dataType)
	}
	// end POPUPS

	// console.log('render Period');
	return (
		<TranslateHandler>
			<div className={`${classes.period} ${className}`} {...props}>

				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Pick up</p>
					{createInputElem(script.PICKUP_DATE)}
					{createInputElem(script.PICKUP_TIME)}
				</div>

				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Return</p>
					{createInputElem(script.RETURN_DATE)}
					{createInputElem(script.RETURN_TIME)}
				</div>

				<DateSelect onSelect={handleSelect} dataType={script.PICKUP_DATE} period={reservationPeriod} />
				<TimeSelect onSelect={handleSelect} dataType={script.PICKUP_TIME} period={reservationPeriod.pickup} />
				<DateSelect onSelect={handleSelect} dataType={script.RETURN_DATE} period={reservationPeriod} />
				<TimeSelect onSelect={handleSelect} dataType={script.RETURN_TIME} period={reservationPeriod.return} />

			</div>
		</TranslateHandler>
	)
})

export default Period