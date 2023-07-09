import { jsMediaQueries } from '../../../script/jsMediaQueries'
import { scriptManager } from '../../../script/scriptManager';
import utilities from '../../../script/utilities';
import { setHeaderInitialized } from '../../../store/reducers/headerReducer';
import Metrics from './HeaderMetrics';

const HeaderScript = {
	initialized: false,
	init({headerParams, classes, headerEl, breakpointStore, dispatch}) {
		if (this.initialized) return;
		this.params = this.getFixedParams(headerParams)
		this.dispatch = dispatch

		Metrics.init({headerScript: this, headerEl, classes, breakpointStore, dispatch})
		this.metrics = Metrics
		
		scriptManager.registerFunctions('Header', {
			// toggleMenu: this.menu.toggleMenu,
			// calcMenuWidth: this.menu.calcMenuWidth
		})
		jsMediaQueries.registerActions(breakpointStore.tablet, [this.checkViewportChange.bind(this)])
		jsMediaQueries.registerActions(breakpointStore.mobile, [this.checkViewportChange.bind(this)])

		dispatch(setHeaderInitialized(true))
		this.initialized = true
	},
	destroy() {
		if (!this.initialized) return;
		this.metrics.destroy()
		this.dispatch(setHeaderInitialized(false))
		this.initialized = false
	},

	getFixedParams({...params}) {
		params.transitionTimeout = utilities.getCssVariable('timer-menu')*1000 || 0

		if (!params.headerPositionFixed) params.hidingHeader = params.compactMode = null

		if (typeof params.hidingHeaderView !== 'string' || !/^mobile$|^desktop$|^any$/.test(params.hidingHeaderView))
			params.hidingHeaderView = 'any'

		if (params.compactMode) {
			if (params.hidingHeaderView === 'desktop') params.hidingHeaderView = null
			if (params.hidingHeaderView === 'any') params.hidingHeaderView = 'mobile'
		}

		params.compactModeThreshold = parseInt(params.compactModeThreshold)
		if (isNaN(params.compactModeThreshold) || params.compactModeThreshold < 0) params.compactModeThreshold = 100
		params.hiddenPositionOffset = parseInt(params.hiddenPositionOffset)
		if (isNaN(params.hiddenPositionOffset)) params.hiddenPositionOffset = 0

		if (params.resetCompactMode !== false) params.resetCompactMode = true

		return params
	},

	checkViewportChange() {
		// this.menu.toggleMenu()
		// this.menu.hideMenuOnViewChange()
		this.metrics.resetHeaderPosition(true)
		this.metrics.resetCompactMode()
	},

	scrollIntoView() {
		// scroll header (or window) down to prevent gap between header and menu (because menu doesn't know about header position)
		if (this.params.headerPositionFixed) this.metrics.resetHeaderPosition()
		else window.scroll({top: 0, behavior: 'smooth'})
	},
	closeOtherModules() {

	},
	// shareHeader: function() {
	// 	if (!this.initialized) return;
	// 	this.headerElem.classList.add(this.names.stateShared)
	// 	this.headerElem.classList.add(this.names.stateSharedDelayed)
	// 	this.scrollIntoView()
	// },
	// unshareHeader: function(timeout) {
	// 	if (!this.initialized) return;
	// 	this.headerElem.classList.remove(this.names.stateShared)
	// 	setTimeout(function() {
	// 		this.headerElem.classList.remove(this.names.stateSharedDelayed)
	// 	}.bind(this), timeout);
	// },
}
export default HeaderScript
