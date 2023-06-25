import { memo, useEffect, useMemo, useState } from 'react';
import classes from './DateSelect.module.scss';
import script from './DateSelect.script';
import parentScript from '../Period/Period.script';
import TranslateHandler from '../../../../TranslateHandler';
import { useCustomElement } from '../../../../../hooks/useCustomElement';
import Popup from '../../../../ui/Popup/Popup';
import Divider from '../../../../ui/Divider/Divider';
import Select from '../../../../ui/Select/Select';

const DateSelect = memo(function DateSelect({
	className = '',
	dates,
	onDateSelect = function(){},
	...props
}) {
	script.init(parentScript.today)
	const today = script.today
	const getDateString = parentScript.getStringifiedSystemDate

	let [selectorCurrentMonth, setSelectorCurrentMonth] = useState(new Date(today.year, today.month))

	const monthSelectData = useMemo(() => script.getMonthSelectData(selectorCurrentMonth), [selectorCurrentMonth])

	const handleMonthSelect = function(value){
		setSelectorCurrentMonth(new Date(today.year, script.getMonthIndex(value)))
	}
	const handleDateSelect = function(e){
		// console.log(e.target.dataset.date);
		onDateSelect(new Date(e.target.dataset.date))
	}

	const createMonthElem = (selectorDate, isNextMonth) => {
		let date = new Date(selectorDate.getTime())
		if (isNextMonth) date.setMonth(date.getMonth() + 1)
		const calendar = script.getCalendar(date)
		const daysLettersCount = 2
		const days = script.getDays(daysLettersCount)
		return (
			<div className={classes.month}>
				{!isNextMonth
					? <Select modif='reservation' data={monthSelectData} onSelect={handleMonthSelect} />
					: <div className={classes.title}>{`?_${calendar.monthName}`}</div>
				}
				<div className={classes.days}>
					{days.map((day, i) =>
						<div key={i}>{`?_${day}`}</div>
					)}
				</div>
				<div className={classes.dates}>
					{calendar.dateList.map((item, index) => {
						let className = classes.dateItem
						if (!item) {
							className += ' ' + classes.disabled
							return <div className={className} key={index}></div>
						} else {
							let itemDate = new Date(date.getTime())
							itemDate.setDate(item)
							let systemDateString = getDateString(itemDate)
							if (systemDateString === getDateString(dates.pickup))
								className += ' ' + classes.active
							if (systemDateString === getDateString(dates.return))
								className += ' ' + classes.activeReturn
							if (itemDate.getTime() < new Date(today.year, today.month, today.date).getTime())
								className += ' ' + classes.disabled
							return (
								<div className={className} data-date={systemDateString} onClick={handleDateSelect} key={index}>
									{item}
								</div>
							)
						}
					})}
				</div>
			</div>
		)
	}

	const popupName = 'datePopup'
	// console.log('render DateSelect');
	return (
		<TranslateHandler>
			<Popup className={classes.popup} name={popupName}>
				{createMonthElem(selectorCurrentMonth)}
				<Divider className={classes.divider} modif='dark' />
				{createMonthElem(selectorCurrentMonth, true)}
			</Popup>
		</TranslateHandler>
	)
})

export default DateSelect