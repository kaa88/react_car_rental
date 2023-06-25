import { transitionLock } from '../../../script/transLock';
import { scrollLock } from '../../../script/scrollLock';
import Metrics from './metrics';
import classNameChanger from '../../../script/classNameChanger'
import { actualElems } from './Header';

const lockScroll = scrollLock.lock
const unlockScroll = scrollLock.unlock
const HIDE_MENU_DEFAULT_TIMEOUT_ID = 321
const WRAPPER_WIDTH_THRESHOLD = 2
const VIEW_KEY_LARGE = 'L'
const VIEW_KEY_MEDIUM = 'M'
const VIEW_KEY_SMALL = 'S'

const Menu = {
	initiated: false,
	init({headerScript, classes, breakpointStore, languageStore}) {
		this.headerScript = headerScript
		this.elems = {
			get wrapper() {return actualElems.menuHideWrapper},
			get menu() {return actualElems.menu},
		}
		this.timeout = headerScript.params.transitionTimeout
		this.breakpoints = breakpointStore
		this.isShrinkedMenu = false
		this.classes = {
			active: classes.header_active,
			menuShrink: classes.menu_shrink,
			hideOnViewChange: {}
		}
		this.classes.hideOnViewChange[VIEW_KEY_LARGE] = classes.hideOnViewChangeStageL
		this.classes.hideOnViewChange[VIEW_KEY_MEDIUM] = classes.hideOnViewChangeStageM
		this.classes.hideOnViewChange[VIEW_KEY_SMALL] = classes.hideOnViewChangeStageS
		this.isHidingMenuOnViewChange = headerScript.params.hideOnViewChangе
		this.hideMenuOnViewChangeTimeoutId = HIDE_MENU_DEFAULT_TIMEOUT_ID // рандомный id чтобы вдруг не зацепить другие таймауты на старте

		this.language = languageStore.current

		window.addEventListener('resize', this.calcMenuWidth.bind(this))
		this.initiated = true
		this.calcMenuWidth()
		this.hideMenuOnViewChange()
	},

	toggleMenu(e) {
		if (!this.initiated) return;
		const header = actualElems.header
		if (header.hasClass(this.classes.active)) this.closeMenu(e, header)
		else if (e) this.openMenu(e, header)
	},
	openMenu(e, header) {
		if (transitionLock.check(this.timeout)) return;
		lockScroll()
		this.headerScript.closeOtherModules(true)
		this.headerScript.scrollIntoView()
		header.addClass(this.classes.active)
		// this.onMenuOpen()
	},
	closeMenu(e, header) {
		if (transitionLock.check(this.timeout)) return;
		unlockScroll(this.timeout)
		header.removeClass(this.classes.active)
		// this.headerScript.closeOtherModules(true)
		// submenu.closeAll()
		// this.onMenuClose()
	},
	hideMenuOnViewChange() {
		if (!this.initiated) return;
		if (this.isHidingMenuOnViewChange) {
			clearTimeout(this.hideMenuOnViewChangeTimeoutId)
			this.hideMenuOnViewChangeTimeoutId = setTimeout(function(){

				let viewKey = VIEW_KEY_MEDIUM
				if (window.innerWidth <= this.breakpoints.mobile) viewKey = VIEW_KEY_SMALL
				else if (window.innerWidth > this.breakpoints.tablet) viewKey = VIEW_KEY_LARGE
				
				const wrapper = this.elems.wrapper
				let newClassName = wrapper.className
				Object.entries(this.classes.hideOnViewChange).forEach(([key, value]) => {
					if (key === viewKey) newClassName = classNameChanger.add(newClassName, value)
					else newClassName = classNameChanger.remove(newClassName, value)
				})
				wrapper.setClassName(newClassName)

				Metrics.calcHeaderHeight()
			}.bind(this), this.timeout)
		}
	},
	checkLanguage(lang) {
		if (!this.initiated || !lang) return;
		const menu = this.elems.menu
		const langChangeTimeout = 200
		const hiddenProp = 'opacity'
		const hiddenValue = '0'
		const visibleValue = '1'

		if (lang !== this.language) {
			this.language = lang
			this.isShrinkedMenu = false
			menu.el.style[hiddenProp] = hiddenValue
			menu.removeClass(this.classes.menuShrink)

			setTimeout(function() {
				this.calcMenuWidth()
				menu.el.style[hiddenProp] = visibleValue
			}.bind(this), langChangeTimeout)
		}
	},
	calcMenuWidth() {
		if (!this.initiated) return;
		const wrapper = this.elems.wrapper
		const menu = this.elems.menu
		let isShrinkedMenu;
		if (window.innerWidth <= this.breakpoints.tablet) isShrinkedMenu = false
		else {
			let wrapperWidth = wrapper.el.offsetWidth
			let menuWidth = menu.el.offsetWidth
			isShrinkedMenu = (menuWidth >= wrapperWidth - WRAPPER_WIDTH_THRESHOLD) ? true : false
		}
		if (isShrinkedMenu !== this.isShrinkedMenu) {
			if (isShrinkedMenu) menu.addClass(this.classes.menuShrink)
			else menu.removeClass(this.classes.menuShrink)
			this.isShrinkedMenu = isShrinkedMenu
		}
	},
}
export default Menu
