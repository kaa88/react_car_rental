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
	init(parentTodayObj) {
		if (this.initiated) return;
		if (parentTodayObj) this.today = parentTodayObj
		else {
			const today = new Date()
			this.today = {
				year: today.getFullYear(),
				month: today.getMonth(),
				date: today.getDate(),
			}
		}
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
	}
}

export default dateScript
