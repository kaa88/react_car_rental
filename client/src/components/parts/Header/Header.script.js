import { jsMediaQueries } from '../../../script/jsMediaQueries'
import { scriptManager } from '../../../script/scriptManager';
import classNameChanger from '../../../script/classNameChanger'
import Metrics from './metrics';
import Menu from './menu';


const HeaderScript = {
	initialized: false,
	init({headerParams, classes, header, breakpointStore, languageStore}) {
		this.params = this.getFixedParams(headerParams)

		let headerPositonClassName = header.className
		if (this.params.headerPositionFixed) {
			headerPositonClassName = classNameChanger.remove(headerPositonClassName, classes.header_static)
			headerPositonClassName = classNameChanger.add(headerPositonClassName, classes.header_fixed)
		} else {
			headerPositonClassName = classNameChanger.remove(headerPositonClassName, classes.header_fixed)
			headerPositonClassName = classNameChanger.add(headerPositonClassName, classes.header_static)
		} header.setClassName(headerPositonClassName)

		Metrics.init({headerScript: this, header, classes, breakpointStore})
		this.metrics = Metrics
		
		if (this.params.menu) {
			Menu.init({headerScript: this, classes, breakpointStore, languageStore})
			this.menu = Menu
		}
		scriptManager.registerFunctions('Header', {
			toggleMenu: this.menu.toggleMenu,
			calcMenuWidth: this.menu.calcMenuWidth
		})
		jsMediaQueries.registerActions(breakpointStore.tablet, [this.checkViewportChange.bind(this)])
		jsMediaQueries.registerActions(breakpointStore.mobile, [this.checkViewportChange.bind(this)])

		this.initialized = true
	},

	getFixedParams({...params}) {
		params.transitionTimeout = parseFloat(getComputedStyle(document.body).getPropertyValue('--timer-menu'))*1000 || 0;

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
		if (params.hideOnViewChangе !== false) params.hideOnViewChangе = true

		return params
	},

	checkViewportChange() {
		this.menu.toggleMenu()
		this.menu.hideMenuOnViewChange()
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
