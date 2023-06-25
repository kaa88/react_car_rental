import { memo, useEffect, useMemo, useRef, useState } from 'react';
import classes from './TimeSelect.module.scss';
import script from './TimeSelect.script';
import parentScript from '../Period/Period.script';
import TranslateHandler from '../../../../TranslateHandler';
import { useCustomElement } from '../../../../../hooks/useCustomElement';
import Popup from '../../../../ui/Popup/Popup';
import Divider from '../../../../ui/Divider/Divider';

const TimeSelect = memo(function TimeSelect({
	className = '',
	dates,
	onTimeSelect = function(){},
	...props
}) {
	script.init(parentScript.today)
	const today = script.today
	const getTimeString = parentScript.getStringifiedTime

	// let [selectorCurrentMonth, setSelectorCurrentMonth] = useState(new Date(today.year, today.month))

	// const monthSelectData = useMemo(() => script.getMonthSelectData(selectorCurrentMonth), [selectorCurrentMonth])

	// const handleMonthSelect = function(value){
	// 	setSelectorCurrentMonth(new Date(today.year, script.getMonthIndex(value)))
	// }
	const handleTimeSelect = function(e){
		// console.log(e.target.textContent);
		onTimeSelect(e.target.textContent)
	}

	const timeList = useMemo(() => script.getTimeList(), [])
	// console.log(dates.pickup);

	const activeTimeElem = useRef()
	const inactiveTimeElem = useRef()

	const createTimeElem = (times) =>
		<div className={classes.wrapper}>
			<div className={classes.list}>
				{times.map((item, index) => {
					let isActive = item.getTime() === new Date(0, 0, 0, dates.pickup.getHours(), dates.pickup.getMinutes()).getTime() ? true : false
					let className = classes.item
					if (item.getTime() < new Date(0, 0, 0, today.hours).getTime())
						className += ' ' + classes.disabled
					if (isActive) className += ' ' + classes.active
					return (
						<div className={className} onClick={handleTimeSelect} ref={isActive ? activeTimeElem : inactiveTimeElem} key={index}>
							{getTimeString(item)}
						</div>
					)
				})}
			</div>
		</div>;

	useEffect(() => {
		activeTimeElem.current.scrollIntoView()
	}, [])

	const popupName = 'timePopup'
	// console.log('render TimeSelect');
	return (
		<TranslateHandler>
			<Popup className={classes.popup} name={popupName}>
				{createTimeElem(timeList)}
				<Divider className={classes.divider} modif='dark' />
			</Popup>
		</TranslateHandler>
	)
})

export default TimeSelect