const metricsHandler = {
	init(header, headerParams) {
		this.metrics = {
			headerHeight: 0,
			headerPosition: 0,
			headerOffset: 0,
			windowHeight: 0
		}

		this.mobileBreakpoint = 960 // temp

		cssVariables.init()
		headerHeight.init(this, header)
		hidingHeader.init(this, headerParams, this.mobileBreakpoint, headerParams.timeout)
		compactMode.init()
	},
	getMetrics() {
		return this.metrics
	},
	setMetrics(newMetrics) {
		let isChanged = false
		for (let key in newMetrics) {
			if (newMetrics[key] !== this.metrics[key]) {
				isChanged = true
				break
			}
		}
		if (isChanged) {
			this.metrics = Object.assign({}, this.metrics, newMetrics)
			cssVariables.set(this.metrics)
			console.log(this.metrics.headerPosition);
		}
	},
	calcHeaderHeight() {
		headerHeight.calcHeight()
	}
}

const cssVariables = {
	init(dispatch, setStyle) {
		this.vars = {
			headerHeight: '--header-height',
			headerPosition: '--header-position',
			headerOffset: '--header-offset',
			windowHeight: '--window-height',
		}
		// this.setStyle = setStyle
		// this.setState = (value) => dispatch(changeMetrics(value))
	},
	set(metrics) {
		// let newStyle = {}
		Object.entries(metrics).forEach(([key, value]) => {
			// if (value) {
				value = Math.round(value * 10) / 10
				// newStyle[this.vars[key]] = value + 'px'
				console.log(this.vars[key], value + 'px');
				document.body.style.setProperty(this.vars[key], value + 'px')
			// }
		})
		// this.setStyle(newStyle)
		// this.setState(metrics)

	}
}

const headerHeight = {
	init(metricsHandler, header) {
		this.headerEl = header
		this.setMetrics = metricsHandler.setMetrics.bind(metricsHandler)
		window.addEventListener('resize', this.calcHeight.bind(this))
		this.calcHeight()
	},
	calcHeight() {
		const heights = {
			headerHeight: this.headerEl.offsetHeight,
			headerOffset: 0,
			windowHeight: window.innerHeight,
		}
		this.setMetrics(heights)
		// return heights

		// return [this.headerHeight, this.headerPosition]
	},
}

const hidingHeader = {
	init(metricsHandler, headerParams, mobileBreakpoint, timeout) {
		this.getMetrics = metricsHandler.getMetrics.bind(metricsHandler)
		this.setMetrics = metricsHandler.setMetrics.bind(metricsHandler)
		this.mobileBreakpoint = mobileBreakpoint
		this.timeout = timeout

		// this.metrics = metricsHandler.metrics
		// this.headerHeight = metrics.headerHeight || 0
		// this.headerOffset = metrics.headerOffset || 0
		// this.headerPosition = metrics.headerPosition || 0
		this.hiddenPositionOffset = headerParams.hiddenPositionOffset || 0

		this.viewMobile = 'mobile'
		this.viewDesktop = 'desktop'
		this.viewAny = 'any'
		this.hidingHeaderView = headerParams.hidingHeaderView
		if (this.hidingHeaderView !== this.viewMobile && this.hidingHeaderView !== this.viewDesktop)
			this.hidingHeaderView = this.viewAny

		window.addEventListener('scroll', this.moveHeader.bind(this))
		this.firstMoveScroll = true
	},
	moveHeader() {
		if (this.hidingHeaderView === this.viewMobile && window.innerWidth > this.mobileBreakpoint) return;
		if (this.hidingHeaderView === this.viewDesktop && window.innerWidth <= this.mobileBreakpoint) return;

		// this 'if' prevents header's jump after page reloading in the middle of the content
		if (this.firstMoveScroll) {
			this.Y = this.YPrev = window.scrollY;
			this.diff = 0;
			return this.firstMoveScroll = false
		}
		// lazyLoad check
		if ( (window.scrollY < (this.Y + this.diff) && this.Y > this.YPrev)
			|| (window.scrollY > (this.Y + this.diff) && this.Y < this.YPrev)
		) {
			this.diff = window.scrollY - this.Y
		}
		// scroll-move
		let metrics = this.getMetrics()
		let currentPos = metrics.headerPosition
		let visiblePos = metrics.headerOffset
		let hiddenPos = visiblePos - metrics.headerHeight - this.hiddenPositionOffset
		this.YPrev = this.Y
		this.Y = window.scrollY - this.diff
		currentPos -= this.Y - this.YPrev
		if (currentPos > visiblePos) currentPos = visiblePos
		if (currentPos < hiddenPos) currentPos = hiddenPos

		this.setMetrics({headerPosition: currentPos})
	},
	resetPosition(instant) {
		// This func has 2 ways to reset position (instant or not), that's why I use JS-animation instead of css-animation
		if (this.metrics.headerPosition === this.metrics.headerOffset) return;
		if (instant) {
			this.metrics.headerPosition = this.metrics.headerOffset
			this.setMetrics({headerPosition: this.metrics.headerPosition})
			return
		}
		let
			timeoutMultiplier = 0.7,
			timeInterval = 10,
			startTime = Date.now(),
			startValue = this.metrics.headerPosition,
			newValue,
			moveStep = (this.metrics.headerOffset - this.metrics.headerPosition) / (this.timeout * timeoutMultiplier) / timeInterval * 100;

		let timerid = setInterval(function(){
			newValue = startValue + (Date.now() - startTime) * moveStep / timeInterval;
			if (newValue >= this.metrics.headerOffset) this.metrics.headerPosition = this.metrics.headerOffset
			else this.metrics.headerPosition = newValue
			this.setMetrics({headerPosition: this.metrics.headerPosition})
		}.bind(this), timeInterval)

		setTimeout(function(){
			clearInterval(timerid)
			this.metrics.headerPosition = this.metrics.headerOffset
			this.setMetrics({headerPosition: this.metrics.headerPosition})
		}.bind(this), this.timeout * timeoutMultiplier)
	}
}

const hidingHeader_old = {
	initiated: false,
	init: function(that) {
		this.root = that;
		
		// hidingHeader settings
		if (this.root.params.hidingHeader)
			window.addEventListener('scroll', this.moveHeader.bind(this));
		this.firstMoveScroll = true;

		// hidingHeaderCompactMode settings
		if (this.root.params.hidingHeaderCompactMode)
			window.addEventListener('scroll', this.setCompactMode.bind(this));
			this.firstCompactScroll = true;
			this.isCompact = this.isCompactPrev = false;

		this.initiated = true
	},
	returnHeader: function(instant) {
		// This func has 2 ways to reset position (instant or not), that's why I use JS-animation instead of css-animation
		if (!this.initiated || this.root.headerPosition == this.root.headerOffset) return;
		if (instant) {
			this.root.headerPosition = this.root.headerOffset
			this.root.setCssVar()
			return
		}
		let
			timeoutMultiplier = 0.7,
			timeInterval = 10,
			startTime = new Date().valueOf(),
			startValue = this.root.headerPosition,
			newValue,
			moveStep = (this.root.headerOffset - this.root.headerPosition) / (this.root.timeout * timeoutMultiplier) / timeInterval * 100;

		let timerid = setInterval(function(){
			newValue = startValue + (new Date().valueOf() - startTime) * moveStep / timeInterval;
			if (newValue >= this.root.headerOffset) this.root.headerPosition = this.root.headerOffset
			else this.root.headerPosition = newValue
			this.root.setCssVar()
		}.bind(this), timeInterval)

		setTimeout(function(){
			clearInterval(timerid);
			this.root.headerPosition = this.root.headerOffset
			this.root.setCssVar()
		}.bind(this), this.root.timeout * timeoutMultiplier)
	},
	moveHeader: function() {
		if (!this.initiated) return;
		if (this.root.params.hidingHeaderView == 'mobile' && window.innerWidth > this.root.away.getMobileBreakpoint()) return;
		if (this.root.params.hidingHeaderView == 'desktop' && window.innerWidth <= this.root.away.getMobileBreakpoint()) return;

		// this 'if' prevents header's jump after page reloading in the middle of the content
		if (this.firstMoveScroll) {
			this.Y = this.YPrev = window.scrollY;
			this.diff = 0;
			return this.firstMoveScroll = false
		}
		// lazyLoad check
		if ( (window.scrollY < (this.Y + this.diff) && this.Y > this.YPrev) 
			|| (window.scrollY > (this.Y + this.diff) && this.Y < this.YPrev)
		) {
			this.diff = window.scrollY - this.Y
		}
		// scroll-move
		let currentPos = this.root.headerPosition
		let visiblePos = this.root.headerOffset
		let hiddenPos = visiblePos - this.root.headerHeight - this.root.params.hiddenPositionOffset
		this.YPrev = this.Y;
		this.Y = window.scrollY - this.diff;
		currentPos -= this.Y - this.YPrev;
		if (currentPos > visiblePos) currentPos = visiblePos;
		if (currentPos < hiddenPos) currentPos = hiddenPos;
		this.root.headerPosition = currentPos;
		this.root.setCssVar()
	},
}

const compactMode = {
	init() {

	},
	setCompactMode() {
		if (!this.initiated) return;
		if (this.firstCompactScroll) return this.firstCompactScroll = false
		this.isCompact = window.window.scrollY > this.root.params.compactModeThreshold ? true : false;
		if (this.isCompact != this.isCompactPrev) {
			if (this.isCompact) this.root.header.classList.add(this.root.names.stateCompact)
			else this.root.header.classList.remove(this.root.names.stateCompact)
			this.isCompactPrev = this.isCompact
		}
	},
	removeCompactMode() {
		if (!this.initiated) return;
		this.root.header.classList.remove(this.root.names.stateCompact)
		this.isCompactPrev = this.isCompact = false
	}
}

export default metricsHandler
