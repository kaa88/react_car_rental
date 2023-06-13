const classNameChanger = {
	_getClasses(classList) {
		if (typeof classList !== 'string') classList = this.className
		return classList.split(' ')
	},

	contains(className, classList) {
		if (!className) return null
		let classes = this._getClasses(classList)
		let isActive = classes.find(item => item === className)
		return isActive ? true : false
	},

	add(className, classList) {
		if (this.contains(className, classList)) return className
		let classes = this._getClasses(classList)
		classes.push(className)
		let newClassList = classes.join(' ')
		if (this.setClassName) this.setClassName(newClassList)
		// this.className = newClassList // ?????
		return newClassList
	},
	
	remove(className, classList) {
		let classes = this._getClasses(classList)
		if (!classes.length) return classList
		let newClassList = classes.filter(item => item !== className).join(' ')
		if (this.setClassName) this.setClassName(newClassList)
		return newClassList
	}
}
export default classNameChanger

export function getClassListForCustomElement(className = '', setClassName) {
	return {
		className,
		setClassName,
		_getClasses: classNameChanger._getClasses,
		contains: classNameChanger.contains,
		add: classNameChanger.add,
		remove: classNameChanger.remove
	}
}

// const classNameChanger = {
// 	_getClasses(data) { // data can be 'string' or 'customElement'
// 		let className = typeof data === 'object' ? data.className : data
// 		return className.split(' ')
// 	},

// 	contains(data = '', activeClassName = 'active') {
// 		let classes = this._getClasses(data)
// 		let isActive = classes.find(item => item === activeClassName)
// 		return isActive ? true : false
// 	},

// 	add(data = '', activeClassName = 'active') {
// 		if (this.contains(data, activeClassName)) return data
// 		let classes = this._getClasses(data)
// 		classes.push(activeClassName)
// 		let newClassName = classes.join(' ')
// 		if (typeof data === 'object') data.setClassName(newClassName)
// 		return newClassName
// 	},
	
// 	remove(data = '', activeClassName = 'active') {
// 		if (!data) return data
// 		let classes = this._getClasses(data)
// 		let newClassName = classes.filter(item => item !== activeClassName).join(' ')
// 		if (typeof data === 'object') data.setClassName(newClassName)
// 		return newClassName
// 	}
// }
// export default classNameChanger