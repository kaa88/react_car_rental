import { createSlice } from '@reduxjs/toolkit';
import { defaultOptions } from "../../components/parts/Forms/ReservationForm/Options/Options"

export const reservationFormSlice = createSlice({
	name: 'reservationForm',
	initialState: {
		location: '',
		pickup: '',
		return: '',
		selectorCurrentMonth: Date.now(),
		options: defaultOptions,
		car: null,
		totalPrice: 0,
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
		setCar(state, action) {
			state.car = action.payload
		},
		setTotalPrice(state, action) {
			state.totalPrice = action.payload
		},
	}
})

export const {setLocation, setPeriod, setOptions, setSelectorCurrentMonth, setCar, setTotalPrice} = reservationFormSlice.actions
export default reservationFormSlice.reducer
