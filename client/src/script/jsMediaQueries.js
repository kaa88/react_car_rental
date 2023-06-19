/* 
	Module checks window resizing and runs funcs on crossing the breakpoint.
	Breakpoint executes its funcs when 'width' crosses the line from both sides. Example: both resize from 800 to 700 and from 700 to 800 will execute '768' breakpoint.
	If 'width' crosses several breakpoints, all of them will be executed sequentially.

	Useful output:
	- jsMediaQueries.state
	Note: there is 1 more index than number of breakpoints (from 0px to 1st breakpoint).
	
	Init params {obj}:
	- breakpoints {obj}
	- testMode - set to 'true' to console.log the breakpoint state when it executes (default = false)
*/

export const jsMediaQueries = {
	selfName: 'jsMediaQueries',
	initiated: false,
	init(params) {
		this.params = params || {}
		this.breakpoints = {0: []}
		this.keys = this.keysReversed = []
		this.check(false, true)
		window.addEventListener('resize', this.check.bind(this))
		this.initiated = true
	},

	generateKeys() {
		let keys = Object.keys(this.breakpoints).map((key) => {
			key = Number(key)
			if (isNaN(key)) key = 0
			return key
		})
		let [...keysReversed] = keys
		keys.sort((a, b) => {return a - b})
		keysReversed.sort((a, b) => {return b - a})
		this.keys = keys
		this.keysReversed = keysReversed
	},

	registerActions(breakpoint, callbacks) {
		if (!breakpoint || !Array.isArray(callbacks))
			return console.error(`${this.selfName} could not register a new action because of missing arguments`)
	
		if (!this.breakpoints[breakpoint]) this.breakpoints[breakpoint] = []
		this.breakpoints[breakpoint] = this.breakpoints[breakpoint].concat(callbacks)

		if (this.params.testMode) {
			console.log(`[${this.selfName}] Registered new action at breakpoint "${breakpoint}". Total:`)
			console.log(this.breakpoints)
		}
		this.generateKeys()
	},

	check: function(e, init = false) {
		for (let i = 0; i < this.keys.length; i++) {
			if (window.innerWidth > this.keys[i]) this.state = this.keys[i]
			else break
		}
		if (init) this.prev_state = this.state
		else {
			if (this.state > this.prev_state) {
				this.keys.forEach((key) => {
					if (key > this.prev_state && key <= this.state) run(key, this)
				})
			}
			if (this.state < this.prev_state) {
				this.keysReversed.forEach((key) => {
					if (key <= this.prev_state && key > this.state) run(key, this)
				})
			}
			this.prev_state = this.state
		}
		function run(key, that) {
			that.breakpoints[key].forEach((item) => item())
			if (that.params.testMode) console.log(`[${that.selfName}] Executed breakpoint: ${key}`)
		}
	}
}
