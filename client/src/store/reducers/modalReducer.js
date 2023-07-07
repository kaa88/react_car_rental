const defaultState = {
	activeModal: null,
	content: ''
}

const SET_ACTIVE_MODAL = 'SET_ACTIVE_MODAL'
const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT'

export default function modalReducer(state = defaultState, action) {
	switch(action.type) {
		case SET_ACTIVE_MODAL:
			return {...state, activeModal: action.payload}
		case SET_MODAL_CONTENT:
			return {...state, content: action.payload}
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
export function setModalContent(value) {
	return {
		type: SET_MODAL_CONTENT,
		payload: value
	}
}
