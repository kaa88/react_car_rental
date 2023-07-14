import { jsMediaQueries } from '../../../utilities/jsMediaQueries'
import { setHeaderCompact } from "../../../store/reducers/headerReducer"

const MetricsHandler = {
	defaultMetrics: {
		headerHeight: null,
		headerPosition: null,
		headerOffset: null,
		windowHeight: null
	},
	initialized: false,
	init({headerScript, headerEl, breakpoints, dispatch}) {
		if (this.initialized) return;
		this.metrics = {...this.defaultMetrics}
		this.breakpoints = breakpoints
		
		headerHeight.init(this, headerEl)
		if (headerScript.params.hidingHeader) hidingHeader.init(this, headerScript.params, breakpoints.tablet)
		if (headerScript.params.compactMode) compactMode.init(headerScript.params, dispatch)

		this.setupJsMediaQueries(true)

		this.initialized = true
	},
	destroy() {
		if (!this.initialized) return;
		this.setMetrics(this.defaultMetrics)
		headerHeight.destroy()
		hidingHeader.destroy()
		compactMode.destroy()
		this.setupJsMediaQueries()
		this.initialized = false
	},
	setupJsMediaQueries(init) {
		let task = init ? 'registerActions' : 'deleteActions'
		let jsmqActions = [this.resetHeaderPosition, this.resetCompactMode]
		jsMediaQueries[task](this.breakpoints.tablet, jsmqActions)
		jsMediaQueries[task](this.breakpoints.mobile, jsmqActions)
	},
	getMetrics() {
		return this.metrics
	},
	setMetrics(newMetrics) {
		Object.entries(newMetrics).forEach(([key, value]) => {
			if (value !== null) value = Math.round(value * 10) / 10
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
	resetHeaderPosition() {
		if (!hidingHeader.initialized) return;
		hidingHeader.resetPosition(true)
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
		value = value === null ? '' : value + 'px'
		document.body.style.setProperty(this.vars[key], value)
	}
}

const headerHeight = {
	initialized: false,
	init(metricsHandler, headerEl) {
		if (this.initialized) return;
		this.headerEl = headerEl
		this.setMetrics = metricsHandler.setMetrics.bind(metricsHandler)

		this.calcHeightBinded = this.calcHeight.bind(this)
		window.addEventListener('resize', this.calcHeightBinded)
		this.calcHeight()

		this.initialized = true
	},
	destroy() {
		if (!this.initialized) return;
		window.removeEventListener('resize', this.calcHeightBinded)
		this.initialized = false
	},
	calcHeight() {
		const metrics = {
			headerHeight: this.headerEl.offsetHeight,
			headerOffset: 0,
			windowHeight: window.innerHeight,
		}
		this.setMetrics(metrics)
	},
}

const hidingHeader = {
	initialized: false,
	init(metricsHandler, headerParams, mobileBreakpoint) {
		if (this.initialized) return;
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

		this.moveHeaderBinded = this.moveHeader.bind(this)
		window.addEventListener('scroll', this.moveHeaderBinded)
		this.firstMoveScroll = true
		this.initialized = true
	},
	destroy() {
		if (!this.initialized) return;
		window.removeEventListener('scroll', this.moveHeaderBinded)
		this.initialized = false
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
		if (!this.initialized) return;
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
	init(headerParams, dispatch) {
		if (this.initialized) return;
		this.firstCompactScroll = true
		this.isCompact = this.isCompactPrev = false
		this.compactModeThreshold = headerParams.compactModeThreshold
		this.resetMode = headerParams.resetCompactMode
		this.dispatch = dispatch

		this.setCompactModeBinded = this.setCompactMode.bind(this)
		window.addEventListener('scroll', this.setCompactModeBinded)
		this.initialized = true
	},
	destroy() {
		if (!this.initialized) return;
		window.removeEventListener('scroll', this.setCompactModeBinded)
		this.initialized = false
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
		if (!this.initialized || !this.resetMode) return;
		this.dispatch(setHeaderCompact(false))
		this.isCompactPrev = this.isCompact = false
	}
}

export default MetricsHandler
