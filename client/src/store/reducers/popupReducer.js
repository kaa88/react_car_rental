const defaultState = ''

const SET_ACTIVE_POPUP = 'SET_ACTIVE_POPUP'

export default function popupReducer(state = defaultState, action) {
	switch(action.type) {
		case SET_ACTIVE_POPUP:
			return action.payload
		default:
			return state
	}
}

export function setActivePopup(value) {
	return {
		type: SET_ACTIVE_POPUP,
		payload: value
	}
}