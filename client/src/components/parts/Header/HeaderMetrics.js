import { changeWindowHeight, changeHeaderHeight, changeHeaderPosition } from '../../../store/reducers/headerMetricsReducer'
import changeClassName from '../../../script/activeState';


export const headerMetrics = {
	init(headerElem, state, dispatch, setHeaderStyle) {
		this.headerElem = headerElem
		this.headerHeight = {
			value: state.headerHeight,
			setState(value) {dispatch(changeHeaderHeight(value))},
			var: '--header-height'
		}
		this.headerPosition = {
			value: state.headerPosition,
			setState(value) {dispatch(changeHeaderPosition(value))},
			var: '--header-position'
		}
		this.windowHeight = {
			value: state.windowHeight,
			setState(value) {dispatch(changeWindowHeight(value))},
			var: '--window-height'
		}
		this.setHeaderStyle = setHeaderStyle
		this.headerStyle = {}

		window.addEventListener('resize', this.calcHeaderHeight.bind(this))
		this.calcHeaderHeight(false, true)
	},
	calcHeaderHeight(e) {
		const newMertics = {
			windowHeight: window.innerHeight,
			headerHeight: this.headerElem.el.offsetHeight,
			headerPosition: 0
		}
		let updateStyle = false, newStyle = {};
		Object.entries(newMertics).forEach(([key, value]) => {
			if (value !== this[key].value) {
				updateStyle = true
				value = Math.round(value * 10) / 10
				this[key].value = value
				this[key].setState(value)
				newStyle[this[key].var] = value + 'px'
			}
		})
		if (updateStyle) {
			this.headerStyle = Object.assign({}, this.headerStyle, newStyle)
			this.setHeaderStyle(this.headerStyle)
		}

		// return [this.headerHeight, this.headerPosition]
	},
}

export const menuWidth = {
	init(menuHideWrapper, menu, {menu_shrink}) {
		this.menuHideWrapper = menuHideWrapper
		this.menu = menu
		this.isModified = false
		this.modificatorClassName = menu_shrink
		window.addEventListener('resize', this.calc.bind(this))
		this.calc()
	},
	calc() {
		let wrapperWidth = this.menuHideWrapper.el.offsetWidth
		let menuWidth = this.menu.el.offsetWidth
		let isModified;
		if (menuWidth >= wrapperWidth - 3) isModified = true
		else isModified = false
		if (isModified !== this.isModified) {
			let newClassName = isModified
				? changeClassName.add(this.menu.className, this.modificatorClassName)
				: changeClassName.remove(this.menu.className, this.modificatorClassName)
			this.menu.setClassName(newClassName)
			this.menu.className = newClassName
			this.isModified = isModified
		}
	}
}
