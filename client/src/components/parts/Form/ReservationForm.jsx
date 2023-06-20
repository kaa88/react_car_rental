import { memo } from 'react';
import classes from './ReservationForm.module.scss';
import {Translate} from '../../../script/translate';
import { useCustomElement } from '../../../hooks/useCustomElement';
import Icon from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';
import Divider from '../../ui/Divider/Divider';
import InputText from '../../ui/InputText/InputText';
import InputCheckbox from '../../ui/Checkbox/InputCheckbox';
import Select from '../../ui/Select/Select';

const ReservationForm = memo(function ReservationForm({className, ...props}) {
	const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
	const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
	const now = new Date()

	const fillDateList = (month) => {
		let start = new Date(now.getFullYear(), month)
		let end = new Date(now.getFullYear(), month + 1, 0)
		let numberOfDays = end.getDate() - start.getDate() + 1
		let startIndex = start.getDay() - 2
		let dateList = new Array(7).fill(null)
		for (let i = 1; i <= numberOfDays; i++) {
			dateList[i + startIndex] = i
		}
		return dateList
	}
	const calendar = {
		days: dayNames.map(item => item.substring(0, 2)),
		currentMonth: {
			name: monthNames[now.getMonth()],
			dateList: fillDateList(now.getMonth()),
		},
		nextMonth: {
			name: monthNames[now.getMonth() + 1],
			dateList: fillDateList(now.getMonth() + 1),
		},
	}
	console.log(calendar);

	const createMonthElem = (days, month) =>
		<div className={classes.popupMonth}>
			{/* <div className={classes.popupTitle}>{`?_${month.name}`}</div> */}
			{/* <Select type='month' propData={monthNames} /> */}
			<div className={classes.popupDays}>
				{days.map((item, index) =>
					<div key={index}>{`?_${item}`}</div>
				)}
			</div>
			<div className={classes.popupDates}>
				{month.dateList.map((item, index) =>
					<div className={`${classes.popupDateItem} ${item ? '' : classes.disabled}`} key={index}>
						{item ? item : ''}
					</div>
				)}
			</div>
		</div>;






	const dateSelect = useCustomElement(classes.dateSelectPopup)




	return (
		<Translate>
			<form className={`${classes.form} ${className}`} action="#" {...props}>
				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Location</p>
					<InputText className={classes.input} />
				</div>
				<Divider />
				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Pick up</p>
					<InputText className={classes.input} modif='textCenter' />
					<InputText className={classes.input} modif='textCenter' />
					<div className={classes.selectPopup}>
						{createMonthElem(calendar.days, calendar.currentMonth)}
						<Divider className={classes.divider} modif='dark' />
						{createMonthElem(calendar.days, calendar.nextMonth)}
					</div>
					{/* <div className={classes.selectPopup}>{timeSelectPopup}</div> */}
				</div>
				<div className={classes.section}>
					<p className={classes.sectionTitle}>?_Return</p>
					<InputText className={classes.input} modif='textCenter' />
					<InputText className={classes.input} modif='textCenter' />
				</div>
				<Divider />
				<Button className={classes.submitBtn} type='submit'>?_Reserve</Button>
				<div className={classes.checkboxes}>
					<InputCheckbox>?_Driver's age 21+</InputCheckbox>
					<InputCheckbox>?_Return to different location</InputCheckbox>
				</div>
			</form>
		</Translate>
	)
})

export default ReservationForm