import { setHeaderCompact } from "../../../store/reducers/headerReducer"

const MetricsHandler = {
	defaultMetrics: {
		headerHeight: 0,
		headerPosition: 0,
		headerOffset: 0,
		windowHeight: 0
	},
	initialized: false,
	init({headerScript, headerEl, classes, breakpointStore, dispatch}) {
		this.metrics = this.defaultMetrics
		headerHeight.init(this, headerEl)
		if (headerScript.params.hidingHeader) hidingHeader.init(this, headerScript.params, breakpointStore.tablet)
		if (headerScript.params.compactMode) compactMode.init(headerScript.params, classes, dispatch)
		this.initialized = true
	},
	destroy() {
		this.setMetrics(this.defaultMetrics)
		this.initialized = false
	},
	getMetrics() {
		return this.metrics
	},
	setMetrics(newMetrics) {
		Object.entries(newMetrics).forEach(([key, value]) => {
			value = Math.round(value * 10) / 10
			if (value !== this.metrics[key]) {
				this.metrics[key] = value
				cssVariables.set(key, value)
			}
		})
	},
	calcHeaderHeight() {
		if (!headerHeight.initialized) return;
		headerHeight.calcHeight()
	},
	resetHeaderPosition(instant) {
		if (!hidingHeader.initialized) return;
		hidingHeader.resetPosition(instant)
	},
	resetCompactMode() {
		if (!compactMode.initialized) return;
		compactMode.resetCompactMode()
	}
}

const cssVariables = {
	vars: {
		headerHeight: '--header-height',
		headerPosition: '--header-position',
		headerOffset: '--header-offset',
		windowHeight: '--window-height',
	},
	set(key, value) {
		document.body.style.setProperty(this.vars[key], value + 'px')
	}
}

const headerHeight = {
	initialized: false,
	init(metricsHandler, headerEl) {
		this.headerEl = headerEl
		this.setMetrics = metricsHandler.setMetrics.bind(metricsHandler)
		window.addEventListener('resize', this.calcHeight.bind(this))
		this.calcHeight()
		this.initialized = true
	},
	calcHeight() {
		const heights = {
			headerHeight: this.headerEl.offsetHeight,
			headerOffset: 0,
			windowHeight: window.innerHeight,
		}
		this.setMetrics(heights)
	},
}

const hidingHeader = {
	initialized: false,
	init(metricsHandler, headerParams, mobileBreakpoint) {
		this.getMetrics = metricsHandler.getMetrics.bind(metricsHandler)
		this.setMetrics = metricsHandler.setMetrics.bind(metricsHandler)
		this.mobileBreakpoint = mobileBreakpoint
		this.timeout = headerParams.transitionTimeout
		this.hiddenPositionOffset = headerParams.hiddenPositionOffset
		this.viewMobile = 'mobile'
		this.viewDesktop = 'desktop'
		this.viewAny = 'any'
		this.hidingHeaderView = headerParams.hidingHeaderView
		if (this.hidingHeaderView !== this.viewMobile && this.hidingHeaderView !== this.viewDesktop)
			this.hidingHeaderView = this.viewAny
		this.headerPositionFixed = headerParams.headerPositionFixed

		window.addEventListener('scroll', this.moveHeader.bind(this))
		this.firstMoveScroll = true
		this.initialized = true
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
		const metrics = this.getMetrics()
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
		let headerPosition = this.getMetrics().headerPosition
		let headerOffset = this.getMetrics().headerOffset
		if (headerPosition === headerOffset) return;
		if (instant) {
			headerPosition = headerOffset
			this.setMetrics({headerPosition})
			return
		}
		let
			timeoutMultiplier = 0.5,
			timeInterval = 10,
			startTime = Date.now(),
			startValue = headerPosition,
			newValue,
			moveStep = (headerOffset - headerPosition) / (this.timeout * timeoutMultiplier) / timeInterval * 100;

		let timerid = setInterval(function(){
			newValue = startValue + (Date.now() - startTime) * moveStep / timeInterval;
			if (newValue >= headerOffset) headerPosition = headerOffset
			else headerPosition = newValue
			this.setMetrics({headerPosition})
		}.bind(this), timeInterval)

		setTimeout(function(){
			clearInterval(timerid)
			headerPosition = headerOffset
			this.setMetrics({headerPosition})
		}.bind(this), this.timeout * timeoutMultiplier)
	}
}

const compactMode = {
	initialized: false,
	init(headerParams, classes, dispatch) {
		this.compactClass = classes.header_compact
		this.firstCompactScroll = true
		this.isCompact = this.isCompactPrev = false
		this.compactModeThreshold = headerParams.compactModeThreshold
		this.resetMode = headerParams.resetCompactMode
		this.dispatch = dispatch

		window.addEventListener('scroll', this.setCompactMode.bind(this))
		this.initialized = true
	},
	setCompactMode() {
		if (this.firstCompactScroll) return this.firstCompactScroll = false
		this.isCompact = window.scrollY > this.compactModeThreshold ? true : false;
		if (this.isCompact !== this.isCompactPrev) {
			if (this.isCompact) this.dispatch(setHeaderCompact(true))
			else this.dispatch(setHeaderCompact(false))
			this.isCompactPrev = this.isCompact
		}
	},
	resetCompactMode() {
		if (!this.resetMode) return;
		this.dispatch(setHeaderCompact(false))
		this.isCompactPrev = this.isCompact = false
	}
}

export default MetricsHandler
