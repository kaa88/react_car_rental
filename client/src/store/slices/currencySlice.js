import { createSlice } from '@reduxjs/toolkit';
import { Currency } from '../../components/ui/OptionsSelect/currency';

const CURRENCY = 'currency'

export const currencySlice = createSlice({
	name: CURRENCY,
	initialState: Currency,
	reducers: {
		changeCurrency(state, action) {
			state.current = action.payload
			localStorage.setItem(CURRENCY, action.payload)
		}
	}
})

export const {changeCurrency} = currencySlice.actions
export default currencySlice.reducer
