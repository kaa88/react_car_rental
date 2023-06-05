import { getCookie, setCookie } from './cookie.js'
import getFetchedData from './fetch.js'

function setCurrency(c) {
	if (c) {
		this.current = c
		setCookie({
			name: this.name,
			value: c.toLowerCase(),
			expires: 30,
		}, true )
	}
}

export const Currency = {
	name: 'currency',
	default: 'usd',
	current: 'usd',
	list: ['usd'],
	rates: {usd: 1},
	set: setCurrency
}

const request = {
	process: ['currency', 'fetch'],
	request: {
		path: 'currency',
		method: 'GET',
		body: {}
	}
}

let currencyData = await getFetchedData(request)
if (currencyData) {
	Currency.list = currencyData.map(item => item.name)
	currencyData.map(item => Currency.rates[item.name] = item.rate)
	let current = getCookie()[Currency.name]
	if (current) Currency.current = current
}
