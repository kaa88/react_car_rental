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
