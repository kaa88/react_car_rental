import { setMenuInitialized, setMenuActive } from '../../../../store/reducers/headerReducer';
import { transitionIsLocked } from '../../../../script/transitionLock';
import { lockScroll, unlockScroll } from '../../../../script/scrollLock';
import { jsMediaQueries } from '../../../../script/jsMediaQueries'
import utilities from '../../../../script/utilities';
import classNameChanger from '../../../../script/classNameChanger';
import Metrics from '../HeaderMetrics';

const TRANSITION_TIMEOUT = utilities.getCssVariable('timer-menu')*1000 || 0
const HIDE_MENU_DEFAULT_TIMEOUT_ID = 321 // рандомный id чтобы вдруг не зацепить другие таймауты на старте
const WRAPPER_WIDTH_THRESHOLD = 2
const VIEW_KEY_LARGE = 'L'
const VIEW_KEY_MEDIUM = 'M'
const VIEW_KEY_SMALL = 'S'

const Menu = {
	dispatch() {},
	breakpoints: {},
	menuIsActive: false,
	elems: {
		hideWrapper: {},
		menu: {}
	},

	initialized: false,
	init(params = {}, classes) {
		if (this.initialized) return;
		this.classes = {
			active: classes.active,
			menuShrink: classes.shrinked,
			hideOnViewChange: {
				[VIEW_KEY_LARGE]: classes.viewChangeStageL,
				[VIEW_KEY_MEDIUM]: classes.viewChangeStageM,
				[VIEW_KEY_SMALL]: classes.viewChangeStageS
			}
		}
		this.menuIsHidingOnViewChange = params.hideOnViewChangе === false ? false : true
		this.hideMenuOnViewChangeTimeoutId = HIDE_MENU_DEFAULT_TIMEOUT_ID
		this.menuIsShrinked = false


		this.calcMenuWidthBinded = this.calcMenuWidth.bind(this)
		window.addEventListener('resize', this.calcMenuWidthBinded)
		this.setupJsMediaQueries(true)

		this.dispatch(setMenuInitialized(true))
		this.initialized = true
		// following fns must run after init=true
		this.calcMenuWidth()
		this.hideMenuOnViewChange()
	},
	destroy() {
		if (!this.initialized) return;
		window.removeEventListener('resize', this.calcMenuWidthBinded)
		this.setupJsMediaQueries()
		this.dispatch(setMenuInitialized(false))
		this.initialized = false
	},

	setupJsMediaQueries(init) {
		let task = init ? 'registerActions' : 'deleteActions'
		let jsmqActions = [this.closeMenu.bind(this), this.hideMenuOnViewChange.bind(this)]
		jsMediaQueries[task](this.breakpoints.tablet, jsmqActions)
		jsMediaQueries[task](this.breakpoints.mobile, jsmqActions)
	},

	openMenu() {
		if (this.menuIsActive || transitionIsLocked(TRANSITION_TIMEOUT)) return;
		lockScroll()
		this.dispatch(setMenuActive(true))
		// this.closeOtherModules() 						// script manager will do it
		// this.headerScript.scrollIntoView() 			// header will do it
		// this.onMenuOpen()
	},
	closeMenu() {
		if (!this.menuIsActive || transitionIsLocked(TRANSITION_TIMEOUT)) return;
		unlockScroll(TRANSITION_TIMEOUT)
		this.dispatch(setMenuActive(false))
		// this.onMenuClose()
	},

	hideMenuOnViewChange() {
		if (!this.initialized || !this.menuIsHidingOnViewChange) return;
		clearTimeout(this.hideMenuOnViewChangeTimeoutId)
		this.hideMenuOnViewChangeTimeoutId = setTimeout(function(){
			let viewKey = VIEW_KEY_MEDIUM
			if (window.innerWidth <= this.breakpoints.mobile) viewKey = VIEW_KEY_SMALL
			else if (window.innerWidth > this.breakpoints.tablet) viewKey = VIEW_KEY_LARGE
			
			const wrapper = this.elems.hideWrapper
			let newClassName = wrapper.className
			Object.entries(this.classes.hideOnViewChange).forEach(([key, value]) => {
				if (key === viewKey) newClassName = classNameChanger.add(newClassName, value)
				else newClassName = classNameChanger.remove(newClassName, value)
			})
			wrapper.setClassName(newClassName)

			Metrics.calcHeaderHeight() //?
		}.bind(this), TRANSITION_TIMEOUT)
	},
	resetShrinkStateOnLanguageChange(lang) {
		if (!this.initialized || !lang) return;
		const langChangeTimeout = 200
		const hiddenProp = 'opacity'
		const hiddenValue = '0'
		const menu = this.elems.menu

		if (lang !== this.language) {
			this.language = lang
			this.menuIsShrinked = false
			menu.el.style[hiddenProp] = hiddenValue
			menu.removeClass(this.classes.menuShrink)

			setTimeout(function() {
				this.calcMenuWidth()
				menu.el.style[hiddenProp] = ''
			}.bind(this), langChangeTimeout)
		}
	},
	calcMenuWidth() {
		if (!this.initialized) return;
		const wrapper = this.elems.hideWrapper
		const menu = this.elems.menu
		let menuIsShrinked;
		if (window.innerWidth <= this.breakpoints.tablet) menuIsShrinked = false
		else {
			let wrapperWidth = wrapper.el.offsetWidth
			let menuWidth = menu.el.offsetWidth
			menuIsShrinked = (menuWidth >= wrapperWidth - WRAPPER_WIDTH_THRESHOLD) ? true : false
		}
		if (menuIsShrinked !== this.menuIsShrinked) {
			if (menuIsShrinked) menu.addClass(this.classes.menuShrink)
			else menu.removeClass(this.classes.menuShrink)
			this.menuIsShrinked = menuIsShrinked
		}
	},
}
export default Menu
