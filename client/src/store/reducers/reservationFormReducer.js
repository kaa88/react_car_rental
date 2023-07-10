import { defaultOptions } from "../../components/parts/Forms/ReservationForm/Options/Options"

const defaultState = {
	location: '',
	pickup: '',
	return: '',
	options: defaultOptions,
	selectorCurrentMonth: new Date()
}

const SET_LOCATION = 'SET_LOCATION'
const SET_PERIOD = 'SET_PERIOD'
const SET_OPTIONS = 'SET_OPTIONS'
const SET_CURRENT_MONTH = 'SET_CURRENT_MONTH'

export default function reservationFormReducer(state = defaultState, action) {
	switch(action.type) {
		case SET_LOCATION:
			return {...state, location: action.payload}
		case SET_PERIOD:
			return {...state, pickup: action.payload.pickup, return: action.payload.return}
		case SET_OPTIONS:
			return {...state, options: action.payload}
		case SET_CURRENT_MONTH:
			return {...state, selectorCurrentMonth: action.payload}
		default:
			return state
	}
}

export function setLocation(value) {
	return {
		type: SET_LOCATION,
		payload: value
	}
}
export function setPeriod(value) {
	return {
		type: SET_PERIOD,
		payload: value
	}
}
export function setOptions(value) {
	return {
		type: SET_OPTIONS,
		payload: value
	}
}
export function setSelectorCurrentMonth(value) {
	return {
		type: SET_CURRENT_MONTH,
		payload: value
	}
}
