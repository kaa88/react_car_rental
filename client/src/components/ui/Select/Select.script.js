const selectScript = {
	setupWindowEvents(elems, classes) {
		window.addEventListener('click', function(e) {this.toggleList(e, elems, classes)}.bind(this))
		window.addEventListener('resize', function(e) {this.toggleList(e, elems, classes)}.bind(this))
	},

	toggleList (e, {header, listWrapper, list}, {active}) {
		if (list.children.length === 1) return;
		function open() {
			header.addClass(active)
			listWrapper.addClass(active)
			listWrapper.el.style.height = listWrapper.el.children[0].offsetHeight + 'px'
		}
		function close() {
			header.removeClass(active)
			listWrapper.removeClass(active)
			listWrapper.el.style.height = ''
		}
		e.stopPropagation()

		if (e.currentTarget === window) return close()

		if (listWrapper.hasClass(active)) close()
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

export default selectScript