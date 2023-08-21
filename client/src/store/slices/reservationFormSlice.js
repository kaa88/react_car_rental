import { createSlice } from '@reduxjs/toolkit';

const name = 'reservationForm'
const defaultState = {
	id: null,
	location: null,
	pickup: 0,
	return: 0,
	selectorCurrentMonth: Date.now(),
	driverAgeIsOk: false,
	isDifferentReturnLocation: false,
	car: null,
	totalPrice: 0,
}
const savedData = sessionStorage.getItem(name)


export const reservationFormSlice = createSlice({
	name,
	initialState: savedData ? JSON.parse(savedData) : defaultState,
	reducers: {
		setReservation(state, action) {
			let values = action.payload
			if (typeof values !== 'object' || Array.isArray(values))
				return console.error(`'${name}' action payload must be an 'object'`)

			Object.entries(defaultState).forEach(([key, defaultValue]) => {
				if (values[key] !== undefined) {
					if (key.match(/pickup|return|selectorCurrentMonth/)) values[key] = normalizeDate(values[key])
					state[key] = values[key] || defaultValue
				}
			})
			sessionStorage.setItem(name, JSON.stringify(state))
		},
		resetReservation(state) {
			// Object.entries(defaultState).forEach(([key, defaultValue]) => {
			// 	state[key] = defaultValue
			// })
			state = defaultState
			sessionStorage.setItem(name, JSON.stringify(defaultState))
		},
	}
})

export const { setReservation, resetReservation } = reservationFormSlice.actions
export default reservationFormSlice.reducer


function normalizeDate(date) {
	if (date instanceof Date) return date.getTime()
	if (typeof date === 'string') return new Date(date).getTime()
	return null
}
