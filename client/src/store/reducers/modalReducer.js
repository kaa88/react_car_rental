const defaultState = ''

const SET_ACTIVE_MODAL = 'SET_ACTIVE_MODAL'

export default function modalReducer(state = defaultState, action) {
	switch(action.type) {
		case SET_ACTIVE_MODAL:
			return action.payload
		default:
			return state
	}
}

export function setActiveModal(value) {
	return {
		type: SET_ACTIVE_MODAL,
		payload: value
	}
}
