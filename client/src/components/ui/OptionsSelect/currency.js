import api from '../../../services/FetchService'
// import { getCookie } from '../../../services/cookie'

export const Currency = {
	name: 'currency',
	default: 'usd',
	current: 'usd',
	list: ['usd'],
	rates: {usd: 1}
}

let data = await api.getCurrency()
if (data) {
	Currency.list = data.map(item => item.name)
	data.map(item => Currency.rates[item.name] = item.rate)
	let current = localStorage.getItem(Currency.name)
	if (current && current !== 'null') Currency.current = current
}
