

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const now = new Date()
const currentMonth = now.getMonth()

const getDays = function(numberOfLetters) {
	return dayNames.map(item => item.substring(0, numberOfLetters))
}

// const fillDateList = (date) => {
// 	let start = new Date(now.getFullYear(), monthIndex)
// 	let end = new Date(now.getFullYear(), monthIndex + 1, 0)
// 	let numberOfDays = end.getDate() - start.getDate() + 1
// 	let startDay = start.getDay() ? start.getDay() : 7
// 	let startIndex = startDay - 2
// 	let dateList = new Array(7).fill(null)
// 	for (let i = 1; i <= numberOfDays; i++) {
// 		dateList[i + startIndex] = i
// 	}
// 	return dateList
// }
const fillDateList = (date) => {
	let start = new Date(date.getFullYear(), date.getMonth())
	let end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
	let numberOfDays = end.getDate() - start.getDate() + 1
	let startDay = start.getDay() ? start.getDay() : 7
	let startIndex = startDay - 2
	let dateList = new Array(7).fill(null)
	for (let i = 1; i <= numberOfDays; i++) {
		dateList[i + startIndex] = i
	}
	// console.log(dateList);
	return dateList
}

const getCalendar = function(date) {
	if (typeof date === 'number') date = new Date(date)
	let monthIndex = date.getMonth()
	return {
		monthName: monthNames[monthIndex] ? monthNames[monthIndex] : monthNames[monthIndex - 12],
		// dateObj: new Date(now.getFullYear(), monthIndex),
		dateList: fillDateList(date)
	}
}

const getMonthSelectData = function(monthIndex) {
	let selected = monthNames[monthIndex]
	let months = [...monthNames]
	let cut = months.splice(0, now.getMonth())
	let list = months.concat(cut)
	return {selected, list}
}

const getMonthIndex = function(value) {
	if (!value) return currentMonth
	return monthNames.indexOf(value)
}

const dateScript = {
	getCalendar,
	getDays,
	getMonthSelectData,
	getMonthIndex,
}
export default dateScript