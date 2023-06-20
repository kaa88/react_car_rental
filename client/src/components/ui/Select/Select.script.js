import { actualElems } from './Select';

const SelectScript = {
	initiated: false,
	init({classes, onSelect}) {
		this.elems = {
			get select() {return actualElems.select},
			get header() {return actualElems.header},
			get headerText() {return actualElems.headerText},
			get listWrapper() {return actualElems.listWrapper},
			get list() {return actualElems.list},
		}
		this.activeClass = classes.active
		this.onSelect = onSelect
		this.initiated = true
	},
	setupEvents() {
		window.addEventListener('click', this.toggleList.bind(this))
		window.addEventListener('resize', this.toggleList.bind(this))
	},
	removeEvents() {
		window.removeEventListener('click',this.toggleList.bind(this))
		window.removeEventListener('resize', this.toggleList.bind(this))
	},

	toggleList (e) {
		if (!this.initiated) return;
		const header = this.elems.header
		const listWrapper = this.elems.listWrapper
		const list = this.elems.list
		const active = this.activeClass

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

	selectItem(e) {
		if (!this.initiated) return;
		let value = e.target.textContent
		this.elems.headerText.setChildren(value)
	}
}

export default SelectScript