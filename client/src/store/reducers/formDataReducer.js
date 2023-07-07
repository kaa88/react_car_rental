import { defaultOptions } from "../../components/parts/Forms/ReservationForm/Options/Options"

const defaultState = {
	location: '',
	pickup: '',
	return: '',
	options: defaultOptions,
}

const SET_LOCATION = 'SET_LOCATION'
const SET_PERIOD = 'SET_PERIOD'
const SET_OPTIONS = 'SET_OPTIONS'

export default function formDataReducer(state = defaultState, action) {
	switch(action.type) {
		case SET_LOCATION:
			return {...state, location: action.payload}
		case SET_PERIOD:
			return {...state, pickup: action.payload.pickup, return: action.payload.return}
		case SET_OPTIONS:
			return {...state, options: action.payload}
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
