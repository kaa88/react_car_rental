import { getCookie, setCookie } from './cookie'
import getData from './fetch'


const cookieExpireDays = 30
const isCookieLog = true

export const Currency = {
	name: 'currency',
	default: 'usd',
	current: 'usd',
	list: ['usd'],
	rates: {usd: 1},
	setCookie(value) {
		if (value) {
			setCookie({
				name: this.name,
				value: value.toLowerCase(),
				expires: cookieExpireDays,
			}, isCookieLog )
		}
	}
}

const process = ['currency', 'fetch'] // ?
const request = {
	path: 'currency',
	method: 'GET',
	body: {}
}

let data = await getData(request, process)
if (data) {
	Currency.list = data.map(item => item.name)
	data.map(item => Currency.rates[item.name] = item.rate)
	let current = getCookie()[Currency.name]
	if (current) Currency.current = current
}
