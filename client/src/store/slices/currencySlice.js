import { createSlice } from '@reduxjs/toolkit';
import FetchService from '../../services/FetchService';

const CURRENCY = 'currency'

const initialState = {
	name: CURRENCY,
	default: 'usd',
	current: 'usd',
	list: ['usd'],
	rates: {usd: 1}
}
let data = await FetchService.getCurrency()
if (data.length) {
	initialState.list = data.map(item => item.name)
	data.forEach(item => initialState.rates[item.name] = item.rate)
}
let storageValue = localStorage.getItem(CURRENCY)
if (initialState.list.includes(storageValue)) initialState.current = storageValue
else localStorage.setItem(CURRENCY, initialState.default)


export const currencySlice = createSlice({
	name: CURRENCY,
	initialState,
	reducers: {
		changeCurrency(state, action) {
			let newValue = action.payload ? action.payload.toLowerCase() : ''
			if (initialState.list.includes(newValue)) {
				state.current = newValue
				localStorage.setItem(CURRENCY, newValue)
			}
		}
	}
})

export const {changeCurrency} = currencySlice.actions
export default currencySlice.reducer
