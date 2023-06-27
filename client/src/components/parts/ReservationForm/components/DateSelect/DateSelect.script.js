const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const fillDateList = function(date) {
	let start = new Date(date.getFullYear(), date.getMonth())
	let end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
	let numberOfDays = end.getDate() - start.getDate() + 1
	let startDay = start.getDay() ? start.getDay() : 7
	let startIndex = startDay - 2
	let dateList = new Array(7).fill(null)
	for (let i = 1; i <= numberOfDays; i++) {
		dateList[i + startIndex] = i
	}
	return dateList
}

const dateScript = {
	initiated: false,
	init(parentScript) {
		if (this.initiated) return;
		this.PICKUP = parentScript.PICKUP
		this.RETURN = parentScript.RETURN
		this.DATE = parentScript.DATE
		this.TIME = parentScript.TIME
		this.PICKUP_DATE = parentScript.PICKUP_DATE
		this.PICKUP_TIME = parentScript.PICKUP_TIME
		this.RETURN_DATE = parentScript.RETURN_DATE
		this.RETURN_TIME = parentScript.RETURN_TIME
		this.today = parentScript.today
		this.getStringifiedSystemDate = parentScript.getStringifiedSystemDate
		this.initiated = true
	},

	getCalendar(date) {
		if (typeof date === 'number') date = new Date(date)
		let monthIndex = date.getMonth()
		return {
			monthName: monthNames[monthIndex] ? monthNames[monthIndex] : monthNames[monthIndex - 12],
			dateList: fillDateList(date)
		}
	},

	getDays(numberOfLetters) {
		return dayNames.map(item => item.substring(0, numberOfLetters))
	},

	getMonthSelectData(date) {
		let selected = monthNames[date.getMonth()]
		let months = [...monthNames]
		let cut = months.splice(0, this.today.month)
		let list = months.concat(cut)
		return {selected, list}
	},

	getMonthIndex(value) {
		if (!value) return this.today.month
		let monthIndex = monthNames.indexOf(value)
		if (monthIndex < this.today.month) monthIndex += 12
		return monthIndex
	},

	getDateElemPropsData(classes, period, dataType, itemValue, currentMonthDate) {
		let className = classes.dateItem
		if (!itemValue) return [`${className} ${classes.disabled}`, '']

		let itemDate = new Date(currentMonthDate.getTime())
		itemDate.setDate(itemValue)
		let itemSystemDateString = this.getStringifiedSystemDate(itemDate)

		let comparingPeriod = dataType === this.RETURN_DATE
			? new Date(period.pickup.getFullYear(), period.pickup.getMonth(), period.pickup.getDate())
			: new Date(this.today.year, this.today.month, this.today.date)
		if (itemDate.getTime() < comparingPeriod.getTime())
			className += ' ' + classes.disabled

		let periodPartType = this.PICKUP
		let otherPeriodPartType = this.RETURN
		if (dataType.match(new RegExp(this.RETURN))) [periodPartType, otherPeriodPartType] = [otherPeriodPartType, periodPartType]

		if (itemSystemDateString === this.getStringifiedSystemDate(period[periodPartType]))
			className += ' ' + classes.active
		if (itemSystemDateString === this.getStringifiedSystemDate(period[otherPeriodPartType]))
			className += ' ' + classes.otherPeriodActive

		return [className, itemSystemDateString]
	}
}

export default dateScript
