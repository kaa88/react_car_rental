import { createSlice } from '@reduxjs/toolkit';
import { Currency } from '../../components/ui/OptionsSelect/currency';

export const currencySlice = createSlice({
	name: 'currency',
	initialState: Currency,
	reducers: {
		changeCurrency(state, action) {
			state.current = action.payload
		}
	}
})

export const {changeCurrency} = currencySlice.actions
export default currencySlice.reducer
