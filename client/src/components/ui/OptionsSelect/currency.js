import api from '../../../services/fetch'
import { getCookie } from '../../../services/cookie'

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
	let current = getCookie()[Currency.name]
	if (current) Currency.current = current
}
