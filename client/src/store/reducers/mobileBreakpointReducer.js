const defaultState = {
	tablet: 0,
	mobile: 0
}

const CHANGE_MOBILE_BREAKPOINT = 'CHANGE_MOBILE_BREAKPOINT'

export default function currencyReducer(state = defaultState, action) {
	switch(action.type) {
		case CHANGE_MOBILE_BREAKPOINT:
			return action.payload
		default:
			return state
	}
}

export function changeMobileBreakpoint(value) {
	return {
		type: CHANGE_MOBILE_BREAKPOINT,
		payload: value
	}
}