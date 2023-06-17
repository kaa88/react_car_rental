import { transitionLock } from '../../../script/transLock';
import { scrollLock } from '../../../script/scrollLock';
import Metrics from './metrics';
import classNameChanger from '../../../script/classNameChanger'

const lockScroll = scrollLock.lock
const unlockScroll = scrollLock.unlock
const DEFAULT_TIMEOUT = 0
const HIDE_MENU_DEFAULT_TIMEOUT_ID = 321
const WRAPPER_WIDTH_TRESHOLD = 2
const VIEW_KEY_LARGE = 'L'
const VIEW_KEY_MEDIUM = 'M'
const VIEW_KEY_SMALL = 'S'

const menu = {
	init({headerParams, header, menuHideWrapper, menu, classes, breakpointStore}) {
		this.header = header
		this.wrapper = menuHideWrapper
		this.menu = menu
		this.timeout = headerParams.menuTimeout || DEFAULT_TIMEOUT
		this.classes = {
			active: classes.header_active,
			menuShrink: classes.menu_shrink,
			hideOnViewChange: {}
		}
		this.classes.hideOnViewChange[VIEW_KEY_LARGE] = classes.hideOnViewChangeStageL
		this.classes.hideOnViewChange[VIEW_KEY_MEDIUM] = classes.hideOnViewChangeStageM
		this.classes.hideOnViewChange[VIEW_KEY_SMALL] = classes.hideOnViewChangeStageS
		this.breakpoints = breakpointStore
		this.isShrinkedMenu = false
		this.isHidingMenuOnViewChange = headerParams.hideMenuOnViewChange || true
		this.hideMenuOnViewChangeTimeoutId = HIDE_MENU_DEFAULT_TIMEOUT_ID // рандомный id чтобы вдруг не зацепить другие таймауты на старте
		this.hideMenuOnViewChange()

		window.addEventListener('resize', this.calcMenuWidth.bind(this))
		this.calcMenuWidth()
	},

	toggleMenu(e, header) {
		if (header.hasClass(this.classes.active)) this.closeMenu(e, header)
		else if (e) this.openMenu(e, header)
	},
	openMenu(e, header) {
		if (transitionLock.check(this.timeout)) return;
		header.addClass(this.classes.active)
		lockScroll()
	},
	closeMenu(e, header) {
		if (transitionLock.check(this.timeout)) return;
		if (!header) header = this.header
		header.removeClass(this.classes.active)
		unlockScroll(this.timeout)
	},
	hideMenuOnViewChange() {
		if (this.isHidingMenuOnViewChange) {
			clearTimeout(this.hideMenuOnViewChangeTimeoutId)
			this.hideMenuOnViewChangeTimeoutId = setTimeout(function(){

				let viewKey = VIEW_KEY_MEDIUM
				if (window.innerWidth <= this.breakpoints.mobile) viewKey = VIEW_KEY_SMALL
				else if (window.innerWidth > this.breakpoints.tablet) viewKey = VIEW_KEY_LARGE

				let newClassName = this.wrapper.className
				Object.entries(this.classes.hideOnViewChange).forEach(([key, value]) => {
					if (key === viewKey) newClassName = classNameChanger.add(newClassName, value)
					else newClassName = classNameChanger.remove(newClassName, value)
				})
				this.wrapper.setClassName(newClassName)

				Metrics.calcHeaderHeight()
			}.bind(this), this.timeout)
		}
	},
	calcMenuWidth() {
		let isShrinkedMenu;
		if (window.innerWidth <= this.breakpoints.tablet) isShrinkedMenu = false
		else {
			let wrapperWidth = this.wrapper.el.offsetWidth
			let menuWidth = this.menu.el.offsetWidth
			isShrinkedMenu = (menuWidth >= wrapperWidth - WRAPPER_WIDTH_TRESHOLD) ? true : false
		}
		if (isShrinkedMenu !== this.isShrinkedMenu) {
			if (isShrinkedMenu) this.menu.addClass(this.classes.menuShrink)
			else this.menu.removeClass(this.classes.menuShrink)
			this.isShrinkedMenu = isShrinkedMenu
		}
	},
}
export default menu
