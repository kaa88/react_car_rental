const timeScript = {
	initiated: false,
	init(parentTodayObj) {
		if (this.initiated) return;
		if (parentTodayObj) this.today = parentTodayObj
		else {
			const today = new Date()
			const closestAvailableTime = 1
			this.today = {
				hours: today.getHours() + closestAvailableTime,
				minutes: today.getMinutes()
			}
		}
		this.initiated = true
	},
	getTimeList() {
		const hoursPerDay = 24
		const timeStep = 0.5 // 1 = 1h, 0.5 = 30min
		let times = new Array(hoursPerDay / timeStep).fill(timeStep)
		times[0] = 0
		times = times.reduce((result, value, i) => [...result, value * i], [])
		let timesAsDate = times.map(item => {
			let hour = Math.floor(item)
			let minute = 0
			if (item - hour) minute = 60 * timeStep
			return new Date(0, 0, 0, hour, minute)
		})
		return timesAsDate
	}
}

export default timeScript