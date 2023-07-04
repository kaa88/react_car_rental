const defaultState = {
	isActive: false,
	content: ''
}

const SET_MODAL_IS_ACTIVE = 'SET_MODAL_IS_ACTIVE'
const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT'

export default function modalReducer(state = defaultState, action) {
	switch(action.type) {
		case SET_MODAL_IS_ACTIVE:
			return {...state, isActive: action.payload}
		case SET_MODAL_CONTENT:
			return {...state, content: action.payload}
		default:
			return state
	}
}

export function setModalIsActive(value) {
	return {
		type: SET_MODAL_IS_ACTIVE,
		payload: value
	}
}
export function setModalContent(value) {
	return {
		type: SET_MODAL_CONTENT,
		payload: value
	}
}
