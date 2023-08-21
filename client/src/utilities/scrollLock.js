/* 
	Module prevents window scrolling with menu, modals, etc. and
	prevents content jumps when scrollbar fades out.
*/
const lockedClassName = 'scroll-is-locked'
const cssVarName = '--scrollbar-width'

export const scrollLock = {
	init() {
		window.addEventListener('resize', this.calcScrollbarWidth.bind(this))
		this.calcScrollbarWidth()
		// sometimes calculation = -1, so let's run one more time
		const secondTryDelay = 1000
		if (this.scrollbarWidth <= 0) setTimeout(function() {
			this.calcScrollbarWidth()
		}.bind(this), secondTryDelay)
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
