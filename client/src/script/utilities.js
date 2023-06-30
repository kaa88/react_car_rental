const utilities = {
	objectIsEmpty(obj) {
		for (let prop in obj) {
			if (Object.hasOwn(obj, prop)) return false
		}
		return true
	},
	getCssVariable(name) {
		const errorMessage = `Could not find CSS variable "${name}"`
		let value = null
		if (name) {
			const varPrefix = '--'
			if (!name.match(new RegExp('^' + varPrefix))) name = varPrefix + name
			let variable = parseFloat(getComputedStyle(document.body).getPropertyValue(name))
			if (!isNaN(variable)) value = variable
		}
		if (value === null) {
			console.error(errorMessage)
			return 0
		}
		return value
	}
}
export default utilities