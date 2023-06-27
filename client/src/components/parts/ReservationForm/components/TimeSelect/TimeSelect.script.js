const timeScript = {
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
		this.timeIntervalStep = parentScript.timeIntervalStep
		this.getStringifiedTime = parentScript.getStringifiedTime
		this.initiated = true
	},
	getTimeList() {
		const hoursPerDay = 24
		const minutesPerHour = 60
		const timeStep = this.timeIntervalStep
		let times = new Array(hoursPerDay / timeStep).fill(timeStep)
		times[0] = 0
		times = times.reduce((result, value, i) => [...result, value * i], [])
		
		let timesAsDate = times.map(item => {
			let hour = Math.floor(item)
			let minute = minutesPerHour * (item - hour)
			return new Date(0, 0, 0, hour, minute)
		})
		return timesAsDate
	},
	getTimeElemPropsData(classes, period, itemValue) {
		let todayDay = new Date(this.today.year, this.today.month, this.today.date)
		let todayTime = new Date(0, 0, 0, this.today.hours, this.today.minutes)
		let isToday = false, isActive = false;
		if (period) {
			let periodDay = new Date(period.getFullYear(), period.getMonth(), period.getDate())
			let periodTime = new Date(0, 0, 0, period.getHours(), period.getMinutes())
			if (periodDay.getTime() === todayDay.getTime()) isToday = true
			if (itemValue.getTime() === periodTime.getTime()) isActive = true
		}

		let className = classes.item
		if (isToday && itemValue.getTime() < todayTime.getTime())
			className += ' ' + classes.disabled
		if (isActive) className += ' ' + classes.active

		let content = this.getStringifiedTime(itemValue)
		return [className, isActive, content]
	}
}

export default timeScript