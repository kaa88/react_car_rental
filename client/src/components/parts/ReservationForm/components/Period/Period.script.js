import dateScript from './date.script'
import timeScript from './time.script'

const systemDateFormat = 'YYYY-MM-DD'
const dateFormat = 'DD.MM.YYYY'
const timeFormat = 'hh:mm'
const symbols = {
	year:'Y',
	month:'M',
	date:'D',
	hour:'h',
	minute:'m',
	fill:'0',
}
const matchFilter = /Y+|M+|D+|h+|m+|[\s.:_\-/T]/g;
// const dateSymbolsRegexp = /D+|M+|Y+/g;
// const timeSymbolsRegexp = /h+|m+/g;
// const dividerSymbolsRegexp = /[\s.:_\-/]/g;

function normalizeStringLength(source, result) {
	if (source.length === result.length) return result
	if (source.length < result.length) return result.slice(-source.length)
	if (source.length > result.length) {
		let add = new Array(source.length - result.length).fill(symbols.fill).join('')
		return add + result
	}
}

const convertToString = function(date, formatParts) {
	if (typeof date === 'number') date = new Date(date)
	let newParts = formatParts.map((item) => {
		let datePart;
		if (item.match(symbols.year)) datePart = date.getFullYear()
		else if (item.match(symbols.month)) datePart = date.getMonth() + 1
		else if (item.match(symbols.date)) datePart = date.getDate()
		else if (item.match(symbols.hour)) datePart = date.getHours()
		else if (item.match(symbols.minute)) datePart = date.getMinutes()
		else datePart = item
		datePart = datePart.toString()
		datePart = normalizeStringLength(item, datePart)
		return datePart
	})
	return newParts.join('')
}

const convertToDate = function(dateString) {
	return new Date(dateString)
}



const Period = {
	init({setReservationPeriod}) {

	},

	getStringifiedDate(date) {
		let dateFormatParts = dateFormat.match(matchFilter)
		return convertToString(date, dateFormatParts)
	},
	getStringifiedSystemDate(date) {
		let systemDateFormatParts = systemDateFormat.match(matchFilter)
		return convertToString(date, systemDateFormatParts)
	},
	getStringifiedTime(date) {
		let timeFormatParts = timeFormat.match(matchFilter)
		return convertToString(date, timeFormatParts)
	},
	
	getInputValues(period) {
		return {
			pickupDate: this.getStringifiedDate(period.pickup),
			pickupTime: this.getStringifiedTime(period.pickup),
			returnDate: this.getStringifiedDate(period.return),
			returnTime: this.getStringifiedTime(period.return),
		}
	},
	getCalendar: dateScript.getCalendar,
	getDays: dateScript.getDays,
	getMonthSelectData: dateScript.getMonthSelectData,
	getMonthIndex: dateScript.getMonthIndex,
}

export default Period