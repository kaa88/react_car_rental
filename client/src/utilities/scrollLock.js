/* 
	Module prevents window scrolling with menu, modals, etc. and
	prevents content jumps when scrollbar fades out.
	
	Add classes to components which you want to prevent jumping:
	- 'scroll-lock-item-p' class - for static elems ('padding-right' prop.)
	- 'scroll-lock-item-m' class - for fixed elems ('margin-right' prop.)
	- 'scroll-lock-item-pm' class - for static elems that will be hidden in menu
		(they will get a 'padding-right' prop. only on desktop width)

	Usable functions:
		scrollLock.lock()
		scrollLock.unlock( *timeout* )
*/
const lockedClassName = 'scroll-is-locked'
const cssVarName = '--scrollbar-width'

export const scrollLock = {
	init() {
		window.addEventListener('resize', this.calcScrollbarWidth.bind(this))
		this.calcScrollbarWidth()
		// this.lock() // prevant some 'scroll' events when page loads... Header will unlock it
	},
	calcScrollbarWidth() {
		if (document.body.classList.contains(lockedClassName)) return;
		let scrollbarWidth = window.innerWidth - document.body.offsetWidth
		if (scrollbarWidth !== this.scrollbarWidth) {
			document.body.style.setProperty(cssVarName, scrollbarWidth + 'px')
			this.scrollbarWidth = scrollbarWidth
		}
	},
}
export function lockScroll() {
	document.body.classList.add(lockedClassName)
}
export function unlockScroll(timeout = 0) {
	setTimeout(() => {
		document.body.classList.remove(lockedClassName)
	}, timeout)
}
