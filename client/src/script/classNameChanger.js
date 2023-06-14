const classNameChanger = {
	_fixArgs(args = []) {
		let fixed = Array.from(args).map(item => {
			if (typeof item !== 'string') return ''
			else return item.trim()
		})
		return fixed
	},

	_getClasses(classList) {
		if (!classList) return []
		let split = classList.split(' ')
		let cleanedSplit = split.filter(item => item !== '')
		return cleanedSplit
	},

	check() { // (classList, ...classNames)
		let [classList, ...classNames] = this._fixArgs(arguments)
		let classes = this._getClasses(classList)

		// let x = classNames.reduce((reduced, current) => {console.log(reduced);if (!reduced.includes(current)) return reduced.push(current)}, [])
		// console.log(x);
		// let x = classNames.filter(name => {})
		let filteredClassNames = []
		for (let i = 0; i < classNames.length; i++) { // так работает... сделать функцию
			if (!filteredClassNames.includes(classNames[i])) filteredClassNames.push(classNames[i])
		}
		//

		let matchedClasses = classes.filter(item => filteredClassNames.includes(item))
		return matchedClasses.length === filteredClassNames.length ? true : false // переделать чтобы ставил true если 2 одинаковых класса
	},

	add(currentClassList) { // todo: optimization (twice: _fixArgs, _getClasses)
		let checkResponse = this.check(...arguments)
		if (checkResponse) return currentClassList
		let [classList, ...classNames] = this._fixArgs(arguments)
		let classes = this._getClasses(classList)
		classNames.forEach(name => classes.push(name))
		return classes.join(' ')
	},
	
	remove(currentClassList) { // (classList, ...classNames)
		let [classList, ...classNames] = this._fixArgs(arguments)
		if (!classList) return currentClassList
		let classes = this._getClasses(classList)
		if (!classes.length) return currentClassList
		let newClassList = classes.filter(item => !classNames.includes(item))
		return newClassList.join(' ')
	}
}
export default classNameChanger

console.log('check:', classNameChanger.check('a b  c', 'b', 'b', 'c', 'c')); 
console.log('check:', classNameChanger.check('a b  c', 'b', 'b', 'c', 'c', 'd')); 
// console.log('add:', classNameChanger.add(['a b  c'], 'b')); 
// console.log('add:', classNameChanger.add('a b  c', ' d', 'e ')); 
// console.log('remove:', classNameChanger.remove('a b  c', ' b')); 

console.log(classNameChanger);

// const classNameChanger = {
// 	_getClasses(classList) {
// 		if (typeof classList !== 'string') classList = this.className
// 		return classList.split(' ')
// 	},

// 	check(className, classList) {
// 		if (!className) return null
// 		let classes = this._getClasses(classList)
// 		let isActive = classes.find(item => item === className)
// 		return isActive ? true : false
// 	},

// 	add(className, classList) {
// 		if (this.check(className, classList)) return className
// 		let classes = this._getClasses(classList)
// 		classes.push(className)
// 		let newClassList = classes.join(' ')
// 		if (this.setClassName) this.setClassName(newClassList)
// 		// this.className = newClassList // ?????
// 		return newClassList
// 	},
	
// 	remove(className, classList) {
// 		let classes = this._getClasses(classList)
// 		if (!classes.length) return classList
// 		let newClassList = classes.filter(item => item !== className).join(' ')
// 		if (this.setClassName) this.setClassName(newClassList)
// 		return newClassList
// 	}
// }
// export default classNameChanger

// export function getClassListForCustomElement(className = '', setClassName) {
// 	return {
// 		className,
// 		setClassName,
// 		_getClasses: classNameChanger._getClasses,
// 		contains: classNameChanger.contains,
// 		add: classNameChanger.add,
// 		remove: classNameChanger.remove
// 	}
// }

