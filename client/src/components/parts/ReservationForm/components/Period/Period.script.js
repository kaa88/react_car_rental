import dateScript from './date.script'
import timeScript from './time.script'

const Period = {
	init() {

	},
	getCalendar: dateScript.getCalendar,
	getDays: dateScript.getDays,
	getMonthSelectData: dateScript.getMonthSelectData,
	getMonthIndex: dateScript.getMonthIndex,
}

export default Period