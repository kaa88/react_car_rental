import getData from '../../../script/fetch'
import { getCookie } from '../../../script/cookie'

export const Currency = {
	name: 'currency',
	default: 'usd',
	current: 'usd',
	list: ['usd'],
	rates: {usd: 1}
}

const request = {
	path: '/currency',
	method: 'GET',
	body: {}
}
const process = ['currency', 'fetch'] // ?

let data = await getData(request, process)
if (data) {
	Currency.list = data.map(item => item.name)
	data.map(item => Currency.rates[item.name] = item.rate)
	let current = getCookie()[Currency.name]
	if (current) Currency.current = current
}
