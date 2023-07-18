import { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectorCurrentMonth } from '../../../../../store/slices/reservationFormSlice';
import classes from './DateSelect.module.scss';
import script from './DateSelect.script';
import parentScript from '../Period/Period.script';
import TranslateHandler from '../../../../TranslateHandler';
import Popup from '../../../../ui/Popup/Popup';
import Divider from '../../../../ui/Divider/Divider';
import Select from '../../../../ui/Select/Select';

const DateSelect = memo(function DateSelect({
	className = '',
	dataType,
	period,
	onSelect = function(){},
	...props
}) {
	script.init(parentScript)
	const today = script.today

	let dispatch = useDispatch()
	let selectorCurrentMonth = useSelector(state => new Date(state.reservationForm.selectorCurrentMonth))
	// let [selectorCurrentMonth, setSelectorCurrentMonth] = useState(new Date(today.year, today.month))

	const monthSelectData = useMemo(() => script.getMonthSelectData(selectorCurrentMonth), [selectorCurrentMonth])

	const handleMonthSelect = function(value){
		let date = new Date(today.year, script.getMonthIndex(value))
		dispatch(setSelectorCurrentMonth(date.getTime()))
	}
	const handleDateSelect = function(e){
		onSelect(e.target.dataset.date, dataType)
	}

	const createMonthElem = (selectorDate, isNextMonth) => {
		let currentMonthDate = new Date(selectorDate.getTime())
		if (isNextMonth) currentMonthDate.setMonth(currentMonthDate.getMonth() + 1)
		const calendar = script.getCalendar(currentMonthDate)
		const daysLettersCount = 2
		const days = script.getDays(daysLettersCount)
		return (
			<div className={classes.month}>
				{!isNextMonth
					? <Select modif='reservation' data={monthSelectData} onSelect={handleMonthSelect} applyTranslator={true} />
					: <div className={classes.title}>{`?_${calendar.monthName}`}</div>
				}
				<div className={classes.days}>
					{days.map((day, i) =>
						<div key={i}>{`?_${day}`}</div>
					)}
				</div>
				<div className={`${classes.dates} ${classes[dataType]}`}>
					{calendar.dateList.map((item, index) => {
						let [className, systemDateString] = script.getDateElemPropsData(classes, period, dataType, item, currentMonthDate)
						return (
							<div className={className}
								data-date={systemDateString}
								onClick={handleDateSelect}
								key={index}
							>
								{item}
							</div>
						)
					})}
				</div>
			</div>
		)
	}

	// console.log('render DateSelect');
	return (
		<TranslateHandler>
			<Popup className={classes.popup} name={dataType} modif='noCloseButton' {...props}>
				<div className={classes.popupContent}>
					{createMonthElem(selectorCurrentMonth)}
					<Divider className={classes.divider} modif='dark' />
					{createMonthElem(selectorCurrentMonth, true)}
				</div>
			</Popup>
		</TranslateHandler>
	)
})

export default DateSelect