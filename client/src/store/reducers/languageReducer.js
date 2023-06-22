import { Language } from '../../components/ui/OptionsSelect/language'

const defaultState = Language

const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export default function languageReducer(state = defaultState, action) {
	switch(action.type) {
		case CHANGE_LANGUAGE:
			return {...state, current: action.payload}
		default:
			return state
	}
}

export function changeLanguage(value) {
	return {
		type: CHANGE_LANGUAGE,
		payload: value
	}
}