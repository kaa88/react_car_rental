const DATE_PARSER_FORMAT = 'YYYY-MM-DD' // YYYY-MM-DDThh:mm:ss.sssZ
const DATE_APP_FORMAT = 'DD.MM.YYYY'
const TIME_APP_FORMAT = 'hh:mm'
const SYMBOLS = {
	YEAR:'Y',
	MONTH:'M',
	DATE:'D',
	HOUR:'h',
	MINUTE:'m',
	FILL:'0',
	DATE_TIME_DIVIDER: 'T'
}
const MATCH_FILTER = /Y+|M+|D+|h+|m+|[\s.:_\-/T]/g;

function normalizeStringLength(source, result) {
	if (source.length === result.length) return result
	if (source.length < result.length) return result.slice(-source.length)
	if (source.length > result.length) {
		let add = new Array(source.length - result.length).fill(SYMBOLS.FILL).join('')
		return add + result
	}
}

const convertToString = function(date, formatParts) {
	if (typeof date === 'number') date = new Date(date)
	let newParts = formatParts.map((item) => {
		let datePart;
		if (item.match(SYMBOLS.YEAR)) datePart = date.getFullYear()
		else if (item.match(SYMBOLS.MONTH)) datePart = date.getMonth() + 1
		else if (item.match(SYMBOLS.DATE)) datePart = date.getDate()
		else if (item.match(SYMBOLS.HOUR)) datePart = date.getHours()
		else if (item.match(SYMBOLS.MINUTE)) datePart = date.getMinutes()
		else datePart = item
		datePart = datePart.toString()
		datePart = normalizeStringLength(item, datePart)
		return datePart
	})
	return newParts.join('')
}

// const convertToDate = function(dateString) {
// 	return new Date(dateString)
// }

const checkReturnDate = function(date, period){
	if (!period.return || period.return.getTime() < date.getTime()) return ''
	else return period.return
}

const getClosestAvailableTime = function(timeIntervalStep) {
	const closestAvailableReservationTime = 60 // minutes
	const minutesPerHour = 60

	let today = new Date()
	let extraMinutes = today.getMinutes() + closestAvailableReservationTime
	let nextClosestTimeInterval = (Math.floor(extraMinutes / minutesPerHour / timeIntervalStep) + 1) * timeIntervalStep * minutesPerHour

	today.setMinutes(nextClosestTimeInterval)
	return today
}


const Period = {
	initiated: false,
	init() {
		if (this.initiated) return;
		this.timeIntervalStep = 0.5 // 1 = 1h, 0.5 = 30min
		const today = getClosestAvailableTime(this.timeIntervalStep)
		this.today = {
			year: today.getFullYear(),
			month: today.getMonth(),
			date: today.getDate(),
			hours: today.getHours(),
			minutes: today.getMinutes()
		}

		// action types
		this.PICKUP = 'pickup'
		this.RETURN = 'return'
		// data types
		this.DATE = 'date'
		this.TIME = 'time'
		this.PICKUP_DATE = this.PICKUP + '_' + this.DATE
		this.PICKUP_TIME = this.PICKUP + '_' + this.TIME
		this.RETURN_DATE = this.RETURN + '_' + this.DATE
		this.RETURN_TIME = this.RETURN + '_' + this.TIME

		this.initiated = true
	},
	getDefaultReservationPeriod() {
		const defaultReturnPeriodDays = 1
		let period = {}
		period[this.PICKUP] = new Date(this.today.year, this.today.month, this.today.date, this.today.hours, this.today.minutes)
		period[this.RETURN] = new Date(this.today.year, this.today.month, this.today.date + defaultReturnPeriodDays, this.today.hours, this.today.minutes)
		return period
	},
	getStringifiedSystemDate(date) {
		if (!date) return ''
		let systemDateFormatParts = DATE_PARSER_FORMAT.match(MATCH_FILTER)
		return convertToString(date, systemDateFormatParts)
	},
	getStringifiedDate(date) {
		if (!date) return ''
		let dateFormatParts = DATE_APP_FORMAT.match(MATCH_FILTER)
		return convertToString(date, dateFormatParts)
	},
	getStringifiedTime(date) {
		if (!date) return ''
		let timeFormatParts = TIME_APP_FORMAT.match(MATCH_FILTER)
		return convertToString(date, timeFormatParts)
	},
	addTimeToDateObject(newDate, oldDate){
		let hours = 0
		let minutes = 0
		if (oldDate) {
			hours = oldDate.getHours()
			minutes = oldDate.getMinutes()
		}
		newDate.setHours(hours)
		newDate.setMinutes(minutes)
	
		let todayTime = new Date(this.today.year, this.today.month, this.today.date, this.today.hours, this.today.minutes)
		if (todayTime.getTime() > newDate.getTime()) {
			newDate.setHours(this.today.hours)
			newDate.setMinutes(this.today.minutes)
		}
		return newDate
	},
	addTimeToDateString(date, time) {
		if (!date) return ''
		let newDate = date
		if (date instanceof Date) newDate = this.getStringifiedSystemDate(date)
		return newDate + SYMBOLS.DATE_TIME_DIVIDER + time
	},
	getNewReservationPeriod(value, dataType, {...period}) {
		if (!value || !dataType) return period

		let actionType = this.PICKUP
		if (dataType.match(new RegExp(this.RETURN))) actionType = this.RETURN

		if (dataType.match(new RegExp(this.DATE))) { // date or time
			let date = new Date(value)
			date = this.addTimeToDateObject(date, period[actionType])
			period[actionType] = date
			if (actionType === this.PICKUP) {
				period[this.RETURN] = checkReturnDate(date, period)
			}
			if (actionType === this.RETURN) {
				period[this.RETURN].setHours(period.pickup.getHours())
				period[this.RETURN].setMinutes(period.pickup.getMinutes())
			}
		}
		else {
			let systemFormatDate = this.addTimeToDateString(period[actionType], value)
			period[actionType] = systemFormatDate ? new Date(systemFormatDate) : ''
		}
		return period
	}
}

export default Period