const defaultState = {
	windowHeight: 0,
	headerHeight: 0,
	headerPosition: 0
}

const CHANGE_WINDOW_HEIGHT = 'CHANGE_WINDOW_HEIGHT'
const CHANGE_HEADER_HEIGHT = 'CHANGE_HEADER_HEIGHT'
const CHANGE_HEADER_POSITION = 'CHANGE_HEADER_POSITION'

export default function headerReducer(state = defaultState, action) {
	switch(action.type) {
		case CHANGE_WINDOW_HEIGHT:
			return {...state, windowHeight: action.payload}
		case CHANGE_HEADER_HEIGHT:
			return {...state, headerHeight: action.payload}
		case CHANGE_HEADER_POSITION:
			return {...state, headerPosition: action.payload}
		default:
			return state
	}
}

export function changeWindowHeight(value) {
	return {
		type: CHANGE_WINDOW_HEIGHT,
		payload: value
	}
}
export function changeHeaderHeight(value) {
	return {
		type: CHANGE_HEADER_HEIGHT,
		payload: value
	}
}
export function changeHeaderPosition(value) {
	return {
		type: CHANGE_HEADER_POSITION,
		payload: value
	}
}
