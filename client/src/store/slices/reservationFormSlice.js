import { createSlice } from '@reduxjs/toolkit';
import { defaultOptions } from "../../components/parts/Forms/ReservationForm/Options/Options"

export const reservationFormSlice = createSlice({
	name: 'reservationForm',
	initialState: {
		location: '',
		pickup: '',
		return: '',
		options: defaultOptions,
		selectorCurrentMonth: Date.now()
	},
	reducers: {
		setLocation(state, action) {
			state.location = action.payload
		},
		setPeriod(state, action) {
			state.pickup = action.payload.pickup
			state.return = action.payload.return
		},
		setOptions(state, action) {
			state.options = action.payload
		},
		setSelectorCurrentMonth(state, action) {
			state.selectorCurrentMonth = action.payload
		},
	}
})

export const {setLocation, setPeriod, setOptions, setSelectorCurrentMonth} = reservationFormSlice.actions
export default reservationFormSlice.reducer
