

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const now = new Date()

const getDays = function() {
	return dayNames.map(item => item.substring(0, 2))
}

const fillDateList = (monthId) => {
	let start = new Date(now.getFullYear(), monthId)
	let end = new Date(now.getFullYear(), monthId + 1, 0)
	let numberOfDays = end.getDate() - start.getDate() + 1
	let startDay = start.getDay() ? start.getDay() : 7
	let startIndex = startDay - 2
	let dateList = new Array(7).fill(null)
	for (let i = 1; i <= numberOfDays; i++) {
		dateList[i + startIndex] = i
	}
	return dateList
}

const getCalendar = function(monthId) {
	if (!monthNames[monthId]) monthId = 0
	return {
		monthName: monthNames[monthId],
		dateList: fillDateList(monthId)
	}
}

const getMonthSelectData = function(monthId) {
	let selected = monthNames[monthId]
	let months = [...monthNames]
	let cut = months.splice(0, now.getMonth())
	let list = months.concat(cut)
	return {selected, list}
}

const getMonthIndex = function(value) {
	return monthNames.indexOf(value)
}

const dateScript = {
	getCalendar,
	getDays,
	getMonthSelectData,
	getMonthIndex,
}
export default dateScript