import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReservation } from '../../../../../store/slices/reservationFormSlice';
import script from './Period.script';
import classes from './Period.module.scss';
import TranslateHandler from '../../../../TranslateHandler';
import DateSelect from '../DateSelect/DateSelect';
import TimeSelect from '../TimeSelect/TimeSelect';


const Period = memo(function Period({
	modif = 'light',
	className = '',
	activeDataType = '',
	setActiveDataType = function(event, value){},
	...props
}) {
	script.init()
	const dispatch = useDispatch()
	const formData = useSelector(state => state.reservationForm)

	let reservationPeriod = {
		pickup: formData.pickup ? new Date(formData.pickup) : '',
		return: formData.return ? new Date(formData.return) : ''
	}
	function setReservationPeriod(value) {
		dispatch(setReservation({
			pickup: value.pickup,
			return: value.return
		}))
	}
	if (!formData.pickup) {
		reservationPeriod = script.getDefaultReservationPeriod()
		setReservationPeriod(reservationPeriod)
	}

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
	const inputQueue = [script.PICKUP_DATE, script.PICKUP_TIME, script.RETURN_DATE, script.RETURN_TIME]

	const goToNextInput = function(inputName){
		let nextInput = inputQueue[inputQueue.indexOf(inputName) + 1] || ''
		setActiveDataType(null, nextInput)
	}
	const handleInputClick = function(e){
		let newActiveType = activeDataType === e.target.dataset.name ? '' : e.target.dataset.name
		setActiveDataType(e, newActiveType)
	}
	const handleInputChange = function(){}
	const createInputElem = (name) => { return (
		<div
			className={`${inputs[name].className} ${name === activeDataType ? classes.active : ''}`}
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

	return (
		<TranslateHandler>
			<div className={`${className} ${classes[modif]}`} {...props}>

				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Pick up</p>
					{createInputElem(script.PICKUP_DATE)}
					{createInputElem(script.PICKUP_TIME)}
					<DateSelect onSelect={handleSelect} dataType={script.PICKUP_DATE} period={reservationPeriod} />
					<TimeSelect onSelect={handleSelect} dataType={script.PICKUP_TIME} period={reservationPeriod.pickup} />
				</div>

				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Return</p>
					{createInputElem(script.RETURN_DATE)}
					{createInputElem(script.RETURN_TIME)}
					<DateSelect onSelect={handleSelect} dataType={script.RETURN_DATE} period={reservationPeriod} />
					<TimeSelect onSelect={handleSelect} dataType={script.RETURN_TIME} period={reservationPeriod.return} />
				</div>

			</div>
		</TranslateHandler>
	)
})

export default Period