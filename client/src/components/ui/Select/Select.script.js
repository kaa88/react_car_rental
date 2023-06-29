const initiatedSelects = []
// let isSetupEvents = false

const SelectScript = { // todo: сделать класс, т.к. может понадобиться добавлять и удалять эвенты для конкретного селекта
	initialized: false,
	init({elems, classes}) {
		this.elems = elems
		this.activeClass = classes.active
		initiatedSelects.push(this.elems)
		this.initialized = true
	},
	setupEvents() {
		// if (!isSetupEvents) {
			window.addEventListener('click', this.toggleList.bind(this))
			window.addEventListener('resize', this.toggleList.bind(this))
		// 	isSetupEvents = true
		// }
	},
	removeEvents() {
		window.removeEventListener('click',this.toggleList.bind(this))
		window.removeEventListener('resize', this.toggleList.bind(this))
	},

	toggleList (e,
		header = this.elems.header,
		listWrapper = this.elems.listWrapper,
		list = this.elems.list
	) {
		if (!this.initialized) return;
		if (list.children.length === 1) return;
		const active = this.activeClass

		function open() {
			closeOtherSelects()
			header.addClass(active)
			listWrapper.addClass(active)
			listWrapper.el.style.height = listWrapper.el.children[0].offsetHeight + 'px'
		}
		function close(select) {
			let closingHeader = select ? select.header : header
			let closingWrapper = select ? select.listWrapper : listWrapper
			closingHeader.removeClass(active)
			closingWrapper.removeClass(active)
			closingWrapper.el.style.height = ''
		}
		function closeOtherSelects(all) {
			initiatedSelects.forEach(item => {
				if (all || item.header.el !== header.el) close(item)
			})
		}
		e.stopPropagation()
		if (e.currentTarget === window) closeOtherSelects(true)
		else if (listWrapper.hasClass(active)) close()
		else open()
	},

	selectItem(e, headerText) {
		if (!this.initialized) return;
		let value = e.target.dataset.value
		// headerText.setChildren(value)
		return value
	}
}

export default SelectScript