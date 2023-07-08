const defaultState = {
	active: ''
}

const SET_ACTIVE_SELECT = 'SET_ACTIVE_SELECT'

export default function selectReducer(state = defaultState, action) {
	switch(action.type) {
		case SET_ACTIVE_SELECT:
			return {...state, active: action.payload}
		default:
			return state
	}
}

export function setActiveSelect(value) {
	return {
		type: SET_ACTIVE_SELECT,
		payload: value
	}
}
