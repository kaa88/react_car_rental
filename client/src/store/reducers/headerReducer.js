const SET_HEADER_INITIALIZED = 'SET_HEADER_INITIALIZED'
const SET_HEADER_FIXED = 'SET_HEADER_FIXED'
const SET_HEADER_COMPACT = 'SET_HEADER_COMPACT'
const SET_HEADER_SHARING = 'SET_HEADER_SHARING'

const SET_MENU_INITIALIZED = 'SET_MENU_INITIALIZED'
const SET_MENU_ACTIVE = 'SET_MENU_ACTIVE'
// const SET_MENU_SHRINKED = 'SET_MENU_SHRINKED'

const defaultState = {
	headerIsInitialized: false,
	headerIsFixed: false,
	headerIsCompact: false,
	headerIsSharing: false,

	menuIsInitialized: false,
	menuIsActive: false,
	// menuIsShrinked: false,
	// returnHeader: function(){},
}
export default function headerReducer(state = defaultState, action) {
	switch(action.type) {
		case SET_HEADER_INITIALIZED:
			return {...state, headerIsInitialized: action.payload}
		case SET_HEADER_FIXED:
			return {...state, headerIsFixed: action.payload}
		case SET_HEADER_COMPACT:
			return {...state, headerIsCompact: action.payload}
		case SET_HEADER_SHARING:
			return {...state, headerIsSharing: action.payload}

		case SET_MENU_INITIALIZED:
			return {...state, menuIsInitialized: action.payload}
		case SET_MENU_ACTIVE:
			return {...state, menuIsActive: action.payload}
		// case SET_MENU_SHRINKED:
		// 	return {...state, menuIsShrinked: action.payload}

		default:
			return state
	}
}
export function setHeaderInitialized(value) {
	return { type: SET_HEADER_INITIALIZED, payload: value }
}
export function setHeaderFixed(value) {
	return { type: SET_HEADER_FIXED, payload: value }
}
export function setHeaderCompact(value) {
	return { type: SET_HEADER_COMPACT, payload: value }
}
export function setHeaderSharing(value) {
	return { type: SET_HEADER_SHARING, payload: value }
}

export function setMenuInitialized(value) {
	return { type: SET_MENU_INITIALIZED, payload: value }
}
export function setMenuActive(value) {
	return { type: SET_MENU_ACTIVE, payload: value }
}
// export function setMenuShrinked(value) {
// 	return { type: SET_MENU_SHRINKED, payload: value }
// }
