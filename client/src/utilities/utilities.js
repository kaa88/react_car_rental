export function objectIsEmpty(obj) {
	if (Array.isArray(obj)) return !obj.length
	for (let prop in obj) {
		if (Object.hasOwn(obj, prop)) return false
	}
	return true
}

export function getCssVariable(name) {
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

export function getRandomNumber(min = 0, max = 99) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomId(length = 10) {
	const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let result = ''
	for (let i = 0; i < length; i++) {
		result += symbols[getRandomNumber(0, symbols.length-1)]
	}
	return result
}

export async function _wait_(seconds = 3) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), seconds * 1000)
	})
}
