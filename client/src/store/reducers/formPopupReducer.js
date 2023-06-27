const defaultState = {
	activePopup: '',
	selectorCurrentMonth: new Date()
}

const SET_ACTIVE_POPUP = 'SET_ACTIVE_POPUP'
const SET_CURRENT_MONTH = 'SET_CURRENT_MONTH'

export default function formPopupReducer(state = defaultState, action) {
	switch(action.type) {
		case SET_ACTIVE_POPUP:
			return {...state, activePopup: action.payload}
		case SET_CURRENT_MONTH:
			return {...state, selectorCurrentMonth: action.payload}
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
export function setSelectorCurrentMonth(value) {
	return {
		type: SET_CURRENT_MONTH,
		payload: value
	}
}
