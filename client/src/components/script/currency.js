import { getCookie, setCookie } from './cookie.js'
import getFetchedData from './fetch.js'

let obj = {
	process: ['currency', 'fetch'],
	request: {
		path: 'currency',
		method: 'GET',
		body: {
			// one: true,
			// name: 'usd',
		}
	}
}

let currencyData = await getFetchedData(obj)
console.log(currencyData);


function getCurrentCurrency() {
	let current = getCookie()[Currency.name]
	if (!current) current = Currency.default
	return current
}

export const Currency = {
	name: 'currency',
	list: currencyData.map(item => item.name),
	rates: {},
	default: 'usd',
	current: '',
	set(c) {
		if (c) {
			this.current = c
			setCookie({
				name: this.name,
				value: c.toLowerCase(),
				expires: 30,
			}, true )
		}
	}
}
Currency.current = getCurrentCurrency()
currencyData.map(item => Currency.rates[item.name] = item.rate)
console.log(Currency);

// export default function (str){
// 	if (str === '' || typeof str !== 'string') return str
// 	if (Currency.current === Currency.default) return str

// 	const deps = {
// 		en: '',
// 		ru: '',
// 		de: ''
// 	}

// 	let match = deps[Currency.default].find(item => item.text.toLocaleLowerCase() == str.toLocaleLowerCase())
// 	if (match) {
// 		let translate = deps[Currency.current].find(item => item.id == match.id)
// 		if (translate) return translate.text
// 	}

// 	let shortStr, shortStrLength = 30;
// 	if (str.length > shortStrLength) shortStr = str.substring(0, shortStrLength) + '...'
// 	console.warn(`Missing "${Currency.current}" translate for "${shortStr ? shortStr : str}"`)
// 	return str
// }