const stringifyArgs = function(args) {
	return args.map(item => {
		if (typeof item === 'string') return item.trim()
		else {
			console.warn(`Argument type must be a "string", but it is "${typeof item}"`)
			return ''
		}
	})
}

const cleanClasses = function(classes) {
	let set = new Set(classes) // filter duplicates
	set.delete('')
	return [...set]
}

const getClasses = function([...args]) {
	if (args.length < 2) return null
	let [classList, ...classNames] = stringifyArgs(args)
	let currentClasses = cleanClasses(classList.split(' '))
	let newClasses = cleanClasses(classNames)
	if (!newClasses.length) return null
	return [currentClasses, newClasses]
}

const classNameChanger = {
	check(classList, ...classNames) {
		let classes = getClasses(arguments)
		if (!classes) return false
		let [currentClasses, newClasses] = classes
		let matchedClasses = currentClasses.filter(item => newClasses.includes(item))
		return matchedClasses.length === newClasses.length ? true : false
	},

	add(classList, ...classNames) {
		let classes = getClasses(arguments)
		if (!classes) return classList
		let [currentClasses, newClasses] = classes
		let newClassList = [...new Set(currentClasses.concat(newClasses))]
		return newClassList.join(' ')
	},
	
	remove(classList, ...classNames) {
		let classes = getClasses(arguments)
		if (!classes) return classList
		let [currentClasses, newClasses] = classes
		let newClassList = currentClasses.filter(item => !newClasses.includes(item))
		return newClassList.join(' ')
	}
}
export default classNameChanger

// const classNameChanger = {
// 	_getClasses(classList) {
// 		if (typeof classList !== 'string') classList = this.className
// 		return classList.split(' ')
// 	},

// 	check(className, classList) {
// 		if (!className) return null
// 		let classes = getClasses(classList)
// 		let isActive = classes.find(item => item === className)
// 		return isActive ? true : false
// 	},

// 	add(className, classList) {
// 		if (this.check(className, classList)) return className
// 		let classes = getClasses(classList)
// 		classes.push(className)
// 		let newClassList = classes.join(' ')
// 		if (this.setClassName) this.setClassName(newClassList)
// 		// this.className = newClassList // ?????
// 		return newClassList
// 	},
	
// 	remove(className, classList) {
// 		let classes = getClasses(classList)
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

