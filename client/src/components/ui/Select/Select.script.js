import activeState from '../../../script/activeState';

export default {
	setWindowEvents() {
		window.addEventListener('click', this.toggleList)
		window.addEventListener('resize', this.toggleList)
	},

	toggleList (e, {header, listWrapper, list}, {active}) {
		if (list.children.length === 1) return;
		function open() {
			activeState.add(header, active)
			activeState.add(listWrapper, active)
			listWrapper.el.style.height = listWrapper.el.children[0].offsetHeight + 'px'
		}
		function close() {
			activeState.remove(header, active)
			activeState.remove(listWrapper, active)
			listWrapper.el.style.height = ''
		}
		e.stopPropagation()

		// if (e.currentTarget.parentElement !== select.el) console.log('ksdjfa'); //close() // doesnt work
		if (e.currentTarget === window) return close()

		if (activeState.check(listWrapper, active)) close()
		else open()
	},

	selectItem(e, {headerText}, data) {
		let value = e.target.textContent
		headerText.setChildren(value)
		value = value.toLowerCase()
		data.setCookie(value)
		return value
	}
}