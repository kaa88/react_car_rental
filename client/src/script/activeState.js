const avtiveState = {
	_getClasses(data) {
		let className = typeof data === 'object' ? data.className : data
		return className.split(' ')
	},

	check(data = '', activeClassName = 'active') {
		let classes = this._getClasses(data)
		let isActive = classes.find(item => item === activeClassName)
		return isActive ? true : false
	},

	add(data = '', activeClassName = 'active') {
		if (this.check(data, activeClassName)) return data
		let classes = this._getClasses(data)
		classes.push(activeClassName)
		let newClassName = classes.join(' ')
		if (typeof data === 'object') data.setClassName(newClassName)
		return newClassName
	},
	
	remove(data = '', activeClassName = 'active') {
		if (!data) return data
		let classes = this._getClasses(data)
		let newClassName = classes.filter(item => item !== activeClassName).join(' ')
		if (typeof data === 'object') data.setClassName(newClassName)
		return newClassName
	}
}
export default avtiveState