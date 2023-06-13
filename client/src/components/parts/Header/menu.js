import { transitionLock } from '../../../script/transLock';
import { scrollLock } from '../../../script/scrollLock';
import Metrics from './metrics';

const lockScroll = scrollLock.lock
const unlockScroll = scrollLock.unlock

const menu = {
	init({headerParams, header, menuHideWrapper, menu, classes, breakpointStore}) {
		this.header = header
		this.wrapper = menuHideWrapper
		this.menu = menu
		this.timeout = headerParams.menuTimeout || 0
		this.classes = {
			active: classes.header_active,
			menuShrink: classes.menu_shrink,
			hideOnViewChange: {
				L: classes.hideOnViewChangeStageL,
				M: classes.hideOnViewChangeStageM,
				S: classes.hideOnViewChangeStageS,
			}
		}
		this.breakpoints = breakpointStore
		this.isModifiedMenu = false
		this.isHidingMenuOnViewChange = headerParams.hideMenuOnViewChange || true
		this.hideMenuOnViewChangeTimeoutId = 321 // рандомный id чтобы вдруг не зацепить другие таймауты на старте
		this.hideMenuOnViewChange()

		window.addEventListener('resize', this.calcMenuWidth.bind(this))
		this.calcMenuWidth()
	},

	toggleMenu(e, header) {
		if (header.classList.contains(this.activeClass)) this.closeMenu(e, header)
		else this.openMenu(e, header)
	},
	openMenu(e, header) {
		if (transitionLock.check(this.timeout)) return;
		lockScroll()
		header.classList.add(this.activeClass)
	},
	closeMenu(e, header) {
		if (transitionLock.check(this.timeout)) return;
		unlockScroll(this.timeout)
		header.classList.remove(this.activeClass)
	},
	calcMenuWidth() {
		let wrapperWidth = this.wrapper.el.offsetWidth
		let menuWidth = this.menu.el.offsetWidth
		let isModifiedMenu;
		if (menuWidth >= wrapperWidth - 3) isModifiedMenu = true
		else isModifiedMenu = false
		if (isModifiedMenu !== this.isModifiedMenu) {
			let newClassName = isModifiedMenu
				? this.menu.classList.add(this.menuShrinkClass)
				: this.menu.classList.remove(this.menuShrinkClass)
			this.menu.setClassName(newClassName)
			this.menu.className = newClassName
			this.isModifiedMenu = isModifiedMenu
		}
	},
	hideMenuOnViewChange() {
		console.log('change');
		if (this.isHidingMenuOnViewChange) {
			clearTimeout(this.hideMenuOnViewChangeTimeoutId)
			this.hideMenuOnViewChangeTimeoutId = setTimeout(function(){

				let viewKey = 'M'
				if (window.innerWidth <= this.breakpoints.mobile) viewKey = 'S'
				else if (window.innerWidth > this.breakpoints.tablet) viewKey = 'L'
				
				Object.entries(this.classes.hideOnViewChange).forEach(([key, value]) => {
					if (key === viewKey) this.menu.classList.add(value)
					else this.menu.classList.remove(value)
				})

				// могу несколько раз изменить строку, но применить изменения через setClassName только 1 раз за рендер
				// поэтому ClassNameChanger надо упростить до обработки только строк

				Metrics.calcHeaderHeight()
			}.bind(this), this.timeout)
		}
	}
}
export default menu
